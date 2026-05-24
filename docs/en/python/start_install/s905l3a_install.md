### Hardware Notes

!!! warning "Warning"
    This One-KVM integrated image has been tested on ZTE B863AV3.2M and CM311-1a-CH. Other S905L3A boxes may be incompatible. If you hit issues, consider the Docker deployment method below.

When installing with `armbian-install`, the following devices are supported with these DTB names:

```
--------------------------------------------------------------------------------------
ID    SOC        MODEL                               DTB
--------------------------------------------------------------------------------------
301   s905x2     X96-Max-4GB,Tx5-Max                 meson-g12a-x96-max.dtb
302   s905x2     X96-Max-2GB,A95X-F2                 meson-g12a-x96-max-rmii.dtb
303   s905x2     MECOOL-KM3-4G                       meson-g12a-sei510.dtb
304   s905l3a    E900V22C-D,CM311-1a-CH,IP112H       meson-g12a-s905l3a-e900v22c.dtb
305   s905l3a    CM311-1a-YST                        meson-g12a-s905l3a-cm311.dtb
306   s905l3a    M401A,UNT403A,B863AV3.2-M           meson-g12a-s905l3a-m401a.dtb
0     Other      Customize                           Enter-custom-dtb-name
--------------------------------------------------------------------------------------
```

### Integrated Image Deployment

1. **Write the image**: Write the One-KVM image to a USB drive or TF card.
2. **Boot Android TV**: Boot into the preinstalled Android TV system.
3. **Install boot APK**: Gain root in Android TV and install an APK that switches boot to external media (USB/TF).
4. **Flash the system**: Use the APK to boot from USB/TF into Armbian, then run `armbian-install` and select the matching model.

Example:
![install](../../img/PixPin_2024-10-16_22-49-59.png)

### Docker Deployment

If you want to deploy with Docker:

1. **Flash Android**: Flash a rootable Android system and install the external-boot APK.
2. **Flash Armbian**: Write a bootable Armbian image to a USB drive and connect it. In Android, switch to boot from the external drive.
3. **Flash eMMC**: Use `armbian-install` to write the Armbian system to eMMC.
4. **Install Docker**: Remove the USB drive, reboot, switch to a local mirror, and install Docker.
5. **Deploy One-KVM**: Run the Docker image, ensure OTG is set to device mode, and add the commands to startup scripts. Enable auto-start for Docker and the container.

Commands:

- Run the kvmd container
```bash
sudo docker run --name kvmd -itd --privileged=true \
    -v /lib/modules:/lib/modules:ro -v /dev:/dev \
    -v /sys/kernel/config:/sys/kernel/config -e OTG=1 -e VIDEONUM=1 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    registry.cn-hangzhou.aliyuncs.com/silentwind/kvmd
```
- Set the OTG port to device mode
```bash
# Enable OTG device mode
sudo echo device > /sys/class/usb_role/ffe09000.usb-role-switch/role
# Add the OTG command to startup script /etc/rc.local
sudo nano /etc/rc.local
# Make the script executable
sudo chmod +x /etc/rc.local
```

- Enable auto-start
```bash
sudo systemctl enable docker
sudo docker update --restart=always kvmd
```

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