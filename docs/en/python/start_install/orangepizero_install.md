### Hardware Overview

Orange Pi Zero uses an Allwinner H2/H3+ quad-core A7 CPU, with 100 Mbps Ethernet, onboard Wi-Fi, onboard storage, USB OTG power, and a USB 2.0 port.

Note: On Orange Pi Zero, power and OTG data share the same micro-USB port. A Y cable that separates power and data is recommended.

### Docker Deployment

Write the Armbian image to an SD card. This guide uses `Armbian_23.02.0-trunk_Orangepizero_jammy_current_5.15.85_msd-patched.img` as the base system and deploys One-KVM via Docker.

Armbian image download: [Armbian_23.02.0-trunk_Orangepizero_jammy_current_5.15.85_msd-patched.zip](https://github.com/jacobbar/fruity-pikvm/releases/download/os-images/Armbian_23.02.0-trunk_Orangepizero_jammy_current_5.15.85_msd-patched.zip)

![image-20241126135200887](../../img/image-20241126135200887.png)

After booting, run the following commands to install One-KVM (Docker).

```
# Clear auto-load for g_serial kernel module
echo "" > /etc/modules-load.d/modules.conf
reboot

# Deploy One-KVM with Docker
apt update
apt install docker.io
docker run --name kvmd -itd --privileged=true \
    -v /dev:/dev -v /sys/kernel/config:/sys/kernel/config \
    -v /lib/modules:/lib/modules:ro -e OTG=1 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    silentwind0/kvmd
# Enable auto-restart after confirming the container works
docker update --restart=always kvmd
```

Expected output:

![image-20241126144130798](../../img/image-20241126144130798.png)

### Other Notes

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

SSH is enabled by default on Armbian. The initial credentials are root/1234. If you use the Orange Pi official OS, the default is root/orangepi.

!!! warning "System upgrade warning"
    Do not use `apt upgrade` to upgrade the kernel and device tree; this may break the system and OTG functionality.

**Wi-Fi Connection**

To connect to 2.4 GHz Wi-Fi, use the following command to enter the terminal UI.

```
nmtui
```