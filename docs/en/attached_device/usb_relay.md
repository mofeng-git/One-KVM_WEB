### USB Relay for ATX Power Management

#### Requirements

- Device: LCUS_HID USB Relay
- Device path: `/dev/hidraw0`

![LCUS_HID USB Relay Front](../img/image-1727875062722.png)
![LCUS_HID USB Relay Back](../img/2024100200.png)

#### Configuration

When starting the Docker container, you need to:

1. Map the relay device
2. Set the environment variable `ATX=USBRELAY_HID`

#### Example

Below is a sample deployment for Cumebox 2:

```bash
docker run --name kvmd -itd --privileged=true \
    -v /dev:/dev -v /sys/kernel/config:/sys/kernel/config \
    -v /lib/modules:/lib/modules:ro -e OTG=1 -e VIDEONUM=1 -e ATX=USBRELAY_HID \
    -p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623 \
    silentwind0/kvmd
```

#### Demo Video

![type:video](../video/one-kvm_atx0_x264.mp4)


