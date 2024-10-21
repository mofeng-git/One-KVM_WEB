### 硬件清单

所需外设：USB采集卡、USB CH340+CH9329（可选）

宿主机系统：Linux

演示网站：[https://kvmd-demo.mofeng.run/](https://kvmd-demo.mofeng.run/)

### Docker 部署

Docker 可以使用 OTG 或 CH9329 作为虚拟 HID ，支持 amd64、arm64、armv7 架构的 Linux 系统安装。

???+ tip "OTG 与 CH9329 说明"
    OTG HID：现在大量的 ARM CPU 芯片都可以支持 USB OTG2.0/3.0 接口，该接口可能工作为 USB Host 模式用于连接USB设备。不过该接口也可以在 Linux 下作为 USB 从设备工作，此时可以将 ARM 板本身配置为键盘、鼠标、U 盘，从而将 OTG 接口作为虚拟 HID 设备使用。

    CH9329 HID： CH9329 是一款串口转标准 USB HID 设备(键盘、鼠标、自定义 HID)芯片， 在电脑上可被识别为标准的 USB 键盘设备、USB 鼠标设备或自定义 HID 类设备。可用作 One-KVM 的虚拟 HID 设备。

如果使用 OTG 作为虚拟 HID，可以使用如下部署命令：
```bash
sudo docker run --name kvmd -itd --privileged=true \
    -v /lib/modules:/lib/modules:ro -v /dev:/dev \
    -v /sys/kernel/config:/sys/kernel/config -e OTG=1 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    silentwind0/kvmd
```

如果使用 CH9329 作为虚拟 HID，可以使用如下部署命令：
```bash
sudo docker run --name kvmd -itd \
    --device /dev/video0:/dev/video0 \
    --device /dev/ttyUSB0:/dev/ttyUSB0 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    silentwind0/kvmd
```

部署完成访问 https://IP:4430 ,点击信任自签证书，即可开始使用，默认账号密码：admin/admin。

如无法访问可以使用 `sudo docker logs kvmd` 命令查看日志尝试修复、提交 issue 或在 QQ 群内寻求帮助。

### 参数说明

`-p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623` 将容器的端口映射到主机，用于向外暴露下列服务端口：<br>
 WEB 网页：8080、4430<br>
 VNC 控制台：5900<br>
 IPMI 控制：623

`-v ./kvmd_config:/etc/kvmd` 可挂载容器内配置文件目录，用于持久化配置文件，便于使用者手动修改配置文件。

 默认从 Docker Hub 拉取镜像，若网络不畅无法连接可以替换为`registry.cn-hangzhou.aliyuncs.com/silentwind/kvmd`，此地址为阿里云个人镜像托管服务杭州实例，拉取速度更快。

### 环境变量

`-e USERNAME=admin` 设置用户账号为 admin ，默认为 admin

`-e PASSWORD=admin` 设置用户密码为 admin，默认为 admin

`-e NOSSL=1` 禁用 HTTPS，启用 HTTP，在 8080 端口提供 WEB 服务

`-e OTG=1` 启用 OTG 模式，默认为禁用

`-e NOAUTH=1` 禁用身份认证，默认为启用

`-e NOWEBTERMWRITE=1` 禁用 WEB 终端输入，设置为只读模式，默认为启用

`-e NOWEBTERM=1` 禁用 WEB 终端，默认为启用

`-e NOVNC=1` 禁用 VNC，默认为启用

`-e NOIPMI=1` 禁用 IPMI，默认为启用

`-e VIDEONUM=1` 设置 USB 采集卡地址编号，默认为 0，如 1 则代表 /dev/video1

`-e NOMSD=1` 禁用 MSD，默认在 ARM 主机上启用

`-e ATX=USBRELAY_HID` 使用 USB HID 继电器设备作为电源控制设备