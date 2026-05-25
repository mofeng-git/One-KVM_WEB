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

Run the following command from the directory where you want to keep the configuration and data.
`./one-kvm-data` is mounted to `/etc/one-kvm` inside the container for persistence.

```bash
docker run --name one-kvm -itd \
  --privileged=true --restart unless-stopped \
  -v /dev:/dev -v /sys:/sys \
  -v ./one-kvm-data:/etc/one-kvm \
  --net=host \
  silentwind0/one-kvm-full
```

If your network connection is slow, you can use the Alibaba Cloud registry mirror by replacing
`silentwind0/one-kvm-full` in the command with
`registry.cn-hangzhou.aliyuncs.com/silentwind/one-kvm-full`. The same replacement pattern also
applies to `silentwind0/one-kvm`.

If you use the smaller `one-kvm` image, replace the image name in the start and update commands
with `silentwind0/one-kvm` or the corresponding Alibaba Cloud registry image.

## Docker Compose Deployment

You can also manage the container with Docker Compose. Create the following file in the directory
where you want to store `compose.yml`:

```yaml title="compose.yml"
services:
  one-kvm:
    image: silentwind0/one-kvm-full
    container_name: one-kvm
    privileged: true
    restart: unless-stopped
    network_mode: host
    volumes:
      - /dev:/dev
      - /sys:/sys
      - ./one-kvm-data:/etc/one-kvm
    environment:
      TZ: Asia/Shanghai
```

Start the container from the directory containing `compose.yml`:

```bash
docker compose up -d
```

## Update the Container

!!! warning "Check data persistence before updating"
    Before removing the old container, make sure `./one-kvm-data:/etc/one-kvm` or another equivalent
    data directory is mounted. Data that is not persisted may be lost when the container is removed.

If you started the container with `docker run`:

```bash
docker pull silentwind0/one-kvm-full
docker stop one-kvm
docker rm one-kvm
```

Then re-run the `docker run` command above.

If you started the container with Docker Compose, run the following commands from the directory
containing `compose.yml`:

```bash
docker compose pull
docker compose up -d
```

If you use the smaller `one-kvm` image or the Alibaba Cloud registry mirror, keep the image name
consistent in the update commands.

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
| `DATA_DIR` | `/etc/one-kvm` | Data directory |
| `VERBOSE` | `0` | Log verbosity: 1 (`-v`), 2 (`-vv`), 3 (`-vvv`). Higher is more verbose |

**Notes**

- When HTTPS is enabled, no extra certificate mount is required; the system uses a default
  self-signed certificate.
- `--privileged=true` and `-v /dev:/dev` `-v /sys:/sys` are currently required for hardware access
  and cannot be omitted. More granular directory and permission controls may be supported later.
- Keep the `-v ./one-kvm-data:/etc/one-kvm` mount to persist configuration and runtime data.
- `--net=host` ensures ports are exposed directly, so no extra `-p` port mapping is required.

[Next: User Interface :material-arrow-right:](../ui/onboarding.md){ .md-button }
