## 特点

1. 安卓系统，基于Khadas vim2 android 9，支持硬件编码
2. 定制内核，去除 ISO 2.2G 大小限制
3. KVM 软件在 chroot 容器中运行，支持大部分 deb 软件，不支持 docker 

## 安装方法

**短接点**

银色版本章鱼星球刷机短接点：



![章鱼星球刷机救砖教程-主板刷机短接点](../img/084749kig48ixdiybxguvy.jpg)

黑色版本章鱼星球刷机短接点（未在网上找到资料，作者自己测试出来的）：

![章鱼星球刷机救砖教程-主板刷机短接点](../img/image-20250516202445796.png)

**刷机**

USB 双公线插入离 HDMI 更近的 USB 端口，然后打开 USB_Burning_Tool 导入刷机包 One-KVM_by-SilentWind_Octopus-Flanet_250315.burn.img ，短接刷机触电开始刷机。

![image-20250516203306768](../img/image-20250516203306768.png)

## 使用

**KVM 远控**

章鱼星球硬件靠近 HDMI 的 USB 接口支持 OTG 功能，连接至被控机，另外一个 USB 连接至 USB 采集卡。

网页端口默认为 4430，支持 H.264 硬件编码。

![image-20250516205059560](../img/image-20250516205059560.png)

支持 WEB 终端，在终端安装 htop 后可看到 H.264 视频未使用 CPU 编码，而是使用 Android MediaCodec （通过 ffmpeg api 调用）进行硬件编码。

![image-20250516204743961](../img/image-20250516204743961.png)

**远程调试**

默认未安装 ssh 服务，不支持 ssh 连接。

chroot 系统支持 WEB 终端进行控制。

安卓系统支持 adb 网络远程调试，示例命令如下

```powershell
#连接 adb 设备，示例 ip 为 192.168.10.104
.\adb.exe connect 192.168.10.104
#进入安卓 shell ，支持 su 命令切换到 root账户
.\adb.exe shell
#安卓桌面投屏
.\scrcpy.exe
```

![image-20250516204309890](../img/image-20250516204309890.png)

## 其他

作为技术验证包，此镜像用实践证明了一种思路：对于 Linux 上不支持视频硬件编码的平台，可以转向安卓系统来增加视频硬件编码能力并在实际中应用。

此镜像最后编译于2025年3月15日，由于无人问津不被看好，原计划的 ssh 服务、docker 支持已停止开发适配，故默认不支持这两项功能，且之后很可能不会有后续更新。

