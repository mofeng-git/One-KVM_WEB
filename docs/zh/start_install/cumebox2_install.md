### 硬件介绍

私家云二代（也称比特米盒子、CumeBox2，为同一硬件）搭载了晶晨 S905X 处理器，配备了 1GB RAM 和 8GB 内部存储，拥有一个百兆网口、两个 USB 2.0接口、一个 OTG 2.0端口、两个 SATA 3.0接口、内置双频 WIFI 及蓝牙，并提供 TF 卡槽和 HDMI 输出。

### 整合包部署

整合包底包基于 Armbian Khadas-vim1 固件修改 DTB 而来，进行了特别适配，网口、OLED 小屏幕、WIFI 、OTG 都正常可用。

**刷机准备与步骤**

1. **下载固件**：获取 Android TV 6.0固件，这是用于烧录其他系统的过渡系统。
2. **短接主板触点**：参照提供的图片短接指定的触点以进入烧录模式。
3. **使用烧录工具**：利用 Amlogic USB Burning Tool 将 Android TV 固件写入设备。
4. **安装 APK**：开机后，在新安装的 Android TV 环境中安装特定的APK文件，使设备能够从外部介质（如U盘或 TF 卡）启动准备好的 Armbian 系统。
5. **切换至 Armbian**：重启后，设备应该能直接进入准备好的 Armbian 操作系统。
6. **写入最终固件**：最后一步是通过 dd 命令将整合包写入 EMMC。

![私家云二代主板短接触点](../img/IMG_20241203_195852.jpg)

刷机详细过程可参考：[私家云二代/比特米盒/CumeBox2刷机Armbian教程 // 喵ฅ^•ﻌ•^ฅ (ruohai.wang)](https://ruohai.wang/202404/cumebox2-install-armbian/)

**升级方法**

将最新 dd 整合包写入U盘，插到盒子 USB 口上通电启动，这时就会启动U盘系统。如需要写入 emmc 则需要将 dd 整合包通过 dd 工具写入 emmc。
  

### Docker 部署

**安装 Docker**

- 使用官方包管理器安装：
``` bash
apt install apparmor-utils docker.io -y
```
- 或者安装最新版本：
```bash
curl -fsSL https://get.docker.com | bash
```

**Docker 部署 One-KVM 容器**
```bash
#运行 docker 命令，使用 OTG HID
#系统 /dev/video0 设备已经存在，所以新插入的 USB 采集卡从 /dev/video1 开始
docker run --name kvmd -itd --privileged=true \
    -v /dev:/dev -v /sys/kernel/config:/sys/kernel/config \
    -v /lib/modules:/lib/modules:ro \
    -e OTG=1 -e VIDEONUM=1 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    silentwind0/kvmd
    
#确认容器正常运行后可添加自动重启
docker logs kvmd
docker update --restart=always kvmd
```

![image-20240926220902937](../img/image-20240926220902937.png)

### 使用说明

!!! tip "提醒"
    部分低功耗设备在未接通电源时可能通过 USB 线从私家云二代 OTG 口取电并启动至异常状态，再接通电源也无法启动。要解决此问题，您可以剥开 USB 线剪断红色5V细电线。

**SSH 远程登录**

Armbian 系统默认开启 SSH，SSH 初始用户密码为 root/1234。

!!! warning "警告"
    不建议使用 `apt upgrade` 升级内核和设备树，可能会出现系统异常，OTG 功能无法使用。

**硬件连接**

![image-20240926220219805](../img/image-20240926220219805.png)

**OLED 显示屏**

前面板的小 OLED 显示屏会循环显示欢迎语、温度和 IP 地址。

![oled](../img/1730628391056.png)


**WIFI 连接**

- 安装软件包
```bash
apt install network-manager -y
```

- 连接 WIFI
```bash
#在命令行文本图形界面中进行 WIFI 连接，支持双频 WIFI
#第一次连接后，盒子重启连接会自动连接上一次连接的 WIFI
nmtui
```

![image-20240926220204960](../img/image-20240926220204960.png)

**ATX 电源控制**

私家云二代可以使用 USB HID 继电器作为物理开关机功能的控制方式。

![img](../img/1717946862304-33.png)