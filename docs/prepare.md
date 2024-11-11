### 运行架构

![架构图](./img/drawio1.png)

**软件主要功能**

- 控制功能：WEB 网页远程控制、VNC 远程控制、BIOS 级别控制、LAN 唤醒、ATX 开关机

- 扩展功能：网页终端、文本粘贴、OCR 识别、远程视频流（MJPEG、WebRTC/H.264）、截屏录屏、虚拟存储驱动器（仅含 OTG 设备支持）

### 支持平台

- 架构：x86_64、ARMv7、ARM64
- 平台：Docker、Armbian
- 硬件：USB UVC 采集卡、CH9329+CH340 或 OTG 端口


| 整合包适配情况 | | | | |
| :-------------: | :-------------: | :-------------: | :-------------: | :-------------: |
| **固件型号** | **固件代号** | **硬件情况** | **最新版本** | **维护状态** |
| 玩客云 | Onecloud | USB 采集卡、OTG | 241018 | 持续更新 |
| 私家云二代 | Cumebox2 | USB 采集卡、OTG | 241004 | 持续更新 |
| Vmare | Vmare-uefi | USB 采集卡、CH9329 | 241004 | 持续更新 |
| Virtualbox | Virtualbox-uefi | USB 采集卡、CH9329 | 241004 | 持续更新 |
| s905l3a  通用包 | E900v22c | USB 采集卡、OTG | 241004 | 停止更新 |
| 我家云 | Chainedbox | USB 采集卡、OTG | 241004 | 停止更新 |
| 龙芯久久派 | 2k0300 | USB 采集卡、CH9329 | 241025 | 停止更新 |


| 采集卡硬件兼容性 |              |                |                |              |
| :------------------------------------: | :----------: | :------------: | :------------: | :----------: |
|             **型号/方案**              | **USB 接口** | **Linux 支持** | **One-KVM 支持** | **使用情况** |
|                 MS2109                 |    USB2.0    |       √        |       √        |     推荐     |
|                 MS2130                 |    USB3.0    |       √        |       √        |   推荐   |
|                 MS2131                 |    USB3.0    |       √        |       √        |   推荐   |
|              腾飞 TFDGK05              |    USB2.0    |       √        |       ×        |      /       |
|            迈拓矩阵 MT-UH02            |    USB2.0    |       ×        |       ×        |      /       |

### 文件下载

**镜像及工具文件**

百度网盘（需登录）：[https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9a](https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj) 

OneIndex（免登录不限速）：[https://files.mofeng.run/](https://files.mofeng.run/)


<!-- 截图大同小异，取消展示各个硬件，移动至各自页面  
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
-->