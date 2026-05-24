### 硬件介绍

Orange Pi Zero 采用了全志四核A7高性能处理器Allwinner H2/H3+，集成百兆板载网口、板载 WIFI、板载存储、USB OTG供电、USB2.0端口等。

说明：香橙派 zero 供电和 OTG 数据传输为同一个 microusb 接口，推荐使用数据供电分离一分二的 USB 线材。

### Docker 部署

首先把下载好的 Armbian 镜像写入 SD 卡。这里使用 `Armbian_23.02.0-trunk_Orangepizero_jammy_current_5.15.85_msd-patched.img` 作为基础系统，并使用 Docker 部署 On-KVM。

Armbian 镜像下载地址：[Armbian_23.02.0-trunk_Orangepizero_jammy_current_5.15.85_msd-patched.zip](https://github.com/jacobbar/fruity-pikvm/releases/download/os-images/Armbian_23.02.0-trunk_Orangepizero_jammy_current_5.15.85_msd-patched.zip)

![image-20241126135200887](../../img/image-20241126135200887.png)

进入系统后执行下列命令即可完成 One-KVM Docker 版的安装。

```
#清除 g_serial 内核模块自动挂载
echo "" > /etc/modules-load.d/modules.conf
reboot

#Docker 部署 One-KVM
apt update
apt install docker.io
docker run --name kvmd -itd --privileged=true \
    -v /dev:/dev -v /sys/kernel/config:/sys/kernel/config \
    -v /lib/modules:/lib/modules:ro -e OTG=1 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    silentwind0/kvmd
#确认容器正常运行后可添加自动重启
docker update --restart=always kvmd
```

运行效果如下。

![image-20241126144130798](../../img/image-20241126144130798.png)

### 其他

!!! warning "硬件安全警告"

    为避免潜在风险（如被控设备无法正常启动或识别设备，甚至极少数情况下造成硬件损坏），强烈建议在使用 USB 双公线前采取以下任一安全措施：

    方案一：剪断或移除 USB 线中的红色 5V 电源线（VCC），仅保留数据线（D+/D−）和地线（GND），以切断供电路径；

    方案二：在 USB 链路中串接一个带独立电源开关的 USB HUB，并确保在连接时关闭其电源开关。

    部分低功耗设备可能在未通主电源的情况下，通过 USB OTG 接口从 KVM 设备反向取电，导致进入异常状态——即使后续接通主电源也可能无法正常启动。
    
    **除非您明确了解操作后果，否则请务必采用上述防护措施以保障设备安全。**

!!! tip "数据安全提示"

    不建议直接断电！eMMC 在写入过程中突然断电可能导致数据丢失。

    如因特殊原因需直接断电，建议在写入操作后执行 `sync` 命令确保数据写入；关机或重启时，建议使用 `poweroff` 或 `reboot` 指令，让系统安全完成数据同步和关机流程。


**SSH**

Armbian 系统默认开启 SSH，SSH 初始用户密码为 root/1234。如使用香橙派官方系统，默认用户密码为 root/orangepi。

!!! warning "系统升级警告"
    不建议使用 `apt upgrade` 升级内核和设备树，可能会出现系统异常，OTG 功能无法使用。

**WIFI 连接**

要连接到 2.4G WIFI，执行以下命令即可进入命令行图形界面连接额。

```
nmtui
```

