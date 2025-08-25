## Hardware and Software Prerequisites

### Hardware Requirements

| Component | Requirement | Description |
|-----------|-------------|-------------|
| Host | Linux host (or VM) | Docker-compatible environment |
| Capture Card | USB capture card | For video signal capture |
| Control Device | USB CH340+CH9329 | Only when host OTG is unavailable |

### System Compatibility

| Supported Distributions | Unsupported Distributions |
|-------------------------|---------------------------|
| Ubuntu/Debian | CentOS |
| Armbian | |
| Arch Linux | |

### Docker Installation

Choose one of the following installation methods:

=== "Package Manager"
    ```bash
    apt install docker.io -y
    ```

=== "Official Script"
    ```bash
    curl -fsSL https://get.docker.com | bash
    ```

### HID Control Comparison

| Feature | OTG HID | CH9329 HID |
|---------|---------|------------|
| **Architecture** | ARM CPU | x86 Architecture |
| **Interface** | USB OTG port | UART-to-USB HID chip |
| **Mode** | USB Host/Device configurable | Standard USB input device |
| **Features** | Virtual HID, MSD, USB Ethernet | Keyboard, mouse input |
| **Use Case** | ARM devices (e.g., Raspberry Pi) | x86 devices (e.g., PC) |
    
## Docker Deployment

One-KVM supports using either OTG or CH9329 as virtual HID, compatible with amd64/arm64/armv7 Linux systems.

### Quick Deployment

One-KVM provides an installation wizard script that automatically checks the environment and completes deployment:

```bash
curl -sSL https://one-kvm.mofeng.run/quick_start.sh -o quick_start.sh && bash quick_start.sh
```

![quick_start](../img/image-202411161848.png)

### Manual Deployment

For custom configuration, refer to the device mapping and environment variables sections below.

#### Network Mode Selection

`--net=host` mode is recommended for better WoL functionality and WebRTC communication support.

| Network Mode | Advantages | Use Case |
|--------------|------------|----------|
| **Host Mode** | Better performance, supports WoL and WebRTC | Recommended |
| **Bridge Mode** | Port isolation, more secure | When port isolation is needed |

#### Host Network Mode Port Description

| Port | Protocol | Service | Description |
|------|----------|---------|-------------|
| 8080 | HTTP | Web Service | HTTP access port |
| 4430 | HTTPS | Web Service | HTTPS access port (recommended) |
| 5900 | TCP | VNC Service | VNC remote desktop |
| 623 | TCP | IPMI Service | IPMI management interface |
| 20000-40000 | TCP/UDP | WebRTC | Low-latency video transmission |
| 9 | UDP | Wake-on-LAN | Network wake functionality |

#### Deployment Commands

=== "Host Network Mode"

    **OTG HID Mode**
    ```bash
    sudo docker run --name kvmd -itd --privileged=true \
        -v /lib/modules:/lib/modules:ro -v /dev:/dev \
        -v /sys/kernel/config:/sys/kernel/config -e OTG=1 \
        --net=host \
        silentwind0/kvmd
    ```

    **CH9329 HID Mode**
    ```bash
    sudo docker run --name kvmd -itd \
        --device /dev/video0:/dev/video0 \
        --device /dev/ttyUSB0:/dev/ttyUSB0 \
        --net=host \
        silentwind0/kvmd
    ```

=== "Bridge Network Mode"

    **OTG HID Mode**
    ```bash
    sudo docker run --name kvmd -itd --privileged=true \
        -v /lib/modules:/lib/modules:ro -v /dev:/dev \
        -v /sys/kernel/config:/sys/kernel/config -e OTG=1 \
        -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
        silentwind0/kvmd
    ```

    **CH9329 HID Mode**
    ```bash
    sudo docker run --name kvmd -itd \
        --device /dev/video0:/dev/video0 \
        --device /dev/ttyUSB0:/dev/ttyUSB0 \
        -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
        silentwind0/kvmd
    ```

### Registry Acceleration

If network conditions are poor, use Aliyun registry acceleration:

Replace `silentwind0/kvmd` with `registry.cn-hangzhou.aliyuncs.com/silentwind/kvmd`

### Access and Configuration

After deployment, access `https://IP:4430`. First visit may encounter SSL certificate security warning, click "Advanced" and "Continue" to proceed.

| Item | Value | Description |
|------|-------|-------------|
| **Default Username** | admin | Universal account for Web/VNC/IPMI |
| **Default Password** | admin | Universal password for Web/VNC/IPMI |
| **Troubleshooting** | `sudo docker logs kvmd` | View container runtime logs |

### Auto-start Configuration

```bash
# Enable Docker service on boot
systemctl enable docker

# Set One-KVM container to auto-restart
docker update --restart=always kvmd
```

### Container Updates

```bash
# Stop and remove old container
docker stop kvmd
docker rm kvmd

# Update image
docker pull silentwind0/kvmd

# Redeploy (use previous deployment command)
```


## Advanced Configuration

### Device Mapping

| Device Type | Docker Parameter | Environment Variable | Description |
|-------------|------------------|---------------------|-------------|
| **Capture Card** | `--device /dev/video0:/dev/video0` | `-e VIDEONUM=0` | Map video capture device |
| **Audio Input** | `--device /dev/snd:/dev/snd` | `-e AUDIONUM=0` | Map sound card device |
| **Graphics Card** | `--device /dev/dri:/dev/dri` | `-e HWENCODER=vaapi` | Enable hardware encoding |

### Volume Mapping

| Purpose | Docker Parameter | Description |
|---------|------------------|-------------|
| **Configuration Persistence** | `-v ./kvmd_config:/etc/kvmd` | Mount configuration directory |
| **Image Files** | `-v ./msd:/var/lib/kvmd/msd` | Store system image files |

### Environment Variables Configuration

#### Basic Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `USERNAME` | admin | Set user account (Web/VNC/IPMI) |
| `PASSWORD` | admin | Set user password (Web/VNC/IPMI) |
| `VIDEONUM` | 0 | Capture card device number (/dev/video[N]) |
| `AUDIONUM` | 0 | Audio device number (hw:[N]) |

!!! note "Password Configuration Methods"
    
    **Two configuration options**:
    
    - **USERNAME + PASSWORD**: Create custom user and remove default admin user
      ```bash
      -e USERNAME=myuser -e PASSWORD=mypassword
      ```
    
    - **PASSWORD only**: Keep admin username, only update password
      ```bash
      -e PASSWORD=newpassword
      ```

#### Port Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `HTTPPORT` | 8080 | HTTP service port |
| `HTTPSPORT` | 4430 | HTTPS service port |

#### Video Format Configuration

| Environment Variable | Default | Options | Description |
|---------------------|---------|---------|-------------|
| `VIDEOFORMAT` | mjpeg | yuyv, nv12, nv16, nv24 | Video capture format |

#### Audio Device Configuration

View available audio devices: `arecord -L` or `arecord -l`

| Configuration Method | Example | Environment Variable |
|---------------------|---------|---------------------|
| Card Index | hw:0 | `AUDIONUM=0` |
| Card Name | hw:CARD=MS2109 | `AUDIONUM=CARD=MS2109` |
| Device File | hw:/dev/snd/controlC0 | `AUDIONUM=/dev/snd/controlC0` |

#### HID Control Configuration

| Environment Variable | Option | Description |
|---------------------|--------|-------------|
| `ATX` | `USBRELAY_HID` | Use USB HID relay for power control |
| `OTG` | `1` | Enable OTG mode (disabled by default) |
| `NOMSD` | `1` | Disable MSD function (enabled by default on ARM) |

#### CH9329 Serial Configuration

| Environment Variable | Default | Options |
|---------------------|---------|----------|
| `CH9329SPEED` | 9600 | 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200 |
| `CH9329TIMEOUT` | 0.3 | HID response timeout (seconds) |

#### Hardware Encoding Configuration

Experimental support for hardware-accelerated H.264 encoding for improved performance and lower CPU usage.

| Hardware Type | Environment Variable | Device Mapping | Tested Platform |
|---------------|---------------------|----------------|----------------|
| **AMD VAAPI** | `HWENCODER=vaapi` | `--device /dev/dri:/dev/dri` | AMD Graphics |
| **RK MPP** | `HWENCODER=rkmpp` | `--device /dev/:/dev/` | RK3588S |

#### Feature Toggles

| Environment Variable | Function | Default State |
|---------------------|----------|---------------|
| `NOSSL=1` | Disable HTTPS, use HTTP (port 8080) | HTTPS enabled |
| `NOAUTH=1` | Disable authentication | Authentication enabled |
| `NOWEBTERMWRITE=1` | Web terminal read-only mode | Read-write enabled |
| `NOWEBTERM=1` | Disable web terminal | Terminal enabled |
| `NOVNC=1` | Disable VNC service | VNC enabled |
| `NOIPMI=1` | Disable IPMI service | IPMI enabled |


