### Hardware

Cumebox 2 (aka Bitmi Box, CumeBox2 — same hardware) features an Amlogic S905X, 1GB RAM, 8GB internal storage, one 100M Ethernet port, two USB 2.0 ports, one OTG 2.0 port, two SATA 3.0 ports, dual-band Wi-Fi and Bluetooth, with TF slot and HDMI output.

### Integrated Image Deployment

The base image is adapted from Armbian Khadas-vim1 with DTB changes; Ethernet, OLED, Wi-Fi, and OTG all work.

**Flashing steps**

1. Download Android TV 6.0 firmware (as an intermediate system)
2. Short specific pads on the board as shown to enter flashing mode
3. Use Amlogic USB Burning Tool to flash the Android TV firmware
4. Install a specific APK in Android TV so the device can boot Armbian from a USB drive or TF card
5. Reboot into Armbian prepared on external media
6. Finally, write the integrated image to eMMC via dd

![Short pads](../img/IMG_20241203_195852.jpg)

Detailed guide: [CumeBox2 Armbian install (ruohai.wang)](https://ruohai.wang/202404/cumebox2-install-armbian/)

**Upgrade**

Write the latest dd image to a USB drive, plug it in, and boot to the USB system. To flash to eMMC, use dd to write the image to eMMC.
  

### Docker Deployment

**Install Docker**

- Using distro packages:
``` bash
apt install apparmor-utils docker.io -y
```
- Or the latest:
```bash
curl -fsSL https://get.docker.com | bash
```

**Run One-KVM in Docker**
```bash
# Use OTG HID
# /dev/video0 exists in the system; new USB capture cards start from /dev/video1
docker run --name kvmd -itd --privileged=true \
    -v /dev:/dev -v /sys/kernel/config:/sys/kernel/config \
    -v /lib/modules:/lib/modules:ro \
    -e OTG=1 -e VIDEONUM=1 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    silentwind0/kvmd
    
# After confirming it runs, enable auto-restart
docker logs kvmd
docker update --restart=always kvmd
```

![image-20240926220902937](../img/image-20240926220902937.png)

### Usage

!!! tip "Reminder"
    Some low-power targets may draw power via the OTG port and enter a bad state before external power is applied. If so, cut the red 5V wire inside the USB cable.

**SSH**

Armbian enables SSH by default. Initial credentials: root/1234.

!!! warning "Warning"
    Do not run `apt upgrade` to upgrade the kernel/DTB. It may break OTG.

**Connections**

![image-20240926220219805](../img/image-20240926220219805.png)

**OLED**

The front-panel OLED cycles through a welcome message, temperature, and IP address.

![oled](../img/1730628391056.png)


**Wi-Fi**

- Install packages
```bash
apt install network-manager -y
```

- Connect to Wi-Fi
```bash
# Use the TUI to connect (dual-band supported)
# After first-time setup, the box will auto-connect on reboot
nmtui
```

![image-20240926220204960](../img/image-20240926220204960.png)

**ATX power control**

Cumebox 2 can use a USB HID relay for physical power control.

![img](../img/1717946862304-33.png)


