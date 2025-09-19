1. ??? "**One-KVM 与 PiKVM 的不同之处？**"

        One-KVM 基于 PiKVM 二次开发，在 PiKVM 的基础上进行了本地化，增加了更多扩展功能，支持更多的硬件设备和平台。

        两者具体功能异同之处可以查看[软件功能](../prepare.md#_2)一节。

        如果您需要对功能进行高级配置，也可以查阅 [PiKVM 文档](https://docs.pikvm.org/)，该项目文档关于高级功能配置的说明比较详细。

### 软件

1. ??? "**One-KVM 运行端口**"

        整合包软件默认运行在 443 端口，访问 80 端口会自动跳转到 443 端口。Docker 版本默认运行在 4430 端口，访问 8080 端口会自动跳转到 4430 端口。

        由于软件 SSL 证书为自签证书，不被浏览器信任是正常情况，请无视风险继续访问，若有需要可自行更换 Nginx SSL 证书。

        !!! tip
            初始 WEB 和 VN C账号密码都为admin/admin，root用户密码通常为用户自行设置，若未设置可尝试 1234。<br>ssh 默认端口：22<br>vnc 默认端口：5900<br>janus ws 端口：20000-40000

        !!! tip
            排障指南：<br>网页视频黑屏提示无 No Singal，请检查硬件是否正确连接或松动；<br>网页端黑屏无任何画面或彩色竖条，请检查是否有被控机 HDMI 信号输入；<br>进系统画面显示正常， BIOS 界面黑屏或渲染异常，请尝试在 BIOS 界面开启 CMS 兼容模式；<br>虚拟鼠标错位或移动范围异常可尝试在网页右上角切换鼠标相对模式；<br>画面显示片刻黑屏，刷新网页重复此现象，可以尝试使用火狐浏览器；<br>如果以上情况都不符合请尝试重启系统自动复位，仍旧无法解决可在 Github 提交 issue 或加入 One-KVM 交流群反馈。


1. ??? "**如何在公网中访问局域网的 One-KVM？**"

        如果路由器有公网 IP 地址，可以使用端口映射转发443端口（对于整合包）或4430端口（对于 Docker）。在其他情况下，可以使用内网穿透或异地组网服务（如 Tailscale 和 FRP ）。

1. ??? "**如何修改软件 WEB 登录的账户密码？**"


        **注意**：对于整合包用户，HDMI 终端和 SSH 终端可以直接以root用户登录。但PiKVM网页终端的默认登入用户是kvmd-webterm低权限账户（无密码），没有 root 权限且无法使用 `sudo` 提权，若需要执行特权命令请先在终端执行 `su root` 命令并输入密码切换为root账户。

        **修改账号密码示例**
            ```bash
            #切换为 root 账户
            su root
            #添加用户 请将 silentwind 替换为你的用户名
            kvmd-htpasswd set silentwind
            #输入密码
            #删除用户
            kvmd-htpasswd del admin
            #列出所有用户
            kvmd-htpasswd list
            #重启服务，使修改生效
            systemctl restart kvmd kvmd-nginx
            ```


1. ??? "**如何修改软件 WEB 服务运行的端口？**"

         修改端口可以编辑 `/etc/kvmd/override.yaml` 文件，将 http 端口和 https 修改所需端口（443 是网页运行的默认端口）。
         
         修改完成后运行 `systemctl restart kvmd-nginx` 命令重启 `kvmd-nginx` 服务后生效。
            ![override.yaml](../img/image-202508210916.png)

### 视频

1. ??? "**为什么网页视频会有无法消除的黑边？**"

        请检查你的被控机系统设置。调整被控机分辨率与网页匹配可能会有帮助。
        ![img](../img/1717950485857-8.jpeg)

1. ??? "**BIOS/UEFI 画面异常或分辨率错误？**"

        在某些主板上，BIOS 可能以较低的分辨率显示，或者出现一些渲染问题。
        
        此问题通常可以通过在 BIOS 中启用兼容性支持模块 （CSM） 来解决，视频教程如下(截取自 B站UP主 喵喵折-痛失网名版)。

        ![type:video](../video/开启%20CSM%20兼容性视频教程_x264.mp4)

        如果您不能或不想启用 CSM，您可以尝试连接 DisplayPort （DP） 显示器或虚拟插头。如果这些都不起作用，请先尝试连接 DP 电缆，启动到 BIOS，禁用 CSM 并关闭（不要重新启动）您的 PC。然后，启动到 BIOS 并启用 CSM，然后再关闭 PC。然后连接 HDMI 并再次打开您的 PC。

### 系统

1. ??? "**如何给设置静态 IP？**"

        使用终端图形化工具  `nmtui`或 `armbian-config`。

1. ??? "**如何修改 MAC 地址？**"

        非玩客云设备可以使用终端图形化工具 `nmtui` 修改 mac 地址。

        玩客云由于其特殊性不能直接使用使用终端图形化工具 `nmtui` 修改 mac 地址，会修改 mac 无法获取 ip 问题，不同版本修改 mac 地址的方法见下表。

        ???+ "240118 版本及以后"
            需要修改 mac 地址编辑 /etc/systemd/network/99-eth0.network 文件即可。

        ???+ "240138 到 240104 版本"
            ```bash
            #由 systemd-networkd 替换 NetworkManager 接管网络
            #避免修改 mac 无法获取 ip 问题
            #执行下面四句命令即可（mac 地址按需修改）
            echo -e '[Match]\nName=eth0\n\n[Network]\nDHCP=yes\n\n[Link]\nMACAddress=2a:01:3d:ef:b8:e1' > /etc/systemd/network/99-eth0.network
            systemctl mask NetworkManager
            systemctl unmask systemd-networkd
            systemctl enable systemd-networkd systemd-resolved
            ```
            mac 地址编辑 /etc/systemd/network/99-eth0.network 文件即可。

        ???+ "更早到 240121 版本"
            ```bash
            #快捷命令，依次执行如下命令即可
            MAC="$(echo 2a:01:`openssl rand -hex 4 | sed 's/\(..\)/\1:/g; s/.$//'`)"
            echo $MAC
            #此配置文件替换命令仅首次执行有效，多次需要手动替换 mac 地址
            sed -ie "s/#hwaddress ether/hwaddress ether $MAC/g" /etc/network/interfaces
            reboot
            ```

1. ??? "**如何使用 USB 无线网卡连接 WIFI？**"

        对于玩客云，作者和 hzytic 大佬编译发布的镜像都已包含常见无线网卡驱动，USB 无线网卡即插即用。其他硬件系统需自行测试是否能够驱动 USB 无线网卡。
        ```bash
        nmtui
        ```
        ![img](../img/1717950485857-7.png)


1. ??? "**如何改变玩客云前面板 LED 灯颜色？**"

        对于5.9内核系统有`green_on`,`red_on`,`blue_on`,`green_off`,`red_off`,`blue_off`命令可用。

        对于6.x高内核的系统，可以使用如下命令控制LED的亮灭，0为灭，1为亮。
        ```bash
        echo 0 > /sys/class/leds/onecloud:red:alive/brightness
        echo 0 > /sys/class/leds/onecloud:blue:alive/brightness
        echo 0 > /sys/class/leds/onecloud:green:alive/brightness
        ```

1. ??? "**如何改变私家云二代前面板 LED 灯颜色？**"

        可以使用如下命令控制LED的亮灭，0为灭，1为亮。

        ```bash
        echo 0 > /sys/class/leds/red/brightness
        echo 0 > /sys/class/leds/blue/brightness
        echo 1 > /sys/class/leds/green/brightness
        ```

1. ??? "**玩客云刷入整合包后局域网访问响应非常缓慢，延时高达数秒，如何解决？**"

        此为极少数玩客云系统适配问题，发生频率约为2%，作者测试可通过修改玩客云 dtb 网卡模式 "rgmii-id" 为 "rgmii-rxid" 的方法解决，修改后重启生效。
        ```bash 
        dtc -I dtb -O dts /boot/dtb/meson8b-onecloud.dtb -o meson8b-onecloud.dts
        nano meson8b-onecloud.dts
        dtc -I dts -O dtb meson8b-onecloud.dts -o /boot/dtb/meson8b-onecloud.dtb
        reboot
        ```

        ``` hl_lines="4 5"
         	pinctrl-names = "default";
 
 	        phy-handle = <&eth_phy>;
        -	phy-mode = "rgmii-id";
        +	phy-mode = "rgmii-rxid";
 
 	        mdio {
 		        compatible = "snps,dwmac-mdio";
        ```

1. ??? "**apt update 报错无法更新？**"

        首先检查网络连接和源是否正常，然后尝试更换源。

        如果遇到 `E: Release file for xxx is not valid yet (invalid for another 4d 3h 56min 24s). Updates for this repository will not be applied.` 错误可以执行以下命令。
        ```bash
        sudo apt install ntp 
        sudo service ntp restart 
        ```