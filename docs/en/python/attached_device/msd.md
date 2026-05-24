**MSD** (Mass Storage Drive) lets One-KVM emulate virtual CD/DVD or flash drives. This enables BIOS/UEFI recovery or OS reinstallation with virtual media.

!!! info "MSD notes"

    - CD-ROM images are limited to 2.2 GB (Linux kernel limit). Specially adapted systems have no such limit (currently OneCloud and CumeBox 2).
    - Flash images have no size limit

!!! warning "Warning"
    For OneCloud, do not unmount images when the USB male-to-male cable (OTG) is disconnected or the target machine is powered off. Otherwise the kernel may spam errors, the log service can reach 100% CPU, and the system becomes unstable. MSD remains unavailable until OTG is restored.

-----

### Using MSD

#### Basic configuration

After build 20241004, MSD is enabled by default (uses `/var/lib/kvmd/msd`) and switches from a mounted partition to a directory.

#### Upload images manually

Upload image files to `/var/lib/kvmd/msd`.

#### Change MSD path

After build 201204, you can set any directory in `/etc/kvmd/override.yaml`. If you lack permission, run `chown kvmd -R /var/lib/kvmd/msd/` to make it writable.

```yaml
kvmd:
    msd:
        msd_path: /var/lib/kvmd/msd
```

#### Writable flash drive

When emulating a flash drive, you can allow the target host to write files into the image. After stopping the drive, download and open the image on the local host. This is useful for retrieving files from the target.

#### Create a Ventoy bootable image

For versions earlier than 20241004 (not including 20241004), run `kvmd-helper-otgmsd-remount rw` before manipulating the directory to remount internal storage as read/write.

1. Create an empty image file in `/var/lib/kvmd/msd`. Example: `flash.img` with size 4096 MB.

    ```bash
    dd if=/dev/zero of=/var/lib/kvmd/msd/flash.img bs=1M count=4096 status=progress
    ```

2. In the web menu, select Drive -> Image -> flash.img, switch from cd-rom to flash, then connect MSD to the host.

3. On the target machine, open Ventoy and install to the virtual disk.
    ![ventoy](../../img/image-202411061233.png)

4. Copy system images into the Ventoy partition.
    ![ventoy iso](../../img/image-202411061235.png)

The flash image is ready. Mount it when needed.

![ventoy 0](../../img/image-a7b96b94541ed44744db758ae774a58c.png)
![ventoy 1](../../img/image-38e54e47eb0de7894fdb6dc9c7fb9a51.png)

![msd](../../img/image-202411082232.png)

#### File exchange

![MSD file exchange demo](../../img/image-20251202163200000.jpg)

<iframe height="400" width="600" src="//player.bilibili.com/player.html?isOutside=true&aid=115650634843571&bvid=BV14CSbBnE7z&cid=34455555027&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

Related options:
```yaml
# Folder used inside MSD directory
normalfiles_path: NormalFiles
# Image size in MB
normalfiles_size: 256
```

-----

### Appendix: MSD partition mounting (legacy)

!!! note "MSD partition mount (before 20241004)"

    If you still need partition mounting, comment out `remount_cmd: /bin/true` under `msd` in `/etc/kvmd/override.yaml` (set it to `#remount_cmd: /bin/true`) so the MSD partition has correct permissions.

    Choose one of the following methods. For beginners, the third method is recommended, as it uses a virtual disk file and avoids partitioning physical disks.

    ??? note "Use OneCloud eMMC space"
        The author provides a system image with this software in the installation section (Netdisk path: /One-KVM related/gparted_on_armbain_usbdisk.zip). Flash it to a USB drive, plug it into the USB port near the Ethernet jack, boot, SSH (root/1234), and run `gparted` to open the partition tool.

        If you do not see the GParted GUI, check whether your SSH client supports X11 forwarding.

        In GParted, right-click /dev/mmcblp1p2 and choose Resize/Move, enter the new partition size in Free space following (e.g., 4096), format the free space as ext4, then click the "√" button in the toolbar to apply changes.

        ![img](../../img/1717947165712-55.png)

        ![img](../../img/1717947165712-56.png)

    ??? note "Use SD card"
        Avoid low-quality cards (some work in Windows but are detected yet unreadable on Linux).

        ```bash
        # Find TF card path
        fdisk -l
        # Format as ext4 (replace sdx with your device)
        mkfs.ext4 /dev/sdx
        ```

    ??? note "Use a virtual disk file"
        Create a new img file for MSD. This method has been tested.

        ```bash
        # Example: 512 is in MB (1M blocks). Adjust as needed
        dd if=/dev/zero of=/root/diska.img bs=1M count=512
        mkfs.ext4 /root/diska.img
        ```

    **Mount the partition**

    Confirm the partition path (e.g., /dev/mmcblk1, /dev/mmcblk0p3, /root/diska.img). The example below uses /dev/mmcblk0.

    ```bash
    # List all partitions
    df -h

    # Add the following mount entry (replace for your device)
    nano /etc/fstab

    /dev/mmcblk0p3 /var/lib/kvmd/msd  ext4  nofail,nodev,nosuid,noexec,rw,errors=remount-ro,data=journal,X-kvmd.otgmsd-root=/var/lib/kvmd/msd,X-kvmd.otgmsd-user=kvmd  0 0

    # If mount fails, fix errors and retry
    mount /dev/mmcblk0p3

    # Enable MSD: set msd option to otg in /etc/kvmd/override.yaml
    nano /etc/kvmd/override.yaml
    systemctl restart kvmd-otg kvmd
    ```

    **Manual upload**

    One-KVM stores images in a special partition mounted at `/var/lib/kvmd/msd`. If it is read-only, run:

    ```bash
    # Make MSD writable
    sudo kvmd-helper-otgmsd-remount rw

    # Upload images to /var/lib/kvmd/msd

    # Make MSD read-only
    sudo kvmd-helper-otgmsd-remount ro
    ```