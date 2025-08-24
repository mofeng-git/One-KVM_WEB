### Basic configuration

1. Edit `/etc/kvmd/override.yaml`:
    ```yaml
    otg:
        devices:
            ethernet:
                enabled: true
                driver: ecm
                host_mac: 48:6f:73:74:50:43  # Target host NIC MAC
                kvm_mac: 42:61:64:55:53:42   # PiKVM usb0 MAC
    ```

    **Driver compatibility:**

    | Driver | OS                                   |
    | :----- | :----------------------------------- |
    | ecm    | Linux, macOS                         |
    | eem    | Linux                                |
    | rndis5 | Windows XP–7, Linux > 2.6.13         |
    | rndis  | Windows 7+, Linux > 2.6.13          |
    | ncm    | Windows 10+, Linux > 2.6.37, macOS   |

    ![PixPin_2024-06-30_20-41-01](../img/PixPin_2024-06-30_20-41-01.png)

2. Enable the `kvmd-otgnet` service for auto-configuration:
    ```bash
    sudo systemctl start kvmd-otgnet
    sudo systemctl enable kvmd-otgnet
    ```

    > Note: after the service starts, the target may need to request an IP manually:
    ```bash
    # Tested on Ubuntu 22.04
    ifconfig -a                # Find interface name
    sudo apt install udhcpc   # Install DHCP client
    udhcpc -i <iface>         # Obtain an IP address
    ```

    ![PixPin_2024-06-30_21-07-06](../img/PixPin_2024-06-30_21-07-06.png)
    To allow the target host to access the One-KVM UI, whitelist ports 80 and 443 in `/etc/kvmd/override.yaml`:
    ```yaml
    otgnet:
        firewall:
            allow_tcp: [80, 443]
    ```

### Routing & forwarding

To enable the target to access the external network:

1. Enable IPv4 forwarding:
    ```bash
    echo "net.ipv4.ip_forward = 1" > /etc/sysctl.d/99-kvmd-extra.conf
    ```

2. Configure network parameters in `/etc/kvmd/override.yaml`:
    ```yaml
    otgnet:
        firewall:
            forward_iface: eth0    # Upstream interface
        commands:
            post_start_cmd_append:
            - "--dhcp-option=6,8.8.8.8"    # DNS
        iface:
            net: 10.65.0.0/28    # Address range different from the main LAN
    ```

3. Reboot One-KVM: `reboot`
    ![PixPin_2024-06-30_21-43-59](../img/PixPin_2024-06-30_21-43-59.png)

### Windows setup

For Windows:

1. Use the `rndis` driver
2. Windows 7+ installs the driver automatically
3. Windows XP–7 requires manual installation of the RNDIS 5 driver

After configuration, test connectivity using ping.


