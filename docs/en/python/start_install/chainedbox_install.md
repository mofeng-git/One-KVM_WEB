### Hardware Overview

ChainedBox uses an RK3328 CPU with 1 GB RAM and 8 GB internal storage. It has a 3.5-inch SATA bay, a gigabit Ethernet port, one USB 3.0 port, and one USB 2.0 port (which can be used as OTG).

### Integrated Image Deployment

1. **Preparation**: Download the One-KVM image and install the Rockchip development tool on your PC.
2. **Open the case and short pads**: Connect a USB male-to-male cable to the USB 2.0 port, short the MASKROM pads on the board, then power on. The device enters MASKROM mode, and the tool should detect it.
3. **Flash firmware**: In the Rockchip tool, select the One-KVM image and flash it. After flashing, power on the device again to boot into One-KVM.

![MASKROM pads](../../img/freecompress-01b88f3974c8f447d7c098ccaa292a32.jpeg)

![Flash image](../../img/image-202411182144.png)

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


**SSH**

SSH is enabled by default on Armbian. The initial credentials are root/1234.

!!! warning "System upgrade warning"
    Do not use `apt upgrade` to upgrade the kernel and device tree; this may break the system and OTG functionality.

**Hardware connections**

The USB 2.0 port is the OTG port for the USB male-to-male cable. The USB 3.0 port is a normal USB port for the USB HDMI capture card.

![Connections](../../img/freecompress-1733221690264.jpg)
