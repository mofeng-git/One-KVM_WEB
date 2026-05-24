## Features

1. Android system based on Khadas Vim2 Android 9 with hardware encoding
2. Custom kernel with ISO size limit removed (2.2 GB)
3. KVM runs inside a chroot container, supports most deb packages, does not support Docker

## Installation

**Shorting pads**

Shorting pads for the silver Octopus Planet:

![Short pads (silver)](../../img/084749kig48ixdiybxguvy.jpg)

Shorting pads for the black Octopus Planet (not documented online; tested by the author):

![Short pads (black)](../../img/image-20250516202445796.png)

**Flashing**

Insert the USB male-to-male cable into the USB port closer to HDMI, then open USB_Burning_Tool, load `One-KVM_by-SilentWind_Octopus-Flanet_250315.burn.img`, short the pads, and start flashing.

![USB_Burning_Tool](../../img/image-20250516203306768.png)

## Usage

**KVM remote control**

The USB port near HDMI supports OTG. Connect it to the target machine, and connect the other USB port to the USB capture card.

The web UI default port is 4430 and supports H.264 hardware encoding.

![web](../../img/image-20250516205059560.png)

Web terminal is supported. After installing htop, you can see H.264 encoding uses Android MediaCodec (via ffmpeg API) instead of CPU encoding.

![terminal](../../img/image-20250516204743961.png)

**Remote debugging**

SSH is not installed by default and is not supported.

The chroot system is controlled via the web terminal.

Android supports ADB remote debugging. Example:

```powershell
# Connect to the ADB device (example IP 192.168.10.104)
.\adb.exe connect 192.168.10.104
# Enter Android shell; use su to switch to root
.\adb.exe shell
# Android screen mirroring
.\scrcpy.exe
```

![adb](../../img/image-20250516204309890.png)

## Other

As a technical validation image, this build proves an approach: on platforms without Linux hardware video encoding, switching to Android can enable hardware encoding in practice.

This image was last built on 2025-03-15. Due to low interest, planned SSH support and Docker support are discontinued. Both features are disabled by default and are unlikely to be updated.