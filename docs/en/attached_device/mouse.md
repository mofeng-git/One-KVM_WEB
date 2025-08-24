### Mouse Modes

One-KVM supports two mouse modes: absolute and relative.

#### Absolute mode

!!! note "Default"
    Absolute mode is the default. It:

    - Sends exact cursor coordinates (X,Y)
    - Works like a touchscreen or drawing tablet
    - Is the most convenient for users and software
    - May be unsupported by some BIOS/UEFI

#### Relative mode

!!! info "Relative"
    Relative mode:

    - Sends only movement deltas (dX, dY)
    - Works like a regular mouse
    - When you click the video window, the browser captures the pointer
    - Press ESC to release pointer capture

#### Configuration

**Dual-mode support (recommended)**

Add to `/etc/kvmd/override.yaml`:
```yaml
kvmd:
    hid:
        mouse_alt:
            device: /dev/kvmd-hid-mouse-alt
```

After this, you can switch mouse modes from the system menu.

**Relative only**

Add to `/etc/kvmd/override.yaml`:
```yaml
kvmd:
    hid:
        mouse:
            absolute: false
```

If BIOS/UEFI still fails to recognize the mouse, disable horizontal scrolling to improve compatibility:
```yaml
kvmd:
    hid:
        mouse:
            absolute: false
            horizontal_wheel: false
```

!!! warning "Notes"

    - Relative mode generates many events, which may affect network throughput
    - Enable System -> Squash mouse moves to optimize
    - Relative mode is not supported by VNC or mobile browsers at the moment
    - Restart kvmd after changes: `systemctl restart kvmd`

When using relative mode, many mouse events may be generated. Their transfer speed over the network may be slow, or BIOS/UEFI drivers may handle them slowly. To mitigate this, vectorization and event squashing are applied. Enable this via System -> Squash mouse moves. If you encounter mouse acceleration issues, try disabling it. This is a practical compromise.

![PixPin_2024-06-30_19-40-12](../img/PixPin_2024-06-30_19-40-12.png)

#### Windows 98 Compatibility

!!! tip "Windows 98 fix"
    Due to legacy drivers, absolute mode on Windows 98 may only work in the top-left quarter of the screen.
    
    Solution:
    ```yaml
    kvmd:
        hid:
            mouse:
                absolute_win98_fix: true
            mouse_alt:
                device: /dev/kvmd-hid-mouse-alt
    ```
    After configuration, an Abs-Win98 option appears in the system menu.

Additionally, VNC service currently does not support relative mode for the virtual mouse because recommended clients do not support the QEMU pointer motion change extension, and mobile browsers also do not support it.


