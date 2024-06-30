### USB 以太网 基本配置

1. 编辑 `/etc/kvmd/override.yaml` 文件添加以下行：

    ```yaml
    otg:
        devices:
            ethernet:
                enabled: true
                driver: ecm
                host_mac: 48:6f:73:74:50:43
                kvm_mac: 42:61:64:55:53:42
    ```

    `host_mac` 地址将用于被控机的网络接口。`kvm_mac` 表示将分配给 PiKVM 本地接口的地址。KVM 接口将被称为 `usb0network` 接口。如果没有指定 `host_mac` 或 `kvm_mac`，将使用随机值。驱动程序参数表示 USB 网络将使用的协议，默认值为 ecm，其他可用值包括 eem、ncm、rndis 和 rndis5。

    **驱动程序兼容性：**

    | 驱动程序 | 操作系统                               |
    | :------- | :------------------------------------- |
    | ecm      | Linux macOS                            |
    | eem      | Linux                                  |
    | rndis5   | 从Windows XP到Windows 7 Linux > 2.6.13 |
    | rndis    | Windows 7及以上 Linux > 2.6.13         |
    | ncm      | Windows 10及以上 Linux > 2.6.37 macOS  |

    ![PixPin_2024-06-30_20-41-01](./img/PixPin_2024-06-30_20-41-01.png)

2. 要在被控机上自动配置 USB 网络，建议使用 `kvmd-otgnet` 服务。它会配置防火墙，为本地 PiKVM 接口 `usb0` 分配地址，并启动 DHCP，以便帮助被控机获取 IPv4 地址。默认情况下，将为接口 `usb0` 分配 172.30.30.0/24 地址。当服务器通过 DHCP 请求时，网络 172.30.30.0/24 中的其他地址之一将分配给被控机。出于安全考虑，从被控机到 PiKVM 端的所有传入连接都将被阻止（ICMP 和用于 DHCP 的 UDP 端口 67 除外）。

    ```bash
    sudo systemctl start kvmd-otgnet
    sudo systemctl enable kvmd-otgnet
    ```

    在 `kvmd-otgnet`  服务运行后，被控机可能需要手动进行 DHCP 请求才能获取到 IP 地址。

    ``` 
    #在 Ubuntu 22.04 上经过测试
    
    #根据 host_mac 地址判断 USB 网络接口名称
    ifconfig -a
    sudo apt install udhcpc
    udhcpc -i 网络接口
    ```

    ![PixPin_2024-06-30_21-07-06](./img/PixPin_2024-06-30_21-07-06.png)

    如果要允许从被控机访问 PiKVM 界面，则需要使用 /etc/kvmd/override.yaml 文件在白名单中添加端口 80 和 443，如下所示：

    ```yaml
    otgnet:
        firewall:
            allow_tcp: [80, 443]
    ```

### 路由转发

默认情况下，将仅在 PiKVM 和被控机主机之间配置网络连接，被控机主机将无法访问 PiKVM 以外的其他主机。如果被控机主机需要通过 USB 以太网功能访问全部网络（访问 PiKVM 可以访问的所有主机），则需要在 `/etc/kvmd/override.yaml` 中添加额外设置。

1. 允许 IPv4 转发

    ```bash
    echo "net.ipv4.ip_forward = 1" > /etc/sysctl.d/99-kvmd-extra.conf
    ```

2. 在配置文件下添加几行，添加用于转发请求的网络接口（默认网关）、添加 DNS 服务器以提供主机名解析服务，以及其他 otgnet 配置。 

     `net` 参数定义 `usb0` 网络的网络地址范围，服务器主机将自动接收该网络内的 IP 地址，包括在 `post_start_cmd_append` 下定义的 DNS 服务器。注意：该网络不应与 PiKVM 所连接的网络相同。

    ```yaml
    otgnet:
        firewall:
            forward_iface: eth0
        commands:
            post_start_cmd_append:
            - "--dhcp-option=6,8.8.8.8"
        iface:
            net: 10.65.0.0/28
    ```

3. 重启 PiKVM。`reboot`

    ![PixPin_2024-06-30_21-43-59](./img/PixPin_2024-06-30_21-43-59.png)

   

