### Working Principle

![Architecture](img/drawio1.png)

### Features

The table compares One-KVM with other projects based on PiKVM. It is for reference only and not intended to mislead. Please contact us to correct any mistakes.

|           Feature           |     One-KVM     |           PiKVM           |   ArmKVM    |   BLIKVM    |
| :-------------------------: | :-------------: | :-----------------------: | :---------: | :---------: |
|        Open-source OS       |        √        |             √             |      √      |      √      |
|     Simplified Chinese UI   |        √        |             x             |      √      |      √      |
|       Remote video stream   |   MJPEG/H.264   |        MJPEG/H.264        | MJPEG/H.264 | MJPEG/H.264 |
|       H.264 encoding        |       CPU       |            GPU            |    Unknown  |     GPU     |
|        Remote audio         |        √        |             √             |      √      |      √      |
|     Remote mouse/keyboard   |   OTG/CH9329    | OTG/CH9329/Pico/Bluetooth |     OTG     |     OTG     |
|          VNC control        |        √        |             √             |      √      |      √      |
|        ATX power control    | GPIO/USB relay  |           GPIO            |    GPIO     |    GPIO     |
|  Virtual storage mounting   |        √        |             √             |      √      |      √      |
|   CD-ROM images > 2.2G      |        x        |             x             |      √      |      √      |
|         WOL wake-up         |        √        |             √             |      √      |      √      |
|        Web clipboard        |        √        |             √             |      √      |      √      |
|        OCR recognition      |        √        |             √             |      √      |      √      |
|         Web terminal        |        √        |             √             |      √      |      √      |
|   Network serial terminal   |        x        |             x             |      √      |      √      |
|     HDMI switch support     |        √        |             √             |      √      |      √      |
|         Video recording     |        √        |             x             |      x      |      x      |
|        Docker deployment    |        √        |             x             |      x      |      x      |
|     Official hardware kits  |        x        |             √             |      √      |      √      |
|          Tech support       |        √        |             √             |      √      |      √      |

### Supported Platforms

- Architecture: x86_64, ARMv7, ARM64
- Platform: Docker
- Hardware: USB UVC capture card, CH9329 + CH340 or OTG port


| Integrated image compatibility | (Click model name for details) | | | |
| :-------------: | :-------------: | :-------------: | :-------------: | :-------------: |
| **Model** | **Codename** | **Hardware** | **Latest** | **Status** |
| [OneCloud (玩客云)](start_install/onecloud_install.md) | Onecloud | USB capture, OTG | 241214 | Updating |
| [Cumebox 2 (私家云二代)](start_install/cumebox2_install.md) | Cumebox2 | USB capture, OTG | 241214 | Updating |
| [VMware](start_install/virtualmachine_install.md) | Vmare-uefi | USB capture, CH9329 | 241214 | Updating |
| [VirtualBox](start_install/virtualmachine_install.md) | Virtualbox-uefi | USB capture, CH9329 | 241214 | Updating |
| [s905l3a (General)](start_install/s905l3a_install.md) | E900v22c | USB capture, OTG | 241214 | Updating |
| [ChainedBox (我家云)](start_install/chainedbox_install.md) | Chainedbox | USB capture, OTG | 241214 | Updating |
| [Loongson 2K0300 (龙芯久久派)](start_install/2k0300_install.md) | 2k0300 | USB capture, CH9329 | 241025 | EOL |


| USB capture card compatibility |              |                |                |              |
| :------------------------------------: | :----------: | :------------: | :------------: | :----------: |
|             **Model/Chipset**              | **USB** | **Linux** | **One-KVM** | **Usage** |
|                 MS2109                 |    USB2.0    |       √        |       √        |   Recommended   |
|                 MS2130                 |    USB3.0    |       √        |       √        |   Recommended   |
|                 MS2131                 |    USB3.0    |       √        |       √        |   Recommended   |
|              TengFei TFDGK05           |    USB2.0    |       √        |       ×        |       /       |
|            Maituo Matrix MT-UH02       |    USB2.0    |       ×        |       ×        |       /       |

### Downloads

Huang1111 WebDAV (high-speed, no login): [https://webdav.huang1111.cn/s/e0Yfl](https://webdav.huang1111.cn/s/e0Yfl)

Baidu Netdisk (login required): [https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9a](https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj)


<!-- Screenshots are similar; removed from overview and moved to each hardware page
**OneCloud**

<div class="grid cards" markdown>

![PixPin_2024-07-01_10-50-18](./img/PixPin_2024-07-01_10-50-18.png)

![15560030-996a-4a9a-a132-7ad072c7569c](./img/15560030-996a-4a9a-a132-7ad072c7569c.png)

![09348dd5-3e3a-4384-ad6d-9c3723682755](./img/09348dd5-3e3a-4384-ad6d-9c3723682755.png)

![PixPin_2024-07-01_10-48-45](./img/PixPin_2024-07-01_10-48-45.png)

</div>

**Synology x86_64**

<div class="grid cards" markdown>

![Synology x86_641](./img/image2.png)

![KVM Home](./img/image.png)

</div>

**Cumebox 2**

<div class="grid cards" markdown>

![image-20240926220156381](./img/image-20240926220156381.png)

</div>

More platforms are not listed one by one.
-->


