### Hardware Overview

CH9329 is a UART-to-USB HID controller that can emulate a standard keyboard, mouse, or custom HID device. Depending on its configured mode, it is recognized by a computer as the corresponding standard USB device.

![image-20240812203814747](../img/image-20240812203814747.png)

!!! tip "Usage notes"
    Based on user feedback, device disconnections may occur in practice. This has been largely mitigated by the change submitted by snltty: [Fix CH9329 requiring replug after reboot](https://github.com/mofeng-git/One-KVM/pull/164).

    To reduce mouse/keyboard latency, you can:

    - Increase the UART baud rate to 115200

### Configuration

Two ways to configure CH9329 parameters:

1. Set via environment variables when deploying with Docker
2. Edit `/etc/kvmd/override.yaml` directly

Example:
```yaml
kvmd:
    hid:
        type: ch9329
        device: /dev/ttyUSB0
        speed: 9600        # UART speed
        read_timeout: 0.3
```

### Performance Tuning

Use the [CH9329 Config & Test Tool](https://www.wch.cn/downloads/CH9329EVT_ZIP.html) for the following improvements:

1. **Faster response**

    - Raise the baud from 9600 to 115200
    - Update the `speed` parameter in the One-KVM config accordingly

    This improves remote control responsiveness.

2. **Custom device identifiers**

    - Customize USB VID/PID
    - Configure USB string descriptors

![CH9329Test_CfgTool](../img/image-202422131332.png)


