# 介绍

One-KVM是基于经济计算机硬件（目前为玩客云和X64兼容机）和PiKVM软件的硬件级远程控制项目。KVM over IP可以远程管理服务器或工作站，实现无侵入式控制，无论被控机为什么操作系统或是否安装了操作系统，具有更广泛的适用性。 

相较于向日葵控控（￥7？？）或树莓派开发板，低价的矿渣玩客云 + HDMI转USB采集卡的组合（不包含其他工具）运行PiKVM同样可以实现很好的效果。

!!! note
    本项目最开始时仅为玩客云设备适配，现已支持X64设备，后续将支持更多设备。

主要功能比较，TinyPilot 社区版本、PiKVMv3版本出现在这里仅做比较目的。

|      功能      |         One-KVM         | TinyPilot 社区版本 | PiKVMv3版本  |
| :------------: | :---------------------: | :----------------: | :----------: |
| HTML5界面语言  |        简体中文         |        英文        |     英文     |
|    BIOS控制    |            √            |         √          |      √       |
|    视频捕捉    |            √            |         √          |      √       |
|    音频捕捉    |            ×            |         √          |      √       |
|  鼠键捕获类型  |       OTG CH9329        |        OTG         |  OTG CH9329  |
|  从剪贴板粘贴  |            √            |         √          |      √       |
|    OCR识别     |            √            |         ×          |      √       |
|    LAN唤醒     |            √            |         ×          |      √       |
|    VNC支持     |            √            |         ×          |      √       |
|    HDMI环出    | √（含HDMI设备初步支持） |         ×          |      ×       |
| 虚拟存储驱动器 |  √（仅含OTG设备支持）   |         ×          |      √       |
|   ATX开关机    |  √（仅含GPIO设备支持）  |         ×          |      √       |
|    板载WiFi    |            ×            |         √          |      √       |
|   视频流格式   | MJPEG  H.264（软编码）  |    MJPEG, H.264    | MJPEG, H.264 |
| 最大视频分辨率 |        1920x1080        |     1920x1080      |  1920x1080   |

# 运行效果

!!! note
    此为在玩客云设备上的演示效果，实际效果因软硬件配置而异。

![1280X1280 (1)](./img/1280X1280 (1).PNG)

![15560030-996a-4a9a-a132-7ad072c7569c](./img/15560030-996a-4a9a-a132-7ad072c7569c.png)

![09348dd5-3e3a-4384-ad6d-9c3723682755](./img/09348dd5-3e3a-4384-ad6d-9c3723682755.png)

### 其他

文档目录（可在此查阅其他文档）：[https://p1b237lu9xm.feishu.cn/drive/folder/IsOifWmMKlzYpRdWfcocI7jdnQA](https://p1b237lu9xm.feishu.cn/drive/folder/IsOifWmMKlzYpRdWfcocI7jdnQA)

Github地址：[https://github.com/mofeng-git/One-KVM](https://github.com/mofeng-git/One-KVM) （欢迎点个Star）

QQ交流群：569514148 （One-KVM交流群）
