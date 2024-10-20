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

由于整合包由于花费了作者大量精力和成本进行开发和适配，所以部分平台整合包收费。详见下表，免费平台的整合包可直接解压，收费平台的整合包有解压密码。若不想付费可以使用 One-KVM  Docker 版（支持全平台）。

| 固件型号 | 是否免费 | 固件代号 | 硬件情况 |
| :---------: | :--------: | :---------: | :---------: |
| 玩客云 | 免费 | Onecloud | USB 采集卡、OTG |
| s905l3a  通用包 | 免费 | E900v22c | USB 采集卡、OTG |
| 私家云二代 | 付费 | Cumebox2 | USB 采集卡、OTG |
| 我家云 | 付费 | Chainedbox | USB 采集卡、OTG |
| Vmare | 付费 | Vmare-uefi | USB 采集卡、CH9329+CH340 |
| Virtualbox | 付费 | Virtualbox-uefi | USB 采集卡、CH9329+CH340 |

??? 使用说明
    1. 带 burn.img 后缀的整合包为线刷固件，不带 burn 后缀的 img 后缀整合包为 dd 写入固件。
    2. s905l3a 通用包在中兴 B863AV3.2M 和 CM311-1a-CH 通过测试，支持 E900V22C/D, CM311-1a-YST, M401A, M411A, UNT403A, UNT413A, ZTE-B863AV3.2-M, CM311-1a-CH, IP112H, B863AV3.1-M2 平台。

??? 付费方式
    捐赠或支付20元以上即可获取所需平台的付费整合包（提供压缩包密码）和相关技术支持。

    - 为爱发电：https://ifdian.net/a/silentwind

    - 闲鱼用户名：默风SilentWind


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