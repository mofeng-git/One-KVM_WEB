Docker and DEB package deployments are available and relatively easy to set up. To use the integrated image, [sponsor](../other/thanks.md) the author and contact them to obtain it.

## Integrated Image Overview

The latest integrated image is:

- `One-KVM-RUST_by-SilentWind_Onecloud_v0.2.6_260803-da20d8b.burn.img.xz`

Advantages:

- Includes the PiKVM MSD kernel patch, supporting ISO images larger than 2.2 GB and custom virtual media device names.
- Uses a Linux 6.12.x kernel with specially tuned boot parameters for improved stability.

Compared with the older 5.9 kernel, the latest 6.12.x kernel image provides more complete OTG function modules and avoids kernel module crashes when switching OTG functions.

## Integrated Image Deployment

**Flashing Notes**
The USB flashing image with the `burn` suffix is used with Amlogic USB Burning Tool. Version v2.1.3 or lower is recommended.

You only need to short the pads until the flashing tool recognizes the device and reaches 1%; then you can release and wait for completion. The short-pad image is from the OneCloud technical group, contributed by Lanlan.

![img](../../img/1717947165711-51.jpeg)

After flashing the direct image, networking defaults to DHCP and the hostname is `onecloud`. During boot, the front panel LED changes from red to green. After booting, access the OneCloud IP address in your browser.

![image-20240621005943231](../../img/image-20240621005943231.png)

If you need to flash again, you do not need to short the pads again. Hold the reset button while powering on to enter flashing mode.

## Usage Notes

After the first boot, the system has approximately 5.9 GB of available storage.

**Hardware connections**

1. Plug the USB HDMI capture card into the USB port near the Ethernet jack on the OneCloud host, and connect the capture card to the target machine's HDMI output with an HDMI cable.
2. Plug one end of the USB male-to-male cable into the USB port next to the HDMI port on the OneCloud host, and plug the other end into the target machine's USB port.
3. Make sure all connections are secure, then connect power and Ethernet.

!!! warning "Hardware safety warning"

    To avoid potential risks, such as the target device failing to boot or recognize devices, and in very rare cases hardware damage, we strongly recommend taking one of the following safety measures before using a USB male-to-male cable:

    Option 1: Cut or remove the red 5V power wire (VCC) in the USB cable, leaving only data wires (D+/D-) and ground (GND), to prevent back-powering.

    Option 2: Insert a USB hub with an independent power switch in the USB link, and make sure its power switch is off when connecting.

    Some low-power devices may be back-powered through the USB OTG port from the KVM device when main power is not connected. This can put the device into an abnormal state, and it may still fail to boot normally even after main power is connected later.

    **Unless you clearly understand the consequences, use the protections above to keep devices safe.**
![OneCloud hardware connections](../../img/image-20240609231232943.png)

**HDMI terminal**

The HDMI terminal displays the device IP address and software version.

![OneCloud HDMI terminal](../../zh/integration/images/onecloud-hdmi-terminal.png)

### Resolution and display troubleshooting

The OneCloud's HDMI output relies on **HPD (hot-plug detection) and EDID negotiation**, which is **unreliable**
on the S805: when no display is plugged in, the driver considers there to be "no display", does not set up a CRTC,
and consequently there is no `/dev/fb0`, so the HDMI terminal cannot display anything.

!!! tip "Correct approach: let EDID negotiate automatically"
    After plugging in a display, let the driver negotiate the resolution through EDID. In testing, plugging in a
    1080p display produced a correct **1920×1080** output with no `video=` boot parameter needed at all.

!!! warning "Do not force a resolution manually"
    A common "optimization" is to add a boot parameter that forces a mode, for example:
    ```
    video=HDMI-A-1:1920x1080@60e
    ```
    On the OneCloud this **backfires**: the kernel recomputes the pixel clock using the CVT formula and gets
    **172.78 MHz**, whereas the CEA standard clock for 1080p60 is **148.5 MHz**. The mismatch makes the kernel
    report:
    ```
    [drm] User-defined mode not supported
    ```
    and it **falls back to 1024×768**, which is worse than auto-negotiation.

**Troubleshooting quick reference**:

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| No `/dev/fb0`, HDMI terminal shows nothing | No display plugged in, HPD not triggered | Plug in the display before booting; or check the HPD pin |
| Stuck at 1024×768 | A `video=` override was set manually | Remove the `video=HDMI-A-1:...` parameter and use EDID auto-negotiation |
| Garbled / wrong colors on the terminal | bpp or stride does not match reality | Confirm the framebuffer is 24bpp (BGR; see the "extension" section below) |

!!! note "Scope"
    The above applies only to resolution negotiation on the **OneCloud HDMI output side**. It is unrelated to the
    resolution of the video stream captured by One-KVM from the target machine via the capture card.

**SSH remote login**

SSH is enabled by default on Armbian. The initial username and password are `root` / `1234`. Change the default password as soon as possible.

!!! warning "System upgrade warning"
    Do not use `apt upgrade` to upgrade the kernel and device tree. This may cause system problems and make OTG unavailable.

??? info "If you really must upgrade the kernel / system"
    Upgrading the kernel and device tree via `apt upgrade` is **not recommended** (see the warning above). If you
    have a concrete reason to upgrade, the following notes come from a tested, working path (**at your own risk**):

    - Tested upgrade path: Armbian `23.11.1` → `26.8.3` (userland), kernel `5.10.149` → `6.12.28`, **succeeded**.
    - **Back up the DTB** (device tree binary) before upgrading. OTG-related configuration (such as `dr_mode`) lives
      in the DTB; if OTG stops working after an upgrade, it is usually because the new DTB changed the OTG node.
    - If USB OTG functions (keyboard/mouse/MSD) misbehave after the upgrade:
        - Restore the backed-up old DTB to verify whether the DTB is the cause;
        - or decompile the new DTB and check that the OTG node's `dr_mode` is still `peripheral`/`otg`.
    - After upgrading, re-run the key items from the [Performance Test Report](#performance-test-report) to confirm
      that H.264/HID latency has not regressed noticeably.

    !!! danger "Rollback preparation"
        Before upgrading, keep a flashable old image and the short-pad flashing method so you can fully roll back
        if the system fails to boot.

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

### ATX Power Management Configuration

This section provides an ATX configuration for OneCloud. Both software settings and hardware wiring must be completed before use.

#### Software

Enter the following GPIO pin data on the settings page and save.

![ATX GPIO software settings](../../img/onecloud_atx_gpio_settings.png)

#### Hardware

**Power actions**:

Connect the OneCloud power-on pin to PWR SW+ on the motherboard 9-pin header, and connect the GND pin to PWR SW-.

Connect the OneCloud reset pin to RESET+ on the motherboard 9-pin header, and connect the GND pin to RESET-.

**Power status**:

An optocoupler isolation module is required. An optocoupler module is preferred over a relay module.

Connect POWER LED+ and POWER LED- from the motherboard 9-pin header to the positive and negative input terminals of the optocoupler module respectively (polarity matters). Connect the GND and OUT output terminals of the optocoupler module to the power status LED pad and GND pad on the OneCloud board respectively (polarity does not matter).

Connect HDD LED+ and HDD LED- from the motherboard 9-pin header to the positive and negative input terminals of the optocoupler module respectively (polarity matters). Connect the GND and OUT output terminals of the optocoupler module to the HDD status LED pad and GND pad on the OneCloud board respectively (polarity does not matter).

![OneCloud GPIO pinout](../../img/onecloud_gpio_pinout.png)

![Optocoupler isolation module](../../img/optocoupler_module.png)

#### Result

![ATX power management web UI](../../img/onecloud_atx_webui.png)

## Performance Test Report

Test image: `One-KVM-RUST_by-SilentWind_Onecloud_v0.2.5_260722-da20d8b.img.xz`

- Run ID: `20260705-201140-9f9676`
- Test device: OneCloud (`onecloud`)
- Video device: `/dev/video0` (1080p@50fps MJPEG, 1080p@10fps YUYV)
- HID device: OTG
- HTTP latency: p50=2.8ms, p95=3.1ms, max=3.2ms

### Video Performance

| Video input parameters    | Test frame rate | Latency statistics (median p50 / 95th percentile p95 / maximum max) |
| ------------------------- | --------------- | -------------------------------------------------------------------- |
| 1080p@50fps MJPEG → MJPEG | 49.9fps         | p50=71.6ms, p95=80.9ms, max=83.0ms                                   |
| 1080p@50fps MJPEG → H.264 | 14.8fps         | p50=422.9ms, p95=439.3ms, max=442.3ms                                |
| 1080p@50fps MJPEG → H.265 | 4.6fps          | p50=1791.8ms, p95=2341.0ms, max=2442.7ms                             |
| 1080p@10fps YUYV → MJPEG  | 10fps           | p50=383.7ms, p95=415.7ms, max=423.1ms                                |
| 1080p@10fps YUYV → H.264  | 9.9fps          | p50=670.4ms, p95=710.8ms, max=712.0ms                                |
| 1080p@10fps YUYV → H.265  | 1.7fps          | Failed                                                               |

### HID Performance

| Input method | Latency statistics (median p50 / 95th percentile p95 / maximum max) |
| ------------ | -------------------------------------------------------------------- |
| OTG          | p50=5.7ms, p95=5.9ms, max=5.9ms                                      |

### MSD Performance

| Operation | Data       |
| --------- | ---------- |
| Write     | 11.38 MiB/s |
| Read      | 14.64 MiB/s |

## Extension: HDMI status panel

!!! note "Note"
    The following is an **operating-system-level extension** for the OneCloud that uses the HDMI output to show
    custom status information. It is **not a built-in One-KVM feature** and does not affect One-KVM's KVM video
    stream (the video stream comes from the capture card and is unrelated to this). It is intended for tinkerers
    who want to make use of the OneCloud's front panel / HDMI port.

### Idea

The OneCloud's HDMI output corresponds to a framebuffer (typically `/dev/fb0`). If you `write` an image to
`/dev/fb0` in the correct pixel format, the HDMI side displays that image. You can use this to render One-KVM
runtime status (IP, bitrate, uptime, etc.) as a "status panel".

### Key point: the pixel layout is BGR

The OneCloud framebuffer uses **BGR** memory layout at 24bpp (not the usual RGB). Be careful when using Pillow:

```python
from PIL import Image

# img: an image matching the framebuffer resolution (e.g. 1920x1080)
# Read it as BGR directly to avoid per-pixel conversion
raw = img.convert("RGB")
# split / merge converts in the C layer, orders of magnitude faster than a Python per-pixel loop
b, g, r = raw.split()
fb_img = Image.merge("RGB", (b, g, r))   # adjust channel order to match what you actually need
data = fb_img.tobytes()

with open("/dev/fb0", "wb") as fb:
    fb.write(data)
```

### Performance pitfall: do not loop per pixel

!!! warning "Performance trap"
    A common mistake is a double Python `for` loop converting RGB→BGR pixel by pixel:
    ```python
    # ❌ Wrong: a 1920x1080 per-pixel conversion eats about 38% of one core
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            px[x, y] = (b, g, r)
    ```
    At 1920×1080 this consumes about **38% of one core**, a clear burden for the OneCloud.

    **Correct approach**: use Pillow's `split()` / `merge()` / `tobytes()` to process in bulk **in the C layer**;
    measured usage drops to **0~10%**:

    ```python
    # ✅ Correct: bulk conversion in the C layer
    r, g, b = img.split()
    bgr = Image.merge("RGB", (b, g, r))
    bgr.tobytes()
    ```

### Tip: negative BMP height

If you use a `.bmp` file as an intermediate format, you can use a **negative height** in the BMP header so the
pixels are stored **top-to-bottom** in framebuffer row order, skipping the vertical flip:

```python
# Set the BMP header height field to a negative value so the image is stored top-down
# When saving with PIL: flip the y axis first, or construct a negative-height header directly
```

!!! tip "Relationship to One-KVM"
    This "status panel" displays your custom image and does **not** affect One-KVM's KVM video stream captured from
    the target machine via the capture card. The two are completely independent data paths.
