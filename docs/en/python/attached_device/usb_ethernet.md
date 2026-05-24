### Basic Configuration

1. Edit `/etc/kvmd/override.yaml` and add:
    ```yaml
    otg:
        devices:
            ethernet:
                enabled: true
                driver: ecm
                host_mac: 48:6f:73:74:50:43  # Target MAC address
                kvm_mac: 42:61:64:55:53:42   # PiKVM usb0 MAC address
    ```

    **Driver compatibility:**

    | Driver | OS |
    | :------- | :------------------------------------- |
    | ecm | Linux, macOS |
    | eem | Linux |
    | rndis5 | Windows XP to Windows 7, Linux > 2.6.13 |
    | rndis | Windows 7+, Linux > 2.6.13 |
    | ncm | Windows 10+, Linux > 2.6.37, macOS |

    ![PixPin_2024-06-30_20-41-01](../../img/PixPin_2024-06-30_20-41-01.png)

2. Enable the `kvmd-otgnet` service for automatic setup:
    ```bash
    sudo systemctl start kvmd-otgnet
    sudo systemctl enable kvmd-otgnet
    ```

    > Note: After the service starts, the target may need to acquire an IP manually:
    ```bash
    # Tested on Ubuntu 22.04
    ifconfig -a                # List interfaces
    sudo apt install udhcpc   # Install DHCP client
    udhcpc -i <interface>      # Acquire IP
    ```

    ![PixPin_2024-06-30_21-07-06](../../img/PixPin_2024-06-30_21-07-06.png)
    To allow the target machine to access the One-KVM UI, add ports 80 and 443 to the whitelist in `/etc/kvmd/override.yaml`:
    ```yaml
    otgnet:
        firewall:
            allow_tcp: [80, 443]
    ```

### Routing and Forwarding

To allow the target to access external networks:

1. Enable IPv4 forwarding:
    ```bash
    echo "net.ipv4.ip_forward = 1" > /etc/sysctl.d/99-kvmd-extra.conf
    ```

2. Configure network settings in `/etc/kvmd/override.yaml`:
    ```yaml
    otgnet:
        firewall:
            forward_iface: eth0    # External interface
        commands:
            post_start_cmd_append:
            - "--dhcp-option=6,8.8.8.8"    # DNS server
        iface:
            net: 10.65.0.0/28    # Use a subnet different from the main network
    ```

3. Reboot One-KVM: `reboot`
    ![PixPin_2024-06-30_21-43-59](../../img/PixPin_2024-06-30_21-43-59.png)

### Windows Configuration

For Windows:

1. Use the `rndis` driver
2. Windows 7+ installs drivers automatically
3. Windows XP to Windows 7 requires manual RNDIS 5 driver installation

After setup, use ping to verify connectivity.