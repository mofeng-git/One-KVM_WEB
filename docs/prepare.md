这里将说明One-KVM 的主要功能和所要求的软硬件。

### 运行架构

![架构图](./img/drawio1.png)

### 主要功能

- 控制功能：WEB 网页远程控制、VNC 远程控制、BIOS 级别控制、LAN 唤醒、ATX 开关机（仅含 GPIO 设备支持）

- 扩展功能：网页终端、文本粘贴、OCR 识别、远程视频流（MJPEG、WebRTC/H.264）、截屏、虚拟存储驱动器（仅含 OTG 设备支持）

### 支持平台

- 架构：x86_64、ARMv7、ARM64
- 平台：Docker、Armbian
- 硬件：USB UVC 采集卡、CH9329+CH340 或 OTG 端口

| **采集卡硬件兼容性列表（仅列出部分）** |              |                |                |              |
| :------------------------------------: | :----------: | :------------: | :------------: | :----------: |
|             **型号/方案**              | **USB 接口** | **Linux 支持** | **One-KVM 支持** | **使用情况** |
|                 MS2109                 |    USB2.0    |       √        |       √        |     推荐     |
|                 MS2130                 |    USB3.0    |       √        |       √        |   推荐   |
|                 MS2131                 |    USB3.0    |       √        |       √        |   推荐   |
|              腾飞 TFDGK05              |    USB2.0    |       √        |       ×        |      /       |
|            迈拓矩阵 MT-UH02            |    USB2.0    |       ×        |       ×        |      /       |


整合包花费了作者大量精力和成本进行开发和测试，与 ONe-KVM 与硬件深度适配，开箱即用。若没有所需要的平台整合包，可以提交适配或者使用 One-KVM  Docker 版（支持全平台）。如对您有帮助您可以考虑通过为 [爱发电](https://afdian.com/a/silentwind) 赞助一笔小钱支持作者。


| 固件型号 | 固件代号 | 硬件情况 |
| :-------------: | :-------------: | :-------------: |
| 玩客云 | Onecloud | USB 采集卡、OTG |
| s905l3a  通用包 | E900v22c | USB 采集卡、OTG |
| 私家云二代 | Cumebox2 | USB 采集卡、OTG |
| 我家云 | Chainedbox | USB 采集卡、OTG |
| Vmare | Vmare-uefi | USB 采集卡、CH9329+CH340 |
| Virtualbox | Virtualbox-uefi | USB 采集卡、CH9329+CH340 |

说明：

1. 带 burn.img 后缀的整合包为线刷固件，不带 burn 后缀的 img 后缀整合包为 dd 写入固件。

2. s905l3a 通用包在中兴 B863AV3.2M 和 CM311-1a-CH 通过测试，支持 E900V22C/D, CM311-1a-YST, M401A, M411A, UNT403A, UNT413A, ZTE-B863AV3.2-M, CM311-1a-CH, IP112H, B863AV3.1-M2 平台。


**镜像及工具文件**

百度网盘（需登录）：[https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9a](https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9a)j 

OneIndex（免登录不限速）：[https://files.mofeng.run/](https://files.mofeng.run/)



**玩客云**

<div class="grid cards" markdown>

![PixPin_2024-07-01_10-50-18](./img/PixPin_2024-07-01_10-50-18.png)

![15560030-996a-4a9a-a132-7ad072c7569c](./img/15560030-996a-4a9a-a132-7ad072c7569c.png)

![09348dd5-3e3a-4384-ad6d-9c3723682755](./img/09348dd5-3e3a-4384-ad6d-9c3723682755.png)

![PixPin_2024-07-01_10-48-45](./img/PixPin_2024-07-01_10-48-45.png)

</div>

**群晖 x86_64**

<div class="grid cards" markdown>

![群晖 x86_641](./img/image2.png)

![KVM 主页](./img/image.png)

</div>

**私家云二代**

<div class="grid cards" markdown>

![image-20240926220156381](./img/image-20240926220156381.png)

</div>

更多平台无法一一列举。