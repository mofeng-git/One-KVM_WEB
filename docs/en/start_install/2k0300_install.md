### Hardware
The Loongson 2K0300-based board (JiujiuPai) uses the LoongArch architecture, 1GHz clock, supports low power, touch input, DDR4, provides Gigabit Ethernet and multiple interfaces, and is powered via USB Type-C.

Hardware: JiujiuPai, USB HDMI capture card, CH9329+CH340 combo cable

### Integrated Image

The One-KVM integrated image for JiujiuPai is built on Loongnix (legacy world).

**Notes**

!!! warning "Reminder"
    Virtual USB devices such as MSD and virtual USB Ethernet are only available when using the OTG device mode. These features are NOT supported when using CH9329 HID.

- The system is Loongnix-based with One-KVM preinstalled; just access https://IP:443 after boot.
- Due to memory limits, a 1G swap is included at `/swap.img`. The root filesystem archive is ~4.8G. For TF versions, use an 8G+ high-speed card.
- OTG requires a hardware mod as per the official doc, so CH9329+CH340 is used here. The kernel includes OTG modules and gadgets; advanced users may experiment with OTG if desired.
- For TF vs Wi-Fi variants, `/boot/` contains `vmlinuz-tf` and `vmlinuz-wifi`. Rename as needed to `vmlinuz` and edit `boot.cfg` accordingly.

Commands:

```bash
sudo fdisk -l
# Assume TF card is /dev/sdc1
sudo mkfs.ext4 /dev/sdc1
mkdir /mnt/sdc1
sudo mount /dev/sdc1 /mnt/sdc1
# Note --strip-components=2 removes the top-level directories
sudo tar -zvxf One-KVM_by-SilentWind_2k0300_241025.tar.gz --strip-components=2 -C /mnt/sdc1 && sync
sudo nano boot.cfg
sudo cd /mnt/sdc1/boot
# Rename to vmlinuz as needed, edit boot.cfg
cp vmlinuz-tf vmlinuz
sudo nano boot.cfg
sudo umount /dev/sdc1
```

### Usage

![2k0300 0](../img/1729864881297-tuya.jpg)

![2k0300 1](../img/PixPin_2024-10-25_21-58-47.png)


