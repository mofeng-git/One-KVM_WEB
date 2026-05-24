### 硬件准备

必备硬件：玩客云主机、USB HDMI 采集卡、普通 USB 双公线

可选硬件：TF 卡（扩展储存）、 TTL 转 USB 适配器（调试工具）

### 整合包部署

**刷机包选择**

- 线刷镜像（带 burn 后缀）：适用于通过 Amlogic USB Burning Tool 进行固件更新。推荐使用 v2.1.3 或更低版本的刷机软件。
- U 盘/SD 卡启动镜像：适合直接写入到 U 盘或 SD 卡中启动设备。

**视频教程参考**

详细过程可以参考 B站UP主 夏秋BH6RRB 的视频教程。

<iframe height="400" width="600" src="//player.bilibili.com/player.html?isOutside=true&aid=113310901083506&bvid=BV1Hz2ZYxEr8&cid=26301303868&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

**其他刷机事项**

刷机短接时不需要一直短接，在烧录软件识别到并加载到 1% 可以松手耐心等待刷机成功了。玩客云主板刷机短接图片来源于玩客云技术交流群 蓝蓝大佬。

![img](../../img/1717947165711-51.jpeg)

玩客云刷入直刷镜像后默认上网方式为 DHCP 自动获取 IP，主机名为 `onecloud`。启动时由玩客云前面板LED灯会有红灯转为绿灯，启动后在浏览器访问玩客云IP即可。

![image-20240621005943231](../../img/image-20240621005943231.png)

若还需要刷机，不需要再次进行短接了，可以按住重置键通电进入刷机模式。

### 使用说明

**硬件连接**

!!! tip "提示"
    由于玩客云 One-KVM 整合包的 Linux 内核版本较旧，可能出现某些老电脑设备无法控制 BIOS 但可以控制引导进入的系统（如 Windows）。由于玩客云高版本 6.x 内核机器不稳定容易死机，所以这种情况目前无法解决。

    如果遇到这种情况且仍有尝试意愿，可更换以前发布的高版本 6.x 内核镜像整合包（https://github.com/mofeng-git/One-KVM/releases/tag/v0.61），但稳定性欠佳仅供测试使用。


1. 将 HDMI 转 USB 采集卡插入玩客云主机靠近网口的 USB 插槽，使用 HDMI 视频线连接采集卡与被控机器的 HDMI 输出端。
2. 将 USB 双公线的一端插入玩客云主机 HDMI 接口旁边的 USB 插槽，另一端连接至被控机器相应的 USB 接口。
3. 确保所有连接稳固，接入电源及网线。

!!! warning "硬件安全警告"

    为避免潜在风险（如被控设备无法正常启动或识别设备，甚至极少数情况下造成硬件损坏），强烈建议在使用 USB 双公线前采取以下任一安全措施：

    方案一：剪断或移除 USB 线中的红色 5V 电源线（VCC），仅保留数据线（D+/D−）和地线（GND），以切断供电路径；

    方案二：在 USB 链路中串接一个带独立电源开关的 USB HUB，并确保在连接时关闭其电源开关。

    部分低功耗设备可能在未通主电源的情况下，通过 USB OTG 接口从 KVM 设备反向取电，导致进入异常状态——即使后续接通主电源也可能无法正常启动。
    
    **除非您明确了解操作后果，否则请务必采用上述防护措施以保障设备安全。**

!!! tip "数据安全提示"

    不建议直接断电！eMMC 在写入过程中突然断电可能导致数据丢失。

    如因特殊原因需直接断电，建议在写入操作后执行 `sync` 命令确保数据写入；关机或重启时，建议使用 `poweroff` 或 `reboot` 指令，让系统安全完成数据同步和关机流程。



![image-20240609231232943](../../img/image-20240609231232943.png)

**SSH 远程登录**

Armbian 系统默认开启 SSH 服务，初始用户密码为 root/1234。请尽快更改默认密码以增强安全性。

!!! warning "系统升级警告"
    不建议使用 `apt upgrade` 升级内核和设备树，可能会出现系统异常，OTG 功能无法使用。

**ATX 电源控制**

如果要使用ATX控制物理开关机功能请连接好开机线。

![img](../../img/1717946862304-33.png)

**USB 端点数量**

此硬件 CPU 的 USB OTG 端点数量为6个，共可以虚拟端点总数为6个的 USB 设备。

**HDMI 环出模拟**

玩客云整合包 251001 以后的版本都支持这个功能，通过 DRM 显示来模拟 HDMI 环出功能。

当插入了 HDMI USB 采集卡和外接显示设备，外接显示设备会自动显示 HDMI 采集卡的画面，显示性能在 1080p8fps 左右。 

此功能对 CPU 消耗比较大，会影响网页 MJPEG 视频帧率，实测从 1080p50fps 下降到 1080p20fps 左右，720p60fps可以保持不变。

![alt text](../../img/image-251001100000000.png)

如要关闭此功能减少 CPU 消耗，可以修改 /etc/kvmd/override.yaml 文件删除 DRM 显示配置禁用此功能，重启生效。

```yaml  hl_lines="3"
        cmd:
            - "/usr/bin/ustreamer"
-           - "--drm-device=/dev/dri/card1"
            - "--device=/dev/video0"
            - "--persistent"
            - "--format=mjpeg"
            - "--encoder=FFMPEG-VIDEO"
            - "--resolution={resolution}"
            - "--desired-fps={desired_fps}"
            - "--drop-same-frames=30"
            - "--last-as-blank=0"
            - "--unix={unix}"
            - "--unix-rm"
            - "--unix-mode=0666"
            - "--exit-on-parent-death"
            - "--process-name-prefix={process_name_prefix}"
            - "--notify-parent"
            - "--no-log-colors"
            - "--h264-sink=kvmd::ustreamer::h264"
```