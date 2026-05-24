### Hardware Notes

Loongson 2K0300 (JiuJiu Pi) uses the Loongson 2K0300 processor with the LoongArch architecture at 1 GHz. It supports low power usage, touch input, Liji DDR4, a gigabit Ethernet port, and multiple interfaces, and is powered via standard Type-C.

Hardware: Loongson JiuJiu Pi, USB HDMI capture card, CH9329 + CH340 combo cable

### Integrated Image Deployment

The One-KVM image for Loongson JiuJiu Pi is built on Loongnix (old world).

**Image notes**

!!! warning "Reminder"
    Virtual storage (MSD) and virtual USB devices are only available in OTG mode. **These virtual USB features are not supported when using CH9329 HID.**

- The system is based on Loongnix with One-KVM preinstalled. The image is provided as a rootfs tarball. After boot, access https://IP:443.

- Due to memory limits, a 1 GB swap file (`/swap.img`) is included. The base system is about 4.8 GB. For TF card models, use an 8 GB (or larger) high-speed TF card.

- OTG requires hardware modifications per official docs, so this guide uses the CH9329 + CH340 combo cable. The kernel includes OTG modules and USB gadget works; advanced users can test OTG if needed.

- For TF card models, no file changes are needed. For Wi-Fi card models, the archive includes `vmlinuz-tf` and `vmlinuz-wifi` under `/boot/`. Rename the one you need to `vmlinuz` and edit `boot.cfg` accordingly.

Command example:

```bash
sudo fdisk -l
# Assume the TF card path is /dev/sdc1
sudo mkfs.ext4 /dev/sdc1
mkdir /mnt/sdc1
sudo mount /dev/sdc1 /mnt/sdc1
# Use --strip-components=2 to remove the top two folders
sudo tar -zvxf One-KVM_by-SilentWind_2k0300_241025.tar.gz --strip-components=2 -C /mnt/sdc1 && sync
sudo nano boot.cfg
sudo cd /mnt/sdc1/boot
# Rename to vmlinuz as needed and edit boot.cfg
cp vmlinuz-tf vmlinuz
sudo nano boot.cfg
sudo umount /dev/sdc1
```

### Usage Notes

![2k0300 0](../../img/1729864881297-tuya.jpg)

![2k0300 1](../../img/PixPin_2024-10-25_21-58-47.png)