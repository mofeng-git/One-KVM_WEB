### Hardware

Orange Pi Zero uses the Allwinner H2/H3+ (quad-core A7). It integrates a 100M Ethernet port, onboard Wi-Fi, onboard storage, USB OTG power, and a USB 2.0 port.

Note: Power and OTG data share the same Micro-USB port. A power/data splitter cable is recommended.

### Docker Deployment

First, write Armbian to an SD card. This guide uses `Armbian_23.02.0-trunk_Orangepizero_jammy_current_5.15.85_msd-patched.img` and deploys One-KVM via Docker.

Armbian image: `Armbian_23.02.0-trunk_Orangepizero_jammy_current_5.15.85_msd-patched.zip`

![image-20241126135200887](../img/image-20241126135200887.png)

After booting, run:

```
# Prevent auto-loading g_serial
echo "" > /etc/modules-load.d/modules.conf
reboot

# Install One-KVM with Docker
apt update
apt install docker.io
docker run --name kvmd -itd --privileged=true \
    -v /dev:/dev -v /sys/kernel/config:/sys/kernel/config \
    -v /lib/modules:/lib/modules:ro -e OTG=1 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    silentwind0/kvmd
# Enable auto-restart
docker update --restart=always kvmd
```

Result:

![image-20241126144130798](../img/image-20241126144130798.png)

### Others

!!! tip "Reminder"
    With a power/data splitter cable, some low-power targets may draw power and enter a bad state before external power is applied. Cut the red 5V wire in the USB data cable to avoid this.

**SSH**

Armbian enables SSH by default. Initial credentials: root/1234. For Orange Pi official images, default is root/orangepi.

!!! warning "Warning"
    Do not run `apt upgrade` to upgrade the kernel/DTB. It may break OTG.

**Wi-Fi**

To connect 2.4G Wi-Fi, run:

```
nmtui
```


