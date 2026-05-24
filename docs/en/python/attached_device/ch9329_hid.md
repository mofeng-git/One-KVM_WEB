### Hardware Overview

CH9329 is a serial-to-USB HID chip that can emulate keyboard, mouse, or custom HID devices. Depending on configuration, the host recognizes it as a standard USB device.

![image-20240812203814747](../../img/image-20240812203814747.png)

!!! tip "Usage notes"
    Based on user feedback, device disconnects could occur. This has been improved by [a fix in the snltty submission](https://github.com/mofeng-git/One-KVM/pull/164), which resolves the issue where CH9329 required re-plugging after reboot.

    To reduce mouse/keyboard latency:

    - Increase the serial baud rate to 115200

### Configuration

Configure CH9329 in one of two ways:

1. Set environment variables in Docker deployments
2. Edit `/etc/kvmd/override.yaml`

Example:
```yaml
kvmd:
    hid:
        type: ch9329
        device: /dev/ttyUSB0
        speed: 9600        # Serial baud rate
        read_timeout: 0.3
```

### Performance Tuning

Use the [CH9329 configuration & test tool](https://www.wch.cn/downloads/CH9329EVT_ZIP.html) to optimize:

1. **Improve response speed**

    - Increase baud rate from 9600 to 115200
    - Update the One-KVM `speed` setting accordingly

    This improves the remote control experience.

2. **Customize device identity**

    - Change USB VID/PID
    - Configure USB string descriptors

![CH9329Test_CfgTool](../../img/image-202422131332.png)