# DEB Install

This guide explains how to install One-KVM with a `.deb` package on Debian/Ubuntu.

## Prerequisites

- System requirements: Debian 11+ / Ubuntu 22+
- Hardware: enable USB OTG or connect a CH340 + CH9329 HID cable (for HID emulation), connect a USB HDMI capture card, or use another video capture device you already have.

!!! tip "Debian 13 (x86-64) extra dependency"
    On **Debian 13, x86-64**, if One-KVM fails with:

    `error while loading shared libraries: libmfx.so.1: cannot open shared object file: No such file or directory`

    the `libmfx` shared library is missing. It is not available in the Debian 13 default repositories; install the legacy `libmfx1` package manually, for example:

    1. Download: [libmfx1_22.5.4-1_amd64.deb](http://ftp.cn.debian.org/debian/pool/main/i/intel-mediasdk/libmfx1_22.5.4-1_amd64.deb)
    2. From the directory containing the file, run:

    ```bash
    apt install ./libmfx1_22.5.4-1_amd64.deb
    ```

## Install

Download the one-kvm `.deb` package for your architecture and install it.

```bash
apt update
apt install ./one-kvm_0.x.x_arch.deb
```

## OTG Notes

If you need OTG, make sure OTG is enabled and the OTG port is active.

If `ls /sys/class/udc` returns empty, the device has no USB OTG port or the port is not configured for OTG mode. In the latter case, you may need to adjust the device tree (dtb).

If `ls /sys/kernel/config` does not list `usb_gadget`, the `libcomposite` kernel module may not be loaded. Load it manually or add an auto-load rule under `/etc/modprobe.d/`. To load manually, run `modprobe libcomposite` **before** starting the IP-KVM application.

Finally, set the OTG port to `device` mode. If the device tree dtb sets the USB OTG port `dr_mode` to `peripheral`, the port will be `device` after boot. More commonly, `dr_mode` is `otg` and you must enable it manually. The command differs by CPU platform (Allwinner, Amlogic, Rockchip, etc.); check the platform docs. Once verified, place it in `/etc/rc.local` to auto-enable on boot.

Example: Amlogic OTG enable command

```bash
# Check current USB OTG role
cat /sys/devices/platform/soc/*/usb_role/*/role
# Set OTG port to device mode
echo "device" > /sys/devices/platform/soc/*/usb_role/*/role
```

## Access the Web UI

Open a browser and visit `http://<device-ip>:8080`

!!! tip "First-time Access"
    On the first visit, the system will guide you through initial setup, including creating the admin account.
