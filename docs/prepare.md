这里将讲述运行 One-KVM 的主要功能和所要求的软硬件，建议新手在运行之前先浏览一遍此页面。

### 运行架构

![架构图](./img/drawio1.png)

### 主要功能

- 控制功能：WEB 网页远程控制、VNC 远程控制、BIOS 级别控制、LAN 唤醒、ATX 开关机（仅含 GPIO 设备支持）

- 扩展功能：网页终端、文本粘贴、OCR 识别、远程视频流（MJPEG、WebRTC/H.264）、截屏、虚拟存储驱动器（仅含 OTG 设备支持）

### 支持平台

- 架构：x86_64、ARMv7、ARM64
- 平台：Docker、Ubuntu/Debian
- 硬件：USB UVC 采集卡、CH9329+CH340 或 OTG 端口

适配的设备：玩客云、私家云二代、群晖 x86_64

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