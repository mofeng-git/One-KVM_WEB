# Docker Install

This guide explains how to deploy One-KVM with Docker.

## Prerequisites

- System requirements: Linux (Debian/Ubuntu recommended) with Docker installed.
- Hardware: enable USB OTG or connect a CH340 + CH9329 HID cable (for HID emulation), and
  connect a USB video capture card.

## Start the Container

There are two container variants: `one-kvm` and `one-kvm-full`. The former includes only the
One-KVM main program and `ttyd`, while the latter also bundles third-party software for optional
extended features such as `gostc` and `easytier-core`. Choose the image that matches your needs.

```bash
docker run --name one-kvm -itd \
  --privileged=true --restart unless-stopped \
  -v /dev:/dev  -v /sys/:/sys \
  --net=host \
  silentwind0/one-kvm-full
```

If your network connection is slow, you can use the Alibaba Cloud registry mirror by replacing
`silentwind0/one-kvm-full` in the command with
`registry.cn-hangzhou.aliyuncs.com/silentwind/one-kvm-full`. The same replacement pattern also
applies to `silentwind0/one-kvm`.

## Access the Web UI

Open a browser and visit `http://<device-ip>:8080`

!!! tip "First-time Access"
    On the first visit, the system will guide you through the initial setup, including creating
    the administrator account.

### OTG Notes

If you plan to use OTG, make sure OTG support is enabled on the system and that the OTG port is
active.

If `ls /sys/class/udc` returns nothing, your device either does not have a USB OTG port or the USB
port has not been switched into OTG mode. If it is the latter, you can try modifying the device
tree (`dtb`).

If `ls /sys/kernel/config` does not show `usb_gadget`, the `libcomposite` kernel module may not be
loaded. You can load it manually or add an auto-load rule under `/etc/modprobe.d/`. The manual
command is `modprobe libcomposite`, and it must be run before the IP-KVM program starts.

The final step is switching the OTG port into `device` mode. If the USB OTG port uses
`dr_mode = "peripheral"` in the device tree, it should already be in `device` mode after boot.
More commonly, `dr_mode` is set to `otg`, which means you need to enable it manually. The command
varies by CPU platform (Allwinner, Amlogic, Rockchip, and so on), so you may need to check vendor
documentation or look up platform-specific references online. Once you confirm the command works,
you can place it in `/etc/rc.local` so the OTG port is enabled automatically at boot.

Example: OTG enable command on Amlogic

```bash
# Check the current USB OTG state
cat /sys/devices/platform/soc/*/usb_role/*/role
# Manually enable the OTG port
echo "device" > /sys/devices/platform/soc/*/usb_role/*/role
```

## Configuration Options

### Environment Variables

| Variable | Default | Description |
|--------|--------|------|
| `TZ` | `UTC` | Time zone |
| `HTTP_PORT` | `8080` | HTTP port |
| `HTTPS_PORT` | `8443` | HTTPS port |
| `ENABLE_HTTPS` | `false` | Enable HTTPS service (`true`/`false`) |
| `DATA_DIR` | `/data` | Data directory |
| `VERBOSE` | `0` | Log verbosity: 1 (`-v`), 2 (`-vv`), 3 (`-vvv`). Higher is more verbose |

**Notes**

- When HTTPS is enabled, no extra certificate mount is required; the system uses a default
  self-signed certificate.
- `--privileged=true` and `-v /dev:/dev` `-v /sys:/sys` are currently required for hardware access
  and cannot be omitted. More granular directory and permission controls may be supported later.
- `--net=host` ensures ports are exposed directly, so no extra `-p` port mapping is required.

[Next: User Interface :material-arrow-right:](../ui/onboarding.md){ .md-button }
