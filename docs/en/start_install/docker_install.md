### Hardware and Software Prerequisites

**Required hardware and peripherals**

- Linux host (or VM)
- USB capture card
- USB CH340+CH9329 (only when host OTG is unavailable)

**Host OS requirements**

Recommended: Ubuntu/Debian/Armbian/Arch Linux. CentOS is not supported.


**Install Docker**

- Using distro packages:
``` bash
apt install docker.io -y
```
- Or install the latest version:
```bash
curl -fsSL https://get.docker.com | bash
```

**OTG vs. CH9329**

**OTG HID**: Most ARM CPUs support a USB OTG port that can operate in USB Host or USB Device mode. On Linux, it can act as a virtual HID device (keyboard, mouse, etc.). OTG also supports MSD (mass storage) and virtual USB Ethernet.

**CH9329 HID**: A UART-to-USB HID bridge that appears as a standard USB input device. Suitable for x86 hosts which typically lack USB OTG.
    
### Docker Deployment

Docker supports using either OTG or CH9329 as the virtual HID, and can be installed on Linux for amd64/arm64/armv7.

**Scripted installation**

Use the guided installer to check the environment and quickly install:

```bash
curl -sSL https://one-kvm.mofeng.run/quick_start.sh -o quick_start.sh && bash quick_start.sh
```

![quick_start](../img/image-202411161848.png)

**Manual Docker deployment**

If you need more control, see the "Device/port/volume mapping" and "Environment variables" sections below to add options. `--net=host` is recommended for better WOL and WebRTC support.

docker host mode ports:

- 8080: HTTP web
- 4430: HTTPS web
- 5900: VNC
- 623: IPMI
- 20000-40000: WebRTC UDP range for low-latency video
- 9/UDP: Wake-on-LAN (WOL)

=== "OTG HID"
    ``` bash
    sudo docker run --name kvmd -itd --privileged=true \
        -v /lib/modules:/lib/modules:ro -v /dev:/dev \
        -v /sys/kernel/config:/sys/kernel/config -e OTG=1 \
        --net=host \
        silentwind0/kvmd
    ```

=== "CH9329 HID"
    ``` bash
    sudo docker run --name kvmd -itd \
        --device /dev/video0:/dev/video0 \
        --device /dev/ttyUSB0:/dev/ttyUSB0 \
        --net=host \
        silentwind0/kvmd
    ```
 
docker bridge mode:

=== "OTG HID"
    ``` bash
    sudo docker run --name kvmd -itd --privileged=true \
        -v /lib/modules:/lib/modules:ro -v /dev:/dev \
        -v /sys/kernel/config:/sys/kernel/config -e OTG=1 \
         -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
        silentwind0/kvmd
    ```

=== "CH9329 HID"
    ``` bash
    sudo docker run --name kvmd -itd \
        --device /dev/video0:/dev/video0 \
        --device /dev/ttyUSB0:/dev/ttyUSB0 \
        -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
        silentwind0/kvmd
    ```

If downloads are slow, you may use Aliyun registry acceleration by replacing `silentwind0/kvmd` with `registry.cn-hangzhou.aliyuncs.com/silentwind/kvmd`.

After deployment, visit https://IP:4430. The first visit will warn about a self-signed certificate; proceed anyway.

Default credentials are `admin/admin`. If you cannot access the UI, run `sudo docker logs kvmd` to troubleshoot, open an issue, or ask in the QQ group.

Enable auto-start after confirming the container runs correctly:

```bash
# Enable Docker on boot
systemctl enable docker

# Restart One-KVM automatically
docker update --restart=always kvmd
```

To update, stop and remove the existing container, then redeploy with the latest image:

```bash
# Stop
docker stop kvmd

# Remove
docker rm kvmd

# Pull the latest image
docker pull silentwind0/kvmd
```


### Device, Port, and Volume Mapping

**Capture device**: `--device /dev/video0:/dev/video0` maps the video device. For OTG with all devices mapped, you may need `-e VIDEONUM=0`.

**Audio input**: `--device /dev/snd:/dev/snd` maps ALSA devices. Use with `-e AUDIONUM=0`.

**GPU device**: `--device /dev/dri:/dev/dri` maps GPU devices. Use with `-e HWENCODER=vaapi`.

**Ports**: `-p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623` maps container ports. Alternatively, use `--net=host` to expose all ports.

**Volumes**:

- `-v ./kvmd_config:/etc/kvmd` persist configuration files for convenient manual edits.
- `-v ./msd:/var/lib/kvmd/msd` mount the MSD directory for storing ISOs/images.

### Environment Variables

**Credentials**: `-e USERNAME=admin -e PASSWORD=admin` sets the user/password (Web/VNC/IPMI). Both must be provided; default is admin/admin.

**Capture device**: `-e VIDEONUM=1` selects the USB capture index. Final device path is `/dev/video` + value. Default 0 -> `/dev/video0`; value 1 -> `/dev/video1`.
 
**Audio input**: `-e AUDIONUM=0` selects audio device. Final ALSA string is `hw:` + value. Default 0 -> `hw:0`; e.g. `CARD=MS2109` -> `hw:CARD=MS2109`.

??? tip "Audio device identifiers"

    On Linux, list devices using `arecord -L` or `arecord -l`.

    1. By card index, e.g., hw:0
    2. By card name, e.g., hw:CARD=MS2109
    3. By device file, e.g., hw:/dev/snd/controlC0

    Use any one of these forms to enable H.264 audio on the web UI.

**ATX control**: `-e ATX=USBRELAY_HID` to use a USB HID relay for power control.

**OTG features**:

- `-e OTG=1` enable OTG mode (disabled by default)
- `-e NOMSD=1` disable MSD (default: enabled on ARM hosts)

**CH9329 parameters**:

- `-e CH9329SPEED=9600` UART speed for CH9239+CH340. Default 9600 bps. Options: `1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200`.
- `-e CH9329TIMEOUT=0.3` CH9239 HID response timeout in seconds; a log entry is printed when exceeded. Default 0.3.

**Hardware encoding**

`-e HWENCODER=vaapi` — The ustreamer fork now experimentally supports hardware-accelerated H.264 via FFmpeg, improving performance and lowering CPU usage. Currently tested with AMD VAAPI devices. Requires mapping `--device /dev/dri:/dev/dri`.


**Other toggles**:

- `-e NOSSL=1` disable HTTPS and enable HTTP on port 8080
- `-e NOAUTH=1` disable authentication (enabled by default)
- `-e NOWEBTERMWRITE=1` make web terminal read-only (write enabled by default)
- `-e NOWEBTERM=1` disable web terminal (enabled by default)
- `-e NOVNC=1` disable VNC (enabled by default)
- `-e NOIPMI=1` disable IPMI (enabled by default)


