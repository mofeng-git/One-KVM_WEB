## Highlights

1. Android-based (Khadas vim2 Android 9) with hardware encoding support
2. Customized kernel, removes the 2.2G ISO size limit
3. KVM software runs in a chroot container; most Debian packages work; Docker is not supported

## Installation

**Short pads**

Short pads for the silver Octopus Flanet version:

![Short pads (silver)](../img/084749kig48ixdiybxguvy.jpg)

Short pads for the black Octopus Flanet version (discovered by the author):

![Short pads (black)](../img/image-20250516202445796.png)

**Flashing**

Insert the dual-headed USB cable into the USB port closer to HDMI. Open USB_Burning_Tool and load `One-KVM_by-SilentWind_Octopus-Flanet_250315.burn.img`, then short the flashing pads to start.

![USB_Burning_Tool](../img/image-20250516203306768.png)

## Usage

**KVM Remote Control**

The USB port near HDMI supports OTG. Connect it to the target host. Connect the other USB port to the USB capture card.

The web UI listens on 4430, H.264 hardware encoding is supported.

![web](../img/image-20250516205059560.png)

The web terminal is supported. After installing htop in the terminal, you can see that H.264 uses Android MediaCodec via the FFmpeg API instead of CPU encoding.

![terminal](../img/image-20250516204743961.png)

**Remote debugging**

SSH is not installed; SSH connections are not supported.

Control the chroot system via the web terminal. Android supports ADB over network, for example:

```powershell
# Connect ADB (example IP 192.168.10.104)
./adb.exe connect 192.168.10.104
# Android shell; "su" is available
./adb.exe shell
# Android screen casting
./scrcpy.exe
```

![adb](../img/image-20250516204309890.png)

## Notes

As a technical validation, this image demonstrates a practical approach: for platforms lacking Linux hardware video encoding, you can switch to Android to gain hardware encoding and use it in production.

This image was last built on 2025-03-15. Due to low interest, planned SSH and Docker support were dropped; they are unsupported by default and likely won't be added later.


