### 硬件清单

必备硬件：玩客云（含电源和 USB 刷机线），HDMI 转 USB 采集卡（推荐 MS2109 方案），8芯网线和 HDMI 线

可选硬件：TF 卡（扩展储存）、 TTL 转 USB 适配器（调试工具）

**镜像及工具文件**

百度网盘（需登录）：[https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9a](https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9a)j 

OneIndex（免登录不限速）：[https://files.mofeng.run/](https://files.mofeng.run/)

### 部署 One-KVM

**整合包版**

带 burn 后缀的为线刷镜像，可使用 USB_Burning_Tool 晶晨刷机软件线刷至玩客云。不带 burn 后缀的为 U 盘/ SD 卡启动镜像，直接写入 U 盘/ SD 卡即可。镜像为开箱即用，刷好后启动设备就可以开始使用 One-KVM。

![img](./img/1717947165711-51.jpeg)

Amlogic USB Burning Tool 建议使用 v2.1.3 及以下版本，不要使用高版本软件。

刷机短接时不需要一直短接，在烧录软件识别到并加载到 1% 可以松手耐心等待刷机成功了。

玩客云主板刷机短接图片来源于玩客云技术交流群 蓝蓝大佬。

**当前最新镜像版本：image 241018**

网盘路径：/OneKVM 开箱即用固件/


### IP地址

玩客云刷入直刷镜像后默认上网方式为 DHCP 自动获取 IP，主机名为 `onecloud`。启动时由玩客云前面板LED灯会有红灯转为绿灯，启动后在浏览器访问玩客云IP即可。

![image-20240621005943231](./img/image-20240621005943231.png)

