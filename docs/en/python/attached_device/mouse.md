### Mouse Modes

One-KVM supports two mouse modes: absolute and relative.

#### Absolute Mode

!!! note "Default mode"
    Absolute mode is the default. It:

    - Sends exact cursor coordinates (X,Y)
    - Works like touchscreens or pen tablets
    - Is the most convenient for users and software
    - May not be supported by some BIOS/UEFI

#### Relative Mode

!!! info "Relative mode"
    Relative mode:

    - Sends movement offsets (dX, dY)
    - Works like a standard mouse
    - Captures the mouse when you click the video window
    - Press ESC to release the mouse

#### Configuration

**Dual-mode support (recommended)**

Add to `/etc/kvmd/override.yaml`:
```yaml
kvmd:
    hid:
        mouse_alt:
            device: /dev/kvmd-hid-mouse-alt
```

After this, you can switch modes in the system menu at any time.

**Relative mode only**

Add to `/etc/kvmd/override.yaml`:
```yaml
kvmd:
    hid:
        mouse:
            absolute: false
```

If BIOS/UEFI still does not detect the mouse, disable horizontal scrolling:
```yaml
kvmd:
    hid:
        mouse:
            absolute: false
            horizontal_wheel: false
```

!!! warning "Notes"

    - Relative mode generates many events and can impact network performance
    - Enable "Squash mouse moves" (System -> Squash mouse moves)
    - Relative mode is not supported in VNC or mobile browsers
    - Restart kvmd after changes: `systemctl restart kvmd`

When using relative mode, virtual mouse events may transmit slowly and feel sluggish in BIOS/UEFI. One-KVM optimizes events using vector summation. Enable this in System -> Squash mouse moves. If mouse acceleration feels wrong, try disabling it. This is the current best compromise.

![PixPin_2024-06-30_19-40-12](../../img/PixPin_2024-06-30_19-40-12.png)

#### Windows 98 Compatibility

!!! tip "Windows 98 fix"
    Due to old drivers, absolute mode in Windows 98 may only move within the top-left quarter of the screen.

    Fix:
    ```yaml
    kvmd:
        hid:
            mouse:
                absolute_win98_fix: true
            mouse_alt:
                device: /dev/kvmd-hid-mouse-alt
    ```
    After applying, the system menu will show an Abs-Win98 option.

Additionally, VNC does not support relative mouse mode because most recommended clients do not support the QEMU pointer motion change extension. Mobile browsers also do not support relative mouse mode.