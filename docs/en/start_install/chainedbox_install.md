### Hardware

ChainedBox uses an RK3328 CPU with 1GB RAM and 8GB internal storage. It has a 3.5" SATA bay, a Gigabit Ethernet port, one USB 3.0 and one USB 2.0 port (the latter can serve as OTG).

### Integrated Image Deployment

1. Prepare the One-KVM integrated image and install Rockchip Dev Tool on your PC
2. Short the MASKROM pads on the board while connecting the USB dual-headed cable to the USB 2.0 port; power on to enter MASKROM mode. The tool should detect the device
3. Flash the One-KVM image using the Rockchip tool. After flashing, power on and it will boot into One-KVM

![MASKROM pads](../img/freecompress-01b88f3974c8f447d7c098ccaa292a32.jpeg)

![Flash image](../img/image-202411182144.png)

### Usage

!!! tip "Reminder"
    Some low-power targets may draw power from the OTG port and enter a bad state before external power is applied. If so, cut the red 5V wire inside the USB cable.

**SSH**

Armbian enables SSH by default. Initial credentials: root/1234.

!!! warning "Warning"
    Do not run `apt upgrade` to upgrade the kernel/DTB. It may break OTG.

**Connections**

USB 2.0 is the OTG port for the dual-headed USB cable; USB 3.0 is for the USB HDMI capture card.

![Connections](../img/freecompress-1733221690264.png)


