1. ??? "**What is the difference between One-KVM and PiKVM?**"

        One-KVM is built on PiKVM, localized and extended with more features, and supports more hardware and platforms.

        For advanced configuration, refer to the [PiKVM docs](https://docs.pikvm.org/), which explain advanced features in detail.

### Software

1. ??? "**What ports does One-KVM use?**"

        The integrated image uses port 443 by default, and port 80 redirects to 443. The Docker version uses port 4430 by default, and port 8080 redirects to 4430.

        Because the SSL certificate is self-signed, browser warnings are expected. You can ignore the warning or replace the Nginx SSL certificate.

        !!! tip
            Default web and VNC credentials are admin/admin. The root password is usually set by the user; if unset, try 1234.<br>SSH default port: 22<br>VNC default port: 5900<br>Janus WS port: 20000-40000

        !!! tip
            Troubleshooting guide:<br>Web video shows a black screen with "No Signal": check hardware connections.<br>Web page shows a black screen or colored vertical bars: check HDMI input from the target machine.<br>OS display is normal but BIOS is black or renders incorrectly: try enabling CSM in BIOS.<br>Mouse offset or abnormal movement: switch to relative mouse mode in the top-right of the web UI.<br>Screen goes black briefly and repeats after refresh: try Firefox.<br>If none of the above apply, reboot to reset. If still not resolved, submit an issue on GitHub or join the One-KVM group.

1. ??? "**How do I access One-KVM in my LAN from the public Internet?**"

        If your router has a public IP, forward port 443 (integrated image) or 4430 (Docker). Otherwise, use NAT traversal or mesh networking tools like Tailscale or FRP.

1. ??? "**How do I change the web login username and password?**"

        **Note**: For integrated image users, you can log in as root in the HDMI or SSH terminal. The PiKVM web terminal uses the `kvmd-webterm` low-privilege user (no password) and does not have root or `sudo`. To run privileged commands, use `su root` and enter the password.

        **Example: change username/password**
            ```bash
            # Switch to root
            su root

            # Add a user (replace silentwind with your username)
            # Older versions use set; newer versions use add
            #kvmd-htpasswd set silentwind
            kvmd-htpasswd add silentwind
            # Enter password

            # Delete a user
            kvmd-htpasswd del admin

            # List users
            kvmd-htpasswd list

            # Restart services to apply changes
            systemctl restart kvmd kvmd-nginx
            ```

1. ??? "**How do I change the web service ports?**"

         Edit `/etc/kvmd/override.yaml` and set the desired HTTP/HTTPS ports (443 is the default for HTTPS).

         After editing, run `systemctl restart kvmd-nginx` to apply the changes.
            ![override.yaml](../../img/image-202508210916.png)

### Video

1. ??? "**Why is there a persistent black border in the video?**"

        Check the target machine display settings. Matching the resolution to the web UI can help.
        ![img](../../img/1717950485857-8.jpeg)

1. ??? "**BIOS/UEFI display issues or wrong resolution?**"

        On some motherboards, BIOS may display at a low resolution or render incorrectly.

        This can usually be fixed by enabling the Compatibility Support Module (CSM) in BIOS. Video tutorial below (from Bilibili UP: MiaomiaoZhe - Lost Name).

        ![type:video](../../video/开启%20CSM%20兼容性视频教程_x264.mp4)

        If you cannot or do not want to enable CSM, try using a DisplayPort (DP) monitor or a dummy plug. If that does not work, try this sequence: connect a DP cable, boot into BIOS, disable CSM and power off (do not reboot). Then boot into BIOS again, enable CSM, power off, reconnect HDMI, and power on.

### System

1. ??? "**How do I set a static IP?**"

        Use the terminal UI tool `nmtui` or `armbian-config`.

1. ??? "**How do I change the MAC address?**"

        For non-OneCloud devices, use `nmtui` to change the MAC address.

        OneCloud has special constraints. Changing MAC with `nmtui` can prevent IP assignment. Use the method below based on version.

        ???+ "240118 and later"
            Edit `/etc/systemd/network/99-eth0.network` to change the MAC address.

        ???+ "240138 to 240104"
            ```bash
            # Switch networking from NetworkManager to systemd-networkd
            # to avoid MAC-change IP issues
            # Run the four commands below (change the MAC as needed)
            echo -e '[Match]\nName=eth0\n\n[Network]\nDHCP=yes\n\n[Link]\nMACAddress=2a:01:3d:ef:b8:e1' > /etc/systemd/network/99-eth0.network
            systemctl mask NetworkManager
            systemctl unmask systemd-networkd
            systemctl enable systemd-networkd systemd-resolved
            ```
            Edit `/etc/systemd/network/99-eth0.network` to change the MAC address.

        ???+ "Earlier than 240121"
            ```bash
            # Quick command sequence
            MAC="$(echo 2a:01:`openssl rand -hex 4 | sed 's/\(..\)/\1:/g; s/.$//'`)"
            echo $MAC
            # This replacement only works the first time; later changes require manual edits
            sed -ie "s/#hwaddress ether/hwaddress ether $MAC/g" /etc/network/interfaces
            reboot
            ```

1. ??? "**How do I connect Wi-Fi using a USB adapter?**"

        For OneCloud, the images built by the author and hzytic include common Wi-Fi drivers, so USB Wi-Fi adapters are plug-and-play. Other hardware must be tested for driver support.
        ```bash
        nmtui
        ```
        ![img](../../img/1717950485857-7.png)

1. ??? "**How do I change the OneCloud front panel LED color?**"

        On 5.9 kernels, `green_on`, `red_on`, `blue_on`, `green_off`, `red_off`, and `blue_off` are available.

        On 6.x kernels, use the following commands (0 = off, 1 = on):
        ```bash
        echo 0 > /sys/class/leds/onecloud:red:alive/brightness
        echo 0 > /sys/class/leds/onecloud:blue:alive/brightness
        echo 0 > /sys/class/leds/onecloud:green:alive/brightness
        ```

1. ??? "**How do I change the CumeBox 2 front panel LED color?**"

        Use the following commands (0 = off, 1 = on):

        ```bash
        echo 0 > /sys/class/leds/red/brightness
        echo 0 > /sys/class/leds/blue/brightness
        echo 1 > /sys/class/leds/green/brightness
        ```

1. ??? "**After flashing OneCloud with the integrated image, LAN access is very slow (seconds of delay). How do I fix it?**"

        This is a rare OneCloud compatibility issue (~2%). Tests show it can be fixed by changing the OneCloud DTB network mode from "rgmii-id" to "rgmii-rxid" and rebooting.
        ```bash
        dtc -I dtb -O dts /boot/dtb/meson8b-onecloud.dtb -o meson8b-onecloud.dts
        nano meson8b-onecloud.dts
        dtc -I dts -O dtb meson8b-onecloud.dts -o /boot/dtb/meson8b-onecloud.dtb
        reboot
        ```

        ``` hl_lines="4 5"
            pinctrl-names = "default";

            phy-handle = <&eth_phy>;
        -   phy-mode = "rgmii-id";
        +   phy-mode = "rgmii-rxid";

            mdio {
                compatible = "snps,dwmac-mdio";
        ```

1. ??? "**`apt update` fails?**"

        First, check network connectivity and the package mirror, then try switching mirrors.

        If you see `E: Release file for xxx is not valid yet (invalid for another 4d 3h 56min 24s). Updates for this repository will not be applied.`, run:
        ```bash
        sudo apt install ntp
        sudo service ntp restart
        ```