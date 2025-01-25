### 硬件说明

!!! warning "警告"
    此 One-KVM 整合包已经在中兴 B863AV3.2M 和 CM311-1a-CH 设备上通过了测试。对于其他使用 S905L3A CPU 的盒子，可能不完全兼容。如果遇到不兼容的情况，请考虑下面提供的 Docker 部署方法。

当使用 `armbian-install` 工具安装时，以下是支持的设备列表及其对应的 DTB 文件名：

```
--------------------------------------------------------------------------------------
ID    SOC        MODEL                               DTB                                               
--------------------------------------------------------------------------------------
301   s905x2     X96-Max-4GB,Tx5-Max                 meson-g12a-x96-max.dtb                            
302   s905x2     X96-Max-2GB,A95X-F2                 meson-g12a-x96-max-rmii.dtb                       
303   s905x2     MECOOL-KM3-4G                       meson-g12a-sei510.dtb                             
304   s905l3a    E900V22C-D,CM311-1a-CH,IP112H       meson-g12a-s905l3a-e900v22c.dtb                   
305   s905l3a    CM311-1a-YST                        meson-g12a-s905l3a-cm311.dtb                      
306   s905l3a    M401A,UNT403A,B863AV3.2-M           meson-g12a-s905l3a-m401a.dtb                      
0     Other      Customize                           Enter-custom-dtb-name                             
--------------------------------------------------------------------------------------
```

### 整合包部署

1. **写入整合包**：将 One-KVM 整合包写入U盘或 TF 卡。
2. **进入 Android TV**：启动设备并进入预装的 Android TV 系统。
3. **安装引导 APK**：在 Android TV 中获取 ROOT 权限，并安装用于切换到外部介质（如U盘或 TF 卡）引导的 APK。
4. **刷入固件**：在Android TV启动 APK 引导U盘或 TF 卡，进入 Armbian 环境之后使用 `armbian-install` 命令选择与设备匹配的型号进行安装。

安装示例：
![install](../img/PixPin_2024-10-16_22-49-59.png)

### Docker 部署

如果使用Docker来部署服务，步骤如下：

1. **刷入 Android 系统**：为您的机顶盒刷入一个可 ROOT 的 Android 系统，并安装用于切换到外部介质引导的 APK。
2. **刷入 Armbian 系统**：为优盘刷入一个可启动的 Armbian 系统镜像，并将其接入机顶盒，在 Android系统下切换至该外部介质启动。
3. **刷写 EMMC**：使用 `armbian-install` 命令将当前的 Armbian 系统刷写入 EMMC。
4. **配置 Docker**：拔出优盘，重启机顶盒。更换软件源为国内源，然后安装 Docker。
5. **部署 One-KVM**：使用 Docker运行 One-KVM 镜像，确保 OTG 端口被正确设置为 device 模式，并将此命令添加到开机启动脚本中。确认容器正常运行后，设置 Docker 服务以及容器自启动。

部署 One-KVM 的命令如下：

- 运行 kvmd 容器
```bash
sudo docker run --name kvmd -itd --privileged=true
    -v /lib/modules:/lib/modules:ro -v /dev:/dev
    -v /sys/kernel/config:/sys/kernel/config -e OTG=1 -e VIDEONUM=1 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    registry.cn-hangzhou.aliyuncs.com/silentwind/kvmd
```
- 设置 OTG 端口为 device 模式
```bash
#使能 OTG device 模式
sudo echo device > /sys/class/usb_role/ffe09000.usb-role-switch/role
#将 OTG 端口使能命令写入开机启动脚本 /etc/rc.local
sudo nano /etc/rc.local
#添加脚本执行权限
sudo chmod +x /etc/rc.local
```

- 设置容器开机自启动
```bash
sudo systemctl enable docker
sudo docker update --restart=always kvmd
```