## USB Relay for ATX Power Control

### Hardware Requirements

- Device model: LCUS_HID USB relay
- Device path: `/dev/hidraw0`

![LCUS_HID USB Relay Front](../../img/image-1727875062722.png)
![LCUS_HID USB Relay Back](../../img/2024100200.png)

### One-KVM

#### Docker Configuration

When starting the Docker container, you need to:

1. Map the relay device
2. Set `ATX=USBRELAY_HID`

**Deployment example**

Full command for CumeBox 2:

```bash
docker run --name kvmd -itd --privileged=true \
    -v /dev:/dev -v /sys/kernel/config:/sys/kernel/config \
    -v /lib/modules:/lib/modules:ro -e OTG=1 -e VIDEONUM=1 -e ATX=USBRELAY_HID \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    silentwind0/kvmd
```

#### Integrated Image Configuration

Default strategy: ARM devices use GPIO by default, while x64 VMs use USB relay by default.

If needed, edit `/etc/kvmd/atx.sh` and scripts under `/etc/kvmd/cutom_atx`.

#### Demo Video

![type:video](../../video/one-kvm_atx0_x264.mp4)