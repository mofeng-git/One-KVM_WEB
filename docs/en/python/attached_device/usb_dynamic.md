### Dynamic USB Configuration

One-KVM emulates multiple USB devices to provide core functionality:

- Keyboard
- Mouse (absolute)
- Mouse (relative)
- Mass storage
- Ethernet/serial (optional)

In some cases, the target BIOS/UEFI cannot recognize all emulated devices on a single USB port. You can use `kvmd-otgconf` (root required) to manage devices dynamically:

```bash
# Show current config
root@onecloud:~# kvmd-otgconf
+ ecm.usb0  # Ethernet
+ hid.usb0  # Keyboard
+ hid.usb1  # Absolute mouse
+ hid.usb2  # Relative mouse

# Disable/enable examples
root@onecloud:~# kvmd-otgconf --disable-function ecm.usb0  # Disable Ethernet
root@onecloud:~# kvmd-otgconf --enable-function ecm.usb0   # Enable Ethernet
```

### Web UI Control

You can integrate USB device toggles into the web UI. Use the command below to generate a config template:

```yaml
root@onecloud:~# kvmd-otgconf --make-gpio-config
kvmd:
    gpio:
        drivers:
            otgconf:
                type: otgconf
        scheme:
            ecm.usb0:
                driver: otgconf
                mode: output
                pin: ecm.usb0
                pulse: false
            # ... other devices ...
        view:
            table:
                - ['#Ethernet', '#ecm.usb0', ecm.usb0]
                - ['#Keyboard', '#hid.usb0', hid.usb0]
                - ['#Absolute mouse', '#hid.usb1', hid.usb1]
                - ['#Relative mouse', '#hid.usb2', hid.usb2]
```

Add the generated config to `/etc/kvmd/override.yaml` to control device toggles from the web UI.

![USB control UI](../../img/PixPin_2024-06-30_20-34-03.png)