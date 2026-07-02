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
| `DATA_DIR` | `/etc/one-kvm` | Data directory passed to `one-kvm -d`; higher priority than `ONE_KVM_DATA_DIR` |
| `ONE_KVM_DATA_DIR` | `/etc/one-kvm` | Backward-compatible data directory variable, used only when `DATA_DIR` is unset |
| `BIND_ADDRESS` | unset | Web service bind address, passed to `one-kvm -a` when set |
| `HTTP_PORT` | config default | HTTP port, passed to `one-kvm -p` when set |
| `HTTPS_PORT` | config default | HTTPS port, passed to `one-kvm --https-port` when set |
| `ENABLE_HTTPS` | `false` | Enable HTTPS service (`true`/`false`) |
| `VERBOSE` | `0` | Log verbosity: 1 (`-v`), 2 (`-vv`), 3 (`-vvv`). Higher is more verbose |
| `RUST_LOG` | unset | Rust log filter. When set, it overrides the default level generated from `VERBOSE` |
| `ONE_KVM_FFMPEG_LOG` | `error` | FFmpeg log level, such as `error`, `warn`, `info`, `debug`, or `trace` |
| `ONE_KVM_WEBRTC_MDNS_MODE` | `query_only` | WebRTC mDNS mode: `disabled`, `query_only`, or `query_and_gather` |
| `ONE_KVM_UPDATE_BASE_URL` | `https://update.one-kvm.cn` | Online upgrade service base URL |
| `OPENAI_API_KEY` | unset | OpenAI API key for Computer Use Agent; higher priority than the web UI configuration |
| `ONE_KVM_OPENAI_BASE_URL` | web UI default | OpenAI endpoint for Computer Use Agent; higher priority than the web UI configuration |
| `ONE_KVM_V4L2M2M_ALLOW` | unset | Amlogic platforms skip V4L2 M2M probing by default; non-empty and not `0` allows probing |
| `LIBVA_DRIVER_NAME` | auto-detect | Manually select the VA-API driver, such as `iHD` or `i965` |
| `LIBVA_DEVICE` | auto-scan | DRM render node used for VA-API probing, such as `/dev/dri/renderD128` |

**Notes**

- When HTTPS is enabled, no extra certificate mount is required; the system uses a default
  self-signed certificate.
- `--privileged=true` and `-v /dev:/dev` `-v /sys:/sys` are currently required for hardware access
  and cannot be omitted. More granular directory and permission controls may be supported later.
- Keep the `-v ./one-kvm-data:/etc/one-kvm` mount to persist configuration and runtime data.
- `--net=host` ensures ports are exposed directly, so no extra `-p` port mapping is required. If
  `HTTP_PORT` / `HTTPS_PORT` are unset, the ports come from the values saved in the web UI
  configuration.

[Next: User Interface :material-arrow-right:](../ui/onboarding.md){ .md-button }
