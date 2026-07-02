# Docker 安装

本文介绍如何使用 Docker 部署 One-KVM。

## 前提条件

- 系统要求：Linux 操作系统（推荐 Debian/Ubuntu），安装好 Docker 软件。
- 硬件准备：启用 USB OTG 或插好 CH340+CH9329 HID 线（用于 HID 模拟），插好 USB 视频采集卡。


## 启动容器

容器分为 `one-kvm` 和 `one-kvm-full` 两个版本，区别是前者只有 One-KVM 主程序和 ttyd 程序，后者会附带第三方软件来实现一些可选的扩展功能（如 gostc 和 easytier-core）。可以根据自己的需求选择对应的镜像。

请在希望保存配置和数据的目录执行以下命令，`./one-kvm-data` 会挂载到容器内的 `/etc/one-kvm`，用于持久化 One-KVM 数据。

```bash
docker run --name one-kvm -itd \
  --privileged=true --restart unless-stopped \
  -v /dev:/dev -v /sys:/sys \
  -v ./one-kvm-data:/etc/one-kvm \
  --net=host \
  silentwind0/one-kvm-full
```

如果网络条件不佳，可使用阿里云镜像仓库加速下载，将命令中的 `silentwind0/one-kvm-full` 替换为 `registry.cn-hangzhou.aliyuncs.com/silentwind/one-kvm-full`，`silentwind0/one-kvm`同理。

如果使用 `one-kvm` 精简镜像，请将启动和更新命令中的镜像名同步替换为 `silentwind0/one-kvm` 或对应的阿里云镜像地址。

## Docker Compose 部署

也可以使用 Docker Compose 管理容器。在准备保存 `compose.yml` 的目录创建以下文件：

```yaml title="compose.yml"
services:
  one-kvm:
    image: silentwind0/one-kvm-full
    container_name: one-kvm
    privileged: true
    restart: unless-stopped
    network_mode: host
    volumes:
      - /dev:/dev
      - /sys:/sys
      - ./one-kvm-data:/etc/one-kvm
    environment:
      TZ: Asia/Shanghai
```

在 `compose.yml` 所在目录启动容器：

```bash
docker compose up -d
```

## 更新容器

!!! warning "更新前确认数据持久化"
    删除旧容器前，请确认已经挂载 `./one-kvm-data:/etc/one-kvm` 或其他等效的数据目录。未持久化的数据可能会随容器删除而丢失。

如果使用 `docker run` 启动：

```bash
docker pull silentwind0/one-kvm-full
docker stop one-kvm
docker rm one-kvm
```

然后重新执行上方的 `docker run` 启动命令。

如果使用 Docker Compose 启动，请在 `compose.yml` 所在目录执行：

```bash
docker compose pull
docker compose up -d
```

如果使用 `one-kvm` 精简镜像或阿里云镜像仓库，更新命令中的镜像名也需要保持一致。

## 访问 Web 界面

打开浏览器访问 `http://<设备IP>:8080`

!!! tip "首次访问"
    首次访问时，系统会引导您完成初始配置，包括创建管理员账户。


### OTG 使用说明

如果你使用需要使用 OTG ，请确保系统开启 OTG 功能并使能了 OTG 端口。

执行 `ls /sys/class/udc` 命令返回为空说明你的设备没有 USB OTG 端口或没有开启设置 USB 端口为 OTG 模式，如果是后者可尝试修改设备树 dtb。

执行 `ls /sys/kernel/config` 命令返回的文件中如果没有 `usb_gadget` 可能是没有加载 `libcomposite` 内核模块，可以手动加载或在 `/etc/modprobe.d/` 目录下新建内核模块自动加载规则文件。手动加载命令为 `modprobe libcomposite`,需要在 IPKVM 程序启动之前加载。

最后一步就是使能 OTG 端口为 `device` 状态。如果设备树 dtb 中 USB OTG端口配置属性 `dr_mode` 为 `peripheral`,则开机后OTG 端口为 `device` 状态。但更常见的情况是设备树 dtb 中 USB OTG 端口配置属性 `dr_mode` 为 `otg`，需要手动使能。这个使能命令因不同 CPU 平台（全志、晶晨、瑞芯微等）而异，具体命令可能需要查看文档或网络上查找对应资料。确定有效后把命令可以放入 `/etc/rc.local` 开机自启脚本里面，便宜开机自动使能 OTG 端口。

实例：晶晨平台 OTG 使能命令

```bash
#查看当前 USB OTG 状态
cat /sys/devices/platform/soc/*/usb_role/*/role
#手动使能 OTG 端口
echo "device" > /sys/devices/platform/soc/*/usb_role/*/role
```

## 配置选项

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `TZ` | `UTC` | 时区设置 |
| `DATA_DIR` | `/etc/one-kvm` | 数据目录，入口脚本会传给 `one-kvm -d`；优先级高于 `ONE_KVM_DATA_DIR` |
| `ONE_KVM_DATA_DIR` | `/etc/one-kvm` | 数据目录兼容变量，仅在 `DATA_DIR` 未设置时使用 |
| `BIND_ADDRESS` | 未设置 | Web 服务监听地址，设置后传给 `one-kvm -a` |
| `HTTP_PORT` | 配置文件默认值 | HTTP 端口，设置后传给 `one-kvm -p` |
| `HTTPS_PORT` | 配置文件默认值 | HTTPS 端口，设置后传给 `one-kvm --https-port` |
| `ENABLE_HTTPS` | `false` | 是否启用 HTTPS 服务（值：true/false） |
| `VERBOSE` | `0` | 日志详细程度：1（-v）、2（-vv）、3（-vvv），数值越大日志越详细 |
| `RUST_LOG` | 未设置 | Rust 日志过滤器，设置后会覆盖 `VERBOSE` 生成的默认日志等级 |
| `ONE_KVM_FFMPEG_LOG` | `error` | FFmpeg 日志等级，可填 `error`、`warn`、`info`、`debug`、`trace` 等 |
| `ONE_KVM_WEBRTC_MDNS_MODE` | `query_only` | WebRTC mDNS 模式：`disabled`、`query_only`、`query_and_gather` |
| `ONE_KVM_UPDATE_BASE_URL` | `https://update.one-kvm.cn` | 在线升级服务地址 |
| `OPENAI_API_KEY` | 未设置 | Computer Use Agent 的 OpenAI API Key，优先级高于网页配置 |
| `ONE_KVM_OPENAI_BASE_URL` | 网页配置默认值 | Computer Use Agent 的 OpenAI 接口地址，优先级高于网页配置 |
| `ONE_KVM_V4L2M2M_ALLOW` | 未设置 | 晶晨平台默认跳过 V4L2 M2M 探测；设置为非空且不为 `0` 时允许探测 |
| `LIBVA_DRIVER_NAME` | 自动探测 | 手动指定 VA-API 驱动，例如 `iHD` 或 `i965` |
| `LIBVA_DEVICE` | 自动扫描 | 指定 VA-API 探测使用的 DRM render 节点，例如 `/dev/dri/renderD128` |

**说明**

- 启用 HTTPS 时，无需额外挂载证书文件，系统使用默认自签名证书。
- `--privileged=true` 和 `-v /dev:/dev` `-v /sys:/sys` 是硬件访问必需的配置，目前不可省略。后面会支持细化目录和权限。
- 建议保留 `-v ./one-kvm-data:/etc/one-kvm` 挂载，用于持久化配置和运行数据。
- `--net=host` 模式确保端口映射直接生效，无需额外配置 `-p` 参数映射端口。未设置 `HTTP_PORT` / `HTTPS_PORT` 时，端口以网页配置保存的值为准。

[继续阅读：用户界面 :material-arrow-right:](../ui/onboarding.md){ .md-button }
