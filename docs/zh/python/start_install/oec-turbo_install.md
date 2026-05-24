## 硬件介绍

OEC TURBO 采用了 RK3568 CPU，搭配了 4G 内存和 8G 的内部储存空间，它配备了一个千兆网络接口千兆网卡，一个 Typec 口和一个 USB 3.0 接口，机器内置一个 SATA 硬盘位。

优势是其 VPU 驱动是开放的， One-KVM 为此硬件适配了 H264 硬件编解码，能获得更好的 H264 视频体验。

## One-VKM

### 整合包部署

**文件准备**

首先下载好 OEC TUBRO 刷机工具和 One-KVM 整合包，解压好相关文件，进入刷机目录。这里建议把解压后的 One-KVM 镜像重命名为更短的名字（如 OEC.img）放到刷机工具目录下，这样不会因为文件名太长看不见刷机进度。

![alt text](../../img/image-20251001081900000.png)

如果之前没有安装过瑞芯微驱动，可以打开文件夹 `OEC-TUBRO刷机工具\RK3566刷机驱动\DriverInstall.exe` 进行驱动的安装。此前安装过驱动的可以跳过这个步骤。

![alt text](../../img/image-20251001082100000.png)

然后打开刷机软件 RKDevTool.exe ，点击路径后面的三个小点按钮，把 boot文件（就是刷机工具文件夹下的 MiniLoaderAll.bin文件）和 One-KVM 系统镜像的文件路径更新为你系统的实际路径。

![alt text](../../img/image-20251001082200000.png)

**开始刷机**

需要拆机，短接主板电阻进入 MASKROM 进行刷机。

网心云OEC拆机：

1. 底部向上推一下打开盖板
2. 有一个SATA硬盘位、一个Type-C接口，使用螺丝刀拧下4颗螺丝
3. 向上推一下外壳、然后取下侧面外壳，拆卸SATA接口，用螺丝刀拧下三颗螺丝，把SATA接口翻转过来，撕下保护排线的黑胶带，SATA排线很薄比较脆弱不能硬扯，取排线有技巧的，左边黑色的卡扣可以向上扣开，这样是解锁了，可以很轻松把SATA排线取出来。
4. 然后用螺丝刀拧下内壳上面的8颗螺丝，使用一个卡片在左边空隙慢慢撬一下，取出内壳。
5. 主板板正面有我们需要短接的电阻

![alt text](../../img/image-20251001082300000.png)

然后开始短接电阻刷机。先短接电阻（和网上其他教程短接焊接点是同一个作用），再插入TypeC数据线（刷机过程不需要接DC 12V 供电），2秒左右后松开短接工具。这时候软件提示发现一个 MASKROM 设备，点击软件界面的执行按钮，等待下载数据烧录即可。

若是新版刷机软件遇到"system超过Flash大小 下载失败"报错，可以勾选执行按钮上方的上强制按地址写选项，再次刷机。

![alt text](../../img/image-20251001082500000.png)

系统刷入完成之后拔掉 Typec线，插入 DC 12V 电源线，就可以开始使用了。



**软件截图**

![alt text](../../img/image-20251001082800000.png)

## BliKVM

### Docker 部署

<iframe height="400" width="600" src="//player.bilibili.com/player.html?isOutside=true&aid=115558964068581&bvid=BV1J3C9BoEGE&cid=34046738553&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

**软件截图**

![alt text](../../img/image-20251116163100000.png)

## JetKM

### Docker 部署

<iframe height="400" width="600" src="//player.bilibili.com/player.html?isOutside=true&aid=115558343247531&bvid=BV1CyC9BPE8z&cid=34043465637&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

**软件截图**

![alt text](../../img/image-20251116185500000.png)

## 其他提示

!!! warning "硬件安全警告"

    为避免潜在风险（如被控设备无法正常启动或识别设备，甚至极少数情况下造成硬件损坏），强烈建议在使用 USB 线前采取以下任一安全措施：

    方案一：剪断或移除 USB 线中的红色 5V 电源线（VCC），仅保留数据线（D+/D−）和地线（GND），以切断供电路径；

    方案二：在 USB 链路中串接一个带独立电源开关的 USB HUB，并确保在连接时关闭其电源开关。

    部分低功耗设备可能在未通主电源的情况下，通过 USB OTG 接口从 KVM 设备反向取电，导致进入异常状态——即使后续接通主电源也可能无法正常启动。
    
    **除非您明确了解操作后果，否则请务必采用上述防护措施以保障设备安全。**

!!! tip "数据安全提示"

    不建议直接断电！eMMC 在写入过程中突然断电可能导致数据丢失。

    如因特殊原因需直接断电，建议在写入操作后执行 `sync` 命令确保数据写入；关机或重启时，建议使用 `poweroff` 或 `reboot` 指令，让系统安全完成数据同步和关机流程。


**SSH 远程登录**

Armbian 系统默认开启 SSH，SSH 初始用户密码为 root/1234。

!!! warning "警告"
    不建议使用 `apt upgrade` 升级内核和设备树，可能会出现系统异常，OTG 功能无法使用。

**硬件连接**

Typec 口是 USB OTG 口接被控机设备，USB 3.0 C口是普通 USB 口接 USB 采集卡。

**USB 端点数量**

此硬件 CPU 的 USB OTG 端点数量为9个，共可以虚拟端点总数为9个的 USB 设备。