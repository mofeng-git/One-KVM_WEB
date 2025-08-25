## 软硬件准备

### 硬件要求

| 组件 | 要求 | 说明 |
|------|------|------|
| 主机 | Linux 主机（或虚拟机） | 支持 Docker 环境 |
| 采集卡 | USB 采集卡 | 用于视频信号采集 |
| 控制设备 | USB CH340+CH9329 | 主机 OTG 不可用时可作为替代 |

### 系统兼容性

| 支持的发行版 | 不支持的发行版 |
|--------------|----------------|
| Ubuntu/Debian | CentOS |
| Armbian | |
| Arch Linux | |

### Docker 安装

选择以下方式之一安装 Docker：

=== "包管理器安装"
    ```bash
    apt install docker.io -y
    ```

=== "官方脚本安装"
    ```bash
    curl -fsSL https://get.docker.com | bash
    ```

### HID 控制方式对比

OTG 模式支持虚拟 HID、MSD、USB 网卡等功能、CH9329 HID仅支持虚拟 HID功能。

| 特性 | OTG HID | CH9329 HID |
|------|---------|------------|
| **适用架构** | ARM CPU | 所有架构 |
| **接口类型** | USB OTG 接口 | 串口转 USB HID 芯片 |
| **工作模式** | USB Host/Device 可配置 | 标准 USB 输入设备 |
| **功能支持** | 虚拟 HID、MSD、USB 网卡 | 键盘、鼠标输入 |
| **使用场景** | ARM 设备（如树莓派） | X86 设备（如 PC） |
    
## Docker 部署

One-KVM 支持使用 OTG 或 CH9329 作为虚拟 HID，兼容 amd64、arm64、armv7 架构的 Linux 系统。

### 快速部署

One-KVM 提供安装向导脚本，可自动检查环境并快速完成部署：

```bash
curl -sSL https://one-kvm.mofeng.run/quick_start.sh -o quick_start.sh && bash quick_start.sh
```

![quick_start](../img/image-202411161848.png)

### 手动部署

如需自定义配置，请参考下方的设备映射和环境变量说明。

#### 网络模式选择

推荐使用 `--net=host` 模式以获得更好的 WoL 功能和 WebRTC 通信支持。

| 网络模式 | 优势 | 适用场景 |
|----------|------|----------|
| **Host 模式** | 性能更好，支持 WoL 和 WebRTC | 推荐使用 |
| **Bridge 模式** | 端口隔离，更安全 | 需要端口隔离时 |

#### Host 网络模式端口说明

| 端口 | 协议 | 服务 | 说明 |
|------|------|------|------|
| 8080 | HTTP | Web 服务 | HTTP 访问端口 |
| 4430 | HTTPS | Web 服务 | HTTPS 访问端口（推荐） |
| 5900 | TCP | VNC 服务 | VNC 远程桌面 |
| 623 | TCP | IPMI 服务 | IPMI 管理接口 |
| 20000-40000 | TCP/UDP | WebRTC | 低延迟视频传输 |
| 9 | UDP | Wake-on-LAN | 网络唤醒功能 |

#### 部署命令

=== "Host 网络模式"

    **OTG HID 模式**
    ```bash
    sudo docker run --name kvmd -itd --privileged=true \
        -v /lib/modules:/lib/modules:ro -v /dev:/dev \
        -v /sys/kernel/config:/sys/kernel/config -e OTG=1 \
        --net=host \
        silentwind0/kvmd
    ```

    **CH9329 HID 模式**
    ```bash
    sudo docker run --name kvmd -itd \
        --device /dev/video0:/dev/video0 \
        --device /dev/ttyUSB0:/dev/ttyUSB0 \
        --net=host \
        silentwind0/kvmd
    ```

=== "Bridge 网络模式"

    **OTG HID 模式**
    ```bash
    sudo docker run --name kvmd -itd --privileged=true \
        -v /lib/modules:/lib/modules:ro -v /dev:/dev \
        -v /sys/kernel/config:/sys/kernel/config -e OTG=1 \
        -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
        silentwind0/kvmd
    ```

    **CH9329 HID 模式**
    ```bash
    sudo docker run --name kvmd -itd \
        --device /dev/video0:/dev/video0 \
        --device /dev/ttyUSB0:/dev/ttyUSB0 \
        -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
        silentwind0/kvmd
    ```

### 镜像加速

如果网络条件不佳，可使用阿里云镜像仓库加速下载：

将命令中的 `silentwind0/kvmd` 替换为 `registry.cn-hangzhou.aliyuncs.com/silentwind/kvmd`

### 访问和配置

部署完成后访问 `https://IP:4430`。首次访问可能遇到 SSL 证书安全提醒，点击"高级"和"继续访问"即可。

| 项目 | 值 | 说明 |
|------|-----|------|
| **默认账号** | admin | Web/VNC/IPMI 通用账号 |
| **默认密码** | admin | Web/VNC/IPMI 通用密码 |
| **故障排查** | `sudo docker logs kvmd` | 查看容器运行日志 |

### 开机自启设置

```bash
# 设置 Docker 服务开机自启
systemctl enable docker

# 设置 One-KVM 容器自动重启
docker update --restart=always kvmd
```

### 容器更新

```bash
# 停止并删除旧容器
docker stop kvmd
docker rm kvmd

# 更新镜像
docker pull silentwind0/kvmd

# 重新部署（使用之前的部署命令）
```


## 高级配置

### 设备映射

| 设备类型 | Docker 参数 | 配合环境变量 | 说明 |
|----------|-------------|--------------|------|
| **采集卡** | `--device /dev/video0:/dev/video0` | `-e VIDEONUM=0` | 映射视频采集设备 |
| **音频输入** | `--device /dev/snd:/dev/snd` | `-e AUDIONUM=0` | 映射声卡设备 |
| **显卡** | `--device /dev/dri:/dev/dri` | `-e HWENCODER=vaapi` | 映射 VAAPI 硬件编码所需设备 |
| **显卡** | `--device /dev:/dev` | `-e HWENCODER=rkmpp` | 映射 RKMPP 硬件编码所需设备 |

### 目录映射

| 目录用途 | Docker 参数 | 说明 |
|----------|-------------|------|
| **配置持久化** | `-v ./kvmd_config:/etc/kvmd` | 挂载配置文件目录 |
| **镜像文件** | `-v ./msd:/var/lib/kvmd/msd` | 存放系统镜像文件 |

### 环境变量配置

#### 基础配置

| 环境变量 | 默认值 | 说明 |
|----------|--------|------|
| `USERNAME` | admin | 设置用户账号（Web/VNC/IPMI） |
| `PASSWORD` | admin | 设置用户密码（Web/VNC/IPMI） |
| `VIDEONUM` | 0 | 采集卡设备编号（/dev/video[N]） |
| `AUDIONUM` | 0 | 音频设备编号（hw:[N]） |

!!! note "密码设置方式说明"
    
    **两种配置方式**：
    
    - **USERNAME + PASSWORD**：创建自定义用户并删除默认 admin 用户
      ```bash
      -e USERNAME=myuser -e PASSWORD=mypassword
      ```
    
    - **仅设置 PASSWORD**：保持 admin 用户名，只更新密码
      ```bash
      -e PASSWORD=newpassword
      ```

#### 端口配置

| 环境变量 | 默认值 | 说明 |
|----------|--------|------|
| `HTTPPORT` | 8080 | HTTP 服务端口 |
| `HTTPSPORT` | 4430 | HTTPS 服务端口 |

#### 视频格式配置

| 环境变量 | 默认值 | 可选值 | 说明 |
|----------|--------|--------|------|
| `VIDEOFORMAT` | mjpeg | yuyv, nv12, nv16, nv24 | 视频采集格式 |

#### 音频设备配置

查看可用音频设备：`arecord -L` 或 `arecord -l`

| 配置方式 | 示例 | 环境变量值 |
|----------|------|------------|
| 声卡编号 | hw:0 | `AUDIONUM=0` |
| 声卡名称 | hw:CARD=MS2109 | `AUDIONUM=CARD=MS2109` |
| 设备文件 | hw:/dev/snd/controlC0 | `AUDIONUM=/dev/snd/controlC0` |

#### HID 控制配置

| 环境变量 | 可选值 | 说明 |
|----------|--------|------|
| `ATX` | `USBRELAY_HID` | 使用 USB HID 继电器进行电源控制 |
| `OTG` | `1` | 启用 OTG 模式（默认禁用） |
| `NOMSD` | `1` | 禁用 MSD 功能（ARM 默认启用） |

#### CH9329 串口配置

| 环境变量 | 默认值 | 可选值 |
|----------|--------|--------|
| `CH9329SPEED` | 9600 | 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200 |
| `CH9329TIMEOUT` | 0.3 | HID 响应超时时间（秒） |

#### 硬件编码配置

实验性支持硬件加速 H.264 编码，可显著提高性能并降低 CPU 使用率。

| 硬件类型 | 环境变量 | 设备映射 | 测试平台 |
|----------|----------|----------|----------|
| **AMD VAAPI** | `HWENCODER=vaapi` | `--device /dev/dri:/dev/dri` | AMD 核显 |
| **RK MPP** | `HWENCODER=rkmpp` | `-v /dev/:/dev/` | RK3588S |

#### 功能开关

| 环境变量 | 作用 | 默认状态 |
|----------|------|----------|
| `NOSSL=1` | 禁用 HTTPS，使用 HTTP (8080端口) | 启用 HTTPS |
| `NOAUTH=1` | 禁用身份认证 | 启用认证 |
| `NOWEBTERMWRITE=1` | Web 终端只读模式 | 可读写 |
| `NOWEBTERM=1` | 禁用 Web 终端 | 启用终端 |
| `NOVNC=1` | 禁用 VNC 服务 | 启用 VNC |
| `NOIPMI=1` | 禁用 IPMI 服务 | 启用 IPMI |