### Dynamic USB Configuration

One-KVM emulates multiple USB devices to provide core features:

- Keyboard
- Mouse (absolute)
- Mouse (relative)
- Mass storage
- Ethernet/Serial (optional)

In some cases, the target's BIOS/UEFI may fail to recognize all emulated functions on a single USB port simultaneously. Use the `kvmd-otgconf` command (root required) to manage functions dynamically:

```bash
# Show current config
root@onecloud:~# kvmd-otgconf
+ ecm.usb0  # Ethernet
+ hid.usb0  # Keyboard
+ hid.usb1  # Absolute mouse
+ hid.usb2  # Relative mouse

# Disable/enable functions
root@onecloud:~# kvmd-otgconf --disable-function ecm.usb0  # Disable Ethernet
root@onecloud:~# kvmd-otgconf --enable-function ecm.usb0   # Enable Ethernet
```

### Web control

You can integrate USB function toggles into the web UI by generating a template with:

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
            # ... other functions ...
        view:
            table:
                - ['#Ethernet', '#ecm.usb0', ecm.usb0]
                - ['#Keyboard', '#hid.usb0', hid.usb0]
                - ['#Absolute mouse', '#hid.usb1', hid.usb1]
                - ['#Relative mouse', '#hid.usb2', hid.usb2]
```

Add the generated config to `/etc/kvmd/override.yaml` to control each USB function from the web UI.

![USB control UI](../img/PixPin_2024-06-30_20-34-03.png)


