OneCloud Pro uses an S912 octa-core CPU with 2 GB of RAM and 8 GB of internal storage. It provides one Gigabit Ethernet port, two USB 2.0 ports, a TF card slot, and HDMI output.

Docker and DEB package deployments are available and relatively easy to set up. To use the integrated image, [sponsor](../other/thanks.md) the author and contact them to obtain it.

## Integrated Image Deployment

1. **Prepare the SD card**: Write the One-KVM integrated image to an SD card, then insert the card into the OneCloud Pro card slot.
2. **Boot from the SD card**: When flashing from the factory system for the first time, hold the Reset button and connect power. Release Reset when the OneCloud logo disappears. For subsequent flashes, simply connect power to boot the system from the SD card automatically.
3. **Install the system to eMMC**: After the system boots successfully from the SD card, open the One-KVM web terminal or sign in over SSH and run `armbian-install`. Select the model that matches the board revision: `201` for V1.1 or `213` for V1.2.

The following screenshot shows the `armbian-install` process:

![OneCloud Pro armbian-install process](../../zh/integration/images/onecloud-pro-armbian-install.jpg)

## Usage Notes

After the first boot, the system has approximately 4.6 GB of available storage.

**Hardware connections**

1. Plug the USB HDMI capture card into the standard USB port next to the Ethernet port, then connect the capture card to the target machine's HDMI output with an HDMI cable.
2. Plug one end of the USB male-to-male cable into the USB OTG port next to the QR code and the other end into a USB port on the target machine.
3. Make sure all connections are secure, then connect Ethernet and power.

!!! warning "Hardware safety warning"

    To avoid potential risks, such as the target device failing to boot or recognize devices, and in very rare cases hardware damage, we strongly recommend taking one of the following safety measures before using a USB male-to-male cable:

    Option 1: Cut or remove the red 5V power wire (VCC) in the USB cable, leaving only the data wires (D+/D−) and ground (GND), to prevent back-powering.

    Option 2: Insert a USB hub with an independent power switch in the USB link and make sure its power switch is off when connecting.

    Some low-power devices may be back-powered through the USB OTG port from the KVM device when main power is not connected. This can put the device into an abnormal state, and it may still fail to boot normally even after main power is connected later.

    **Unless you clearly understand the consequences, use the protections above to keep devices safe.**

**HDMI terminal**

The HDMI terminal displays the device IP address and software version.

![OneCloud Pro HDMI terminal](../../zh/integration/images/onecloud-pro-hdmi-terminal.png)

**SSH remote login**

SSH is enabled by default on Armbian. The initial username and password are `root` / `1234`. Change the default password as soon as possible.

!!! warning "System upgrade warning"
    Do not use `apt upgrade` to upgrade the kernel and device tree. This may cause system problems and make OTG unavailable.

**Changing the MAC address**

The current image persists the network interface MAC address in `/etc/one-kvm-image/eth0.mac`. Sign in over SSH and run:

```bash
mkdir -p /etc/one-kvm-image
echo '02:11:22:33:44:55' | tee /etc/one-kvm-image/eth0.mac
reboot
```

To use a different MAC address, replace `02:11:22:33:44:55` in the example.

**USB function combinations**

| Combination | Result |
| --- | --- |
| Keyboard (including status LEDs) + relative mouse + absolute mouse + multimedia keys | Passed |
| Keyboard (including status LEDs) + relative mouse + absolute mouse + multimedia keys + MSD | Passed |
| Keyboard (including status LEDs) + relative mouse + absolute mouse + multimedia keys + MSD + NCM/ECM | Unsupported |
| Keyboard (including status LEDs) + relative mouse + absolute mouse + multimedia keys + RNDIS | Unsupported |
| Keyboard (including status LEDs) + relative mouse + absolute mouse + multimedia keys + MSD + RNDIS | Unsupported |
| Keyboard (including status LEDs) + relative mouse + absolute mouse + RNDIS | Passed |
| Keyboard (including status LEDs) + relative mouse + absolute mouse + MSD + RNDIS | Unsupported |
| Keyboard (including status LEDs) + relative mouse + absolute mouse + MSD + NCM/ECM | Passed |

## Performance Test Report

- Run ID: `20260722-222014-7f19dd`
- Test device: OneCloud Pro (`onecloud-pro`)
- Video device: `/dev/video1` (1080p@50fps MJPEG, 1080p@10fps YUYV)
- HID device: OTG
- HTTP latency: p50=3.1ms, p95=3.8ms, max=4.0ms

### Video Performance

| Video input parameters        | Test frame rate | Latency statistics (median p50 / 95th percentile p95 / maximum max) |
| ----------------------------- | --------------- | ------------------------------------------------------------------- |
| 1080p@50fps MJPEG → MJPEG | 50fps           | p50=76.0ms, p95=94.2ms, max=97.1ms                                  |
| 1080p@50fps MJPEG → H.264 | 25.2fps         | p50=298.7ms, p95=319.8ms, max=323.2ms                               |
| 1080p@50fps MJPEG → H.265 | 3.9fps          | p50=779.9ms, p95=858.5ms, max=867.1ms                               |
| 1080p@10fps YUYV → MJPEG  | 9.5fps          | p50=326.5ms, p95=368.4ms, max=378.4ms                               |
| 1080p@10fps YUYV → H.264  | 9.5fps          | p50=635.2ms, p95=702.1ms, max=718.0ms                               |
| 1080p@10fps YUYV → H.265  | 2.7fps          | p50=1391.4ms, p95=2091.3ms, max=2259.4ms                            |

### HID Performance

| Input method | Latency statistics (median p50 / 95th percentile p95 / maximum max) |
| ------------ | ------------------------------------------------------------------- |
| OTG          | p50=2.6ms, p95=3.0ms, max=3.0ms                                     |

### MSD Performance

| Operation | Data        |
| --------- | ----------- |
| Write     | 10.03 MiB/s |
| Read      | 14.59 MiB/s |
