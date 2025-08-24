### Hardware Notes

!!! warning "Warning"
    This One-KVM image has been tested on ZTE B863AV3.2M and CM311-1a-CH. Other S905L3A boxes may not be fully compatible. If incompatible, consider the Docker-based deployment below.

When using `armbian-install`, the following devices/DTBs are supported:

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

1. Write the integrated image to a USB drive or TF card
2. Boot into Android TV
3. In Android TV, obtain ROOT and install an APK to switch boot to external media (USB/TF)
4. Use the APK to boot into Armbian from external media, then run `armbian-install` to install to eMMC using the correct model

Install example:
![install](../img/PixPin_2024-10-16_22-49-59.png)

### Docker Deployment

1. Flash a ROOT-capable Android and install the APK to switch external boot
2. Prepare a bootable Armbian on a USB drive; boot it using Android
3. Use `armbian-install` to write Armbian to eMMC
4. Replace package mirrors; install Docker
5. Run One-KVM in Docker, ensure the OTG port is set to device mode, and make it start at boot. After confirming the container is healthy, enable Docker and container autorun

Commands:

- Run the kvmd container
```bash
sudo docker run --name kvmd -itd --privileged=true \
    -v /lib/modules:/lib/modules:ro -v /dev:/dev \
    -v /sys/kernel/config:/sys/kernel/config -e OTG=1 -e VIDEONUM=1 \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    registry.cn-hangzhou.aliyuncs.com/silentwind/kvmd
```
- Set OTG to device mode
```bash
# Enable OTG device mode
sudo echo device > /sys/class/usb_role/ffe09000.usb-role-switch/role
# Add the above to /etc/rc.local
sudo nano /etc/rc.local
# Make executable
sudo chmod +x /etc/rc.local
```

- Enable autorun
```bash
sudo systemctl enable docker
sudo docker update --restart=always kvmd
```


