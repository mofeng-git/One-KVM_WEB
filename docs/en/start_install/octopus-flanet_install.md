### Hardware

The Octopus Flanet box features an S912 octa-core CPU, 2GB RAM, and 8GB internal storage. It has a Gigabit Ethernet port, two USB 2.0 ports, a TF slot, and HDMI output.

### Integrated Image Deployment

1. Flash a minimal Android TV firmware using USB_Burning_Tool
2. Write the One-KVM integrated image to a USB drive and plug it into the USB 2.0 port near the QR code
3. After Android boots, connect via `adb connect <ip>` and run `adb reboot update` to boot from the USB drive (first time only)
4. Once booted from USB, SSH in and run `armbian-install` (choose the correct model, e.g., 202/1-partition) to install to EMMC

???+ help "Boot from USB1 port"

    If the device fails to boot from USB2, you can boot from USB1:
    
    After writing the image to the USB drive, edit `uEnv.txt` in the BOOT partition root, replace `FDT=/dtb/amlogic/meson-gxm-khadas-vim2.dtb` with `FDT=/dtb/amlogic/meson-gxm-q200.dtb`. Then edit `etc/rc.local` in the ROOTFS partition and comment out the second line by prefixing `#`.
    
    After successfully booting from USB1 and logging in, edit `/etc/rc.local` again to remove the `#` from the second line, save, and then run `armbian-install` to write to EMMC.

Install example:
![install](../img/2024-12-02_17-36.png)

### Usage

!!! tip "Reminder"
    Some low-power targets may draw power via OTG before external power is applied and enter a bad state. Cut the red 5V wire inside the USB cable to avoid this.

**SSH**

Armbian enables SSH by default. Initial credentials: root/1234.

!!! warning "Warning"
    Do not run `apt upgrade` to upgrade the kernel/DTB. It may break OTG.

**Connections**

The USB port near the Ethernet jack is OTG for the dual-headed cable; the port near the QR code is for the USB HDMI capture card.

![image-20240926220219805](../img/IMG_20241202_180410.png)

**Screenshots**

![Octopus Flanet](../img/IMG_20241202_184800.png)


