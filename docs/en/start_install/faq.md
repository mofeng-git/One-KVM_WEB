1. ??? "**What's the difference between One-KVM and PiKVM?**"

        One-KVM is developed based on PiKVM with localization and many extensions, supporting more hardware and platforms.

        See the [Features](../prepare.md#_2) section for a detailed comparison.

        For advanced configuration, refer to the [PiKVM documentation](https://docs.pikvm.org/), which covers advanced features in depth.

### Software

1. ??? "**What ports does One-KVM use?**"

        The integrated image listens on port 443 by default; visiting 80 will redirect to 443. The Docker version listens on port 4430 by default; visiting 8080 redirects to 4430.

        Since the SSL certificate is self-signed, browsers will mark it untrusted. You may ignore the warning or replace the NGINX SSL certificate.

        !!! tip
            Initial WEB and VNC credentials are admin/admin. The root password is usually set by users; if not set, try 1234.<br>ssh default port: 22<br>vnc default port: 5900<br>janus ws ports: 20000-40000

        !!! tip
            Troubleshooting:<br>No Signal on the web page — check hardware connections;<br>Black screen or colored bars — verify HDMI input from the target machine;<br+            BIOS screen abnormal — try enabling CSM in BIOS;<br>Virtual mouse offset/range issues — switch to relative mouse mode from the top-right menu;<br>Intermittent black screens after refresh — try Firefox;<br>If none of the above helps, reboot the system; if the issue persists, open a GitHub issue or join the One-KVM group.

1. ??? "**How to access One-KVM from the Internet?**"

        If your router has a public IP, map and forward port 443 (integrated image) or 4430 (Docker). Otherwise, use NAT traversal or mesh networking services like Tailscale or FRP.

1. ??? "**How to change the WEB login username/password?**"

        **Note**: For integrated images, you can log in as root via HDMI or SSH. The web terminal (kvmd-webterm) is a low-privilege account without a password; it has no root privileges and cannot use `sudo`. To run privileged commands, run `su root` and enter the password.

        **Example: change credentials**
            ```bash
            # Switch to root
            su root
            # Add a user (replace `silentwind` with your username)
            kvmd-htpasswd set silentwind
            # Enter password when prompted
            # Delete a user
            kvmd-htpasswd del admin
            # List all users
            kvmd-htpasswd list
            # Restart services to apply changes
            systemctl restart kvmd kvmd-nginx
            ```

1. ??? "**How to change the WEB service ports?**"

         Edit `/etc/kvmd/override.yaml` to change HTTP/HTTPS ports (443 is the default for the web UI).
         After editing, run `systemctl restart kvmd-nginx` to apply.
            ![override.yaml](../img/image-202508210916.png)

### Video

1. ??? "**Why are there unavoidable black bars around the video?**"

        Check your target system settings. Adjusting the target's resolution to match the web UI may help.
        ![img](../img/1717950485857-8.jpeg)

1. ??? "**BIOS/UEFI display issues or wrong resolution?**"

        Some motherboards display BIOS at a low resolution or with rendering issues.
        This can often be resolved by enabling Compatibility Support Module (CSM) in BIOS. See the video tutorial below (excerpt from Bilibili: 喵喵折-痛失网名版):

        ![type:video](../video/开启%20CSM%20兼容性视频教程_x264.mp4)

        If you cannot or do not want to enable CSM, try connecting a DisplayPort (DP) monitor or dummy plug. If that still doesn't work, try: connect DP cable, boot to BIOS, disable CSM and shut down (do not reboot). Then boot to BIOS again, enable CSM, shut down, connect HDMI, and power on again.

### System

1. ??? "**How to set a static IP?**"

        Use the TUI tools `nmtui` or `armbian-config`.

1. ??? "**How to change the MAC address?**"

        Non-OneCloud devices: use `nmtui`.

        OneCloud has special constraints and cannot use `nmtui` directly (doing so may prevent DHCP). Methods differ by version:

        ???+ "Version 240118 and later"
            Edit `/etc/systemd/network/99-eth0.network` to set the MAC.

        ???+ "Version 240138 to 240104"
            ```bash
            # Replace NetworkManager with systemd-networkd
            echo -e '[Match]\nName=eth0\n\n[Network]\nDHCP=yes\n\n[Link]\nMACAddress=2a:01:3d:ef:b8:e1' > /etc/systemd/network/99-eth0.network
            systemctl mask NetworkManager
            systemctl unmask systemd-networkd
            systemctl enable systemd-networkd systemd-resolved
            ```
            Then edit `/etc/systemd/network/99-eth0.network` to adjust the MAC if needed.

        ???+ "Earlier to 240121"
            ```bash
            # Quick commands
            MAC="$(echo 2a:01:`openssl rand -hex 4 | sed 's/\(..\)/\1:/g; s/.$//'`)"
            echo $MAC
            # The following replacement only works once; edit manually thereafter
            sed -ie "s/#hwaddress ether/hwaddress ether $MAC/g" /etc/network/interfaces
            reboot
            ```

1. ??? "**How to connect a USB Wi-Fi dongle?**"

        For OneCloud, images by the author and hzytic already include common drivers, so typical USB Wi-Fi dongles are plug-and-play. For other hardware, verify driver support yourself.
        ```bash
        nmtui
        ```
        ![img](../img/1717950485857-7.png)

1. ??? "**How to change the OneCloud front-panel LED color?**"

        On kernel 5.9 systems, the commands `green_on`, `red_on`, `bule_on`, `green_off`, `red_off`, `bule_off` are available.

        On kernel 6.x systems, control LEDs with 0/1 (off/on):
        ```bash
        echo 0 > /sys/class/leds/onecloud:red:alive/brightness
        echo 0 > /sys/class/leds/onecloud:blue:alive/brightness
        echo 0 > /sys/class/leds/onecloud:green:alive/brightness
        ```

1. ??? "**How to change the Cumebox 2 front-panel LED color?**"

        Control LEDs with 0/1 (off/on):

        ```bash
        echo 0 > /sys/class/leds/red/brightness
        echo 0 > /sys/class/leds/blue/brightness
        echo 1 > /sys/class/leds/green/brightness
        ```

1. ??? "**After flashing the integrated image to OneCloud, LAN access is extremely slow (second-level latency). How to fix?**"

        This rare compatibility issue (about 2%) can be fixed by changing the DTB NIC mode from "rgmii-id" to "rgmii-rxid". Reboot after changes.
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

1. ??? "**apt update fails with time-related errors?**"

        Check connectivity and sources first; then try changing mirrors.

        If you see `E: Release file for xxx is not valid yet (invalid for another 4d 3h 56min 24s). Updates for this repository will not be applied.`, run:
        ```bash
        sudo apt install ntp 
        sudo service ntp restart 
        ```


