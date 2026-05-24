### Hardware Overview

The Octopus Planet box uses an S912 octa-core CPU with 2 GB RAM and 8 GB internal storage. It has a gigabit Ethernet port, two USB 2.0 ports, a TF card slot, and HDMI output.

### Integrated Image Deployment

1. **Flash a lightweight Android TV firmware**: Use USB_Burning_Tool to flash the Android ATV firmware.
2. **Prepare a USB boot drive**: Write the One-KVM image to a USB drive and insert it into the USB 2 port next to the QR code.
3. **Boot from USB**: After Android boots, run `adb connect yourip`, then use `adb reboot update` to reboot into the USB system. This step is only required once.
4. **Install to eMMC**: After booting from USB, log in via SSH and run `armbian-install`. Select the correct model (e.g., model 202 and partition 1) to install One-KVM.

???+ help "Booting from USB1"

    Some users report that the device cannot boot from USB2. In that case, use USB1 with the following steps.<br><br>
    After writing the image to the USB drive, edit `uEnv.txt` in the root of the BOOT partition. Replace `FDT=/dtb/amlogic/meson-gxm-khadas-vim2.dtb` with `FDT=/dtb/amlogic/meson-gxm-q200.dtb`. Then edit `rc.local` under the ROOTFS partition `etc` directory and add a `#` at the beginning of line 2 to comment it out.<br><br>
    After successfully booting from USB1 and logging in, edit `/etc/rc.local` again and remove the `#` at the beginning of line 2. Save it, then run `armbian-install` to write the system to eMMC.

Example:
![install](../../img/2024-12-02_17-36.png)

### Usage Notes

!!! warning "Hardware safety warning"

    To avoid potential risks (e.g., the target device failing to boot or recognize devices, and in rare cases hardware damage), we strongly recommend one of the following safety measures before using a USB male-to-male cable:

    Option 1: Cut or remove the red 5V power wire (VCC) in the USB cable, leaving only data (D+/D-) and ground (GND) to prevent back-powering.

    Option 2: Insert a USB hub with an independent power switch in the link, and keep the hub powered off when connecting.

    Some low-power devices may draw power back through the USB OTG port when their main power is off, causing an abnormal state that may prevent boot even after main power is restored.

    **Unless you fully understand the risks, use one of the above protections to keep devices safe.**

!!! tip "Data safety"

    Avoid hard power-offs. Sudden power loss during eMMC writes can cause data loss.

    If you must cut power, run `sync` after write operations to flush data. For shutdown or reboot, use `poweroff` or `reboot` so the system can sync and shut down cleanly.


**SSH remote login**

SSH is enabled by default on Armbian. The initial credentials are root/1234.

!!! warning "Warning"
    Do not use `apt upgrade` to upgrade the kernel and device tree; this may break the system and OTG functionality.

**Hardware connections**

The USB port next to the Ethernet jack is the OTG port for the USB male-to-male cable. The USB port next to the QR code is a normal USB port for the USB HDMI capture card.

![image-20240926220219805](../../img/IMG_20241202_180410.png)

**Screenshots**

![Octopus Planet](../../img/IMG_20241202_184800.png)