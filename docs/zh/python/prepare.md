### 工作原理

![架构图](../../img/drawio1.png)

### 软件功能

!!! tip "注意"
    该表格仅对比 One-KVM 项目当前对这三个 KVM 软件适配功能适配的情况，不代表官方产品的功能支持情况。

|        功能        | One-KVM（PiVKM） |   BliKVM    | JetKVM  |
| :----------------: | :--------------: | :---------: | :-----: |
|      系统开源      |        √         |      √      |    √    |
|   简体中文 WebUI   |        √         |      √      |    √    |
|   远程视频流格式   |   MJPEG/H.264    | MJPEG/H.264 |  H.264  |
|   H.264 视频编码   |     CPU/GPU      |   CPU   | CPU/GPU |
|     远程音频流     |        √         |      x      |    x    |
|    远程鼠键控制    |    OTG/CH9329    |     OTG     |   OTG   |
|      VNC 控制      |        √         |      x      |    x    |
|    ATX 电源控制    | GPIO/USB 继电器  |      x      |    x    |
| 虚拟存储驱动器挂载 |        √         |      √      |    √    |
|    WOL 远程唤醒    |        √         |      √      |    √    |
|     网页剪切板     |        √         |      √      |    x    |
|    OCR 文字识别    |        √         |      √      |    x    |
|      网页终端      |        √         |      √      |    x    |
|    Docker 部署     |        √         |      √      |    √    |

### 支持平台

- 架构：x86_64、ARMv7、ARM64
- 平台：Docker
- 硬件：USB UVC 采集卡、CH9329+CH340 或 OTG 端口

**已适配硬件**

> 付费镜像需要付费会员才有访问镜像，可参考 [赞助计划](./thanks.md)。

![设备适配信息表](../../img/设备适配信息表.png)

**USB 采集卡硬件兼容性**

| USB 采集卡硬件兼容性 |              |                |                |              |
| :------------------------------------: | :----------: | :------------: | :------------: | :----------: |
|             **型号/方案**              | **USB 接口** | **Linux 支持** | **One-KVM 支持** | **使用情况** |
|                 MS2109                 |    USB2.0    |       √        |       √        |     推荐     |
|                 MS2130                 |    USB3.0    |       √        |       √        |   推荐   |
|                 MS2130S                |    USB3.0    |       √        |       √        |   推荐   |
|                 MS2131                 |    USB3.0    |       √        |       √        |   推荐   |
|              腾飞 TFDGK05              |    USB2.0    |       √        |       ×        |      /       |
|            迈拓矩阵 MT-UH02            |    USB2.0    |       ×        |       ×        |      /       |

### 文件下载

免登录高速下载：[http://sd1.files.one-kvm.cn/](http://sd1.files.one-kvm.cn/)（由群友赞助，支持直链，接入 EdgeOne CDN，建议使用多线程下载工具下载获取最高速度）

免登录高速下载地址：[https://pan.huang1111.cn/s/mxkx3T1](https://pan.huang1111.cn/s/mxkx3T1) （由 Huang1111公益计划 赞助）

百度网盘（需登录）：[https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj](https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj) 
