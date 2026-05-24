## Hardware and Software Requirements

### Hardware Requirements

| Component | Requirement | Notes |
|------|------|------|
| Host | Linux host (or VM) | Docker supported |
| Capture card | USB capture card | For video capture |
| Control device | USB CH340 + CH9329 | Alternative when host OTG is unavailable |

### System Compatibility

| Supported distros | Unsupported distros |
|--------------|----------------|
| Ubuntu/Debian | CentOS |
| Armbian | |
| Arch Linux | |

### Docker Installation

Choose one of the following methods to install Docker:

=== "Package manager"
    ```bash
    apt install docker.io -y
    ```

=== "Official script"
    ```bash
    curl -fsSL https://get.docker.com | bash
    ```

### HID Control Mode Comparison

OTG supports virtual HID, MSD, USB NIC, and more. CH9329 HID only supports virtual HID.

| Feature | OTG HID | CH9329 HID |
|------|---------|------------|
| **Supported architectures** | ARM CPU | All architectures |
| **Interface type** | USB OTG | USB HID via serial chip |
| **Mode** | USB Host/Device configurable | Standard USB input device |
| **Capabilities** | Virtual HID, MSD, USB NIC | Keyboard and mouse input |
| **Use case** | ARM devices (e.g., Raspberry Pi) | x86 devices (e.g., PC) |

## Docker Deployment

One-KVM supports OTG or CH9329 as virtual HID and is compatible with Linux on amd64, arm64, and armv7.

### Quick Deploy

One-KVM provides a setup script that checks the environment and completes deployment quickly:

```bash
curl -sSL https://one-kvm.mofeng.run/quick_start.sh -o quick_start.sh && bash quick_start.sh
```

![quick_start](../../img/image-202411161848.png)

### Manual Deployment

For custom configurations, refer to the device mapping and environment variable details below.

#### Network Mode Selection

We recommend `--net=host` for better WoL and WebRTC support.

| Network mode | Advantages | Use cases |
|----------|------|----------|
| **Host mode** | Better performance, supports WoL and WebRTC | Recommended |
| **Bridge mode** | Port isolation, more secure | When isolation is required |

#### Host Mode Ports

| Port | Protocol | Service | Description |
|------|------|------|------|
| 8080 | HTTP | Web | HTTP access |
| 4430 | HTTPS | Web | HTTPS access (recommended) |
| 5900 | TCP | VNC | VNC remote desktop |
| 623 | TCP | IPMI | IPMI management |
| 20000-40000 | TCP/UDP | WebRTC | Low-latency video |
| 9 | UDP | Wake-on-LAN | WoL |

#### Deployment Commands

=== "Host mode"

    **OTG HID mode**
    ```bash
    sudo docker run --name kvmd -itd --privileged=true \
        -v /lib/modules:/lib/modules:ro -v /dev:/dev \
        -v /sys/kernel/config:/sys/kernel/config -e OTG=1 \
        --net=host \
        silentwind0/kvmd
    ```

    **CH9329 HID mode**
    ```bash
    sudo docker run --name kvmd -itd \
        --device /dev/video0:/dev/video0 \
        --device /dev/ttyUSB0:/dev/ttyUSB0 \
        --net=host \
        silentwind0/kvmd
    ```

=== "Bridge mode"

    **OTG HID mode**
    ```bash
    sudo docker run --name kvmd -itd --privileged=true \
        -v /lib/modules:/lib/modules:ro -v /dev:/dev \
        -v /sys/kernel/config:/sys/kernel/config -e OTG=1 \
        -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
        silentwind0/kvmd
    ```

    **CH9329 HID mode**
    ```bash
    sudo docker run --name kvmd -itd \
        --device /dev/video0:/dev/video0 \
        --device /dev/ttyUSB0:/dev/ttyUSB0 \
        -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
        silentwind0/kvmd
    ```

### Image Acceleration

If your network is slow, use the Aliyun registry to speed up pulls:

Replace `silentwind0/kvmd` with `registry.cn-hangzhou.aliyuncs.com/silentwind/kvmd`

### Access and Configuration

After deployment, visit `https://IP:4430`. On first access, you may see an SSL warning; click "Advanced" and "Proceed" to continue.

| Item | Value | Notes |
|------|-----|------|
| **Default username** | admin | Shared Web/VNC/IPMI user |
| **Default password** | admin | Shared Web/VNC/IPMI password |
| **Troubleshooting** | `sudo docker logs kvmd` | View container logs |

### Enable Autostart

```bash
# Enable Docker on boot
systemctl enable docker

# Auto-restart One-KVM container
docker update --restart=always kvmd
```

### Update the Container

```bash
# Stop and remove the old container
docker stop kvmd
docker rm kvmd

# Pull the latest image
docker pull silentwind0/kvmd

# Re-deploy (use the same deployment command)
```

## Advanced Configuration

### Device Mapping

| Device type | Docker flag | Environment variable | Description |
|----------|-------------|--------------|------|
| **Capture card** | `--device /dev/video0:/dev/video0` | `-e VIDEONUM=0` | Map capture device |
| **Audio input** | `--device /dev/snd:/dev/snd` | `-e AUDIONUM=0` | Map audio device |
| **GPU** | `--device /dev/dri:/dev/dri` | `-e HWENCODER=vaapi` | Required for VAAPI encoding |
| **GPU** | `--device /dev:/dev` | `-e HWENCODER=rkmpp` | Required for RKMPP encoding |

### Directory Mapping

| Purpose | Docker flag | Description |
|----------|-------------|------|
| **Config persistence** | `-v ./kvmd_config:/etc/kvmd` | Mount config directory |
| **Image files** | `-v ./msd:/var/lib/kvmd/msd` | Store system images |

### Environment Variables

#### Basic Configuration

| Env var | Default | Description |
|----------|--------|------|
| `USERNAME` | admin | Web/VNC/IPMI username |
| `PASSWORD` | admin | Web/VNC/IPMI password |
| `VIDEONUM` | 0 | Capture device index (/dev/video[N]) |
| `AUDIONUM` | 0 | Audio device index (hw:[N]) |

!!! note "Password configuration"

    **Two options:**

    - **USERNAME + PASSWORD**: create a custom user and delete the default admin
      ```bash
      -e USERNAME=myuser -e PASSWORD=mypassword
      ```

    - **PASSWORD only**: keep the admin username and update the password
      ```bash
      -e PASSWORD=newpassword
      ```

#### Port Configuration

| Env var | Default | Description |
|----------|--------|------|
| `HTTPPORT` | 8080 | HTTP port |
| `HTTPSPORT` | 4430 | HTTPS port |

#### Video Format

| Env var | Default | Options | Description |
|----------|--------|--------|------|
| `VIDEOFORMAT` | mjpeg | yuyv, nv12, nv16, nv24 | Capture format |

#### Audio Device

List available devices: `arecord -L` or `arecord -l`

| Mode | Example | Env var value |
|----------|------|------------|
| Card index | hw:0 | `AUDIONUM=0` |
| Card name | hw:CARD=MS2109 | `AUDIONUM=CARD=MS2109` |
| Device path | hw:/dev/snd/controlC0 | `AUDIONUM=/dev/snd/controlC0` |

#### HID Control

| Env var | Options | Description |
|----------|--------|------|
| `ATX` | `USBRELAY_HID` | Use a USB HID relay for power control |
| `OTG` | `1` | Enable OTG mode (disabled by default) |
| `NOMSD` | `1` | Disable MSD (enabled by default on ARM) |

#### CH9329 Serial Settings

| Env var | Default | Options |
|----------|--------|--------|
| `CH9329SPEED` | 9600 | 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200 |
| `CH9329TIMEOUT` | 0.3 | HID response timeout (seconds) |
| `CH9329NUM` | 0 | USB serial device index |

#### Hardware Encoding

Experimental support for hardware-accelerated H.264 encoding can significantly improve performance and reduce CPU usage.

| Hardware | Env var | Device mapping | Test platform |
|----------|----------|----------|----------|
| **AMD VAAPI** | `HWENCODER=vaapi` | `--device /dev/dri:/dev/dri` | AMD iGPU |
| **RK MPP** | `HWENCODER=rkmpp` | `-v /dev/:/dev/` | RK3588S |

#### Feature Toggles

| Env var | Effect | Default |
|----------|------|----------|
| `NOSSL=1` | Disable HTTPS, use HTTP (8080) | HTTPS enabled |
| `NOAUTH=1` | Disable authentication | Auth enabled |
| `NOWEBTERMWRITE=1` | Web terminal read-only | Read/write |
| `NOWEBTERM=1` | Disable web terminal | Terminal enabled |
| `NOVNC=1` | Disable VNC | VNC enabled |
| `NOIPMI=1` | Disable IPMI | IPMI enabled |
| `NOGOSTC=1` | Disable GOSTC | GOSTC enabled |