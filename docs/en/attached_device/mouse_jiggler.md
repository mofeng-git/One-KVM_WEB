### Mouse Jiggler

!!! note "Overview"
    The Mouse Jiggler simulates small mouse movements to:
    
    - Prevent the system from entering sleep/standby
    - Prevent the screensaver from activating
    - Run in the background without manual intervention
    - Avoid interfering with normal operations

#### Enable

1. Edit `/etc/kvmd/override.yaml`:
```yaml
kvmd:
    hid:
        jiggler:
            enabled: true    # Show this feature in the menu
            active: true     # Start automatically on boot (optional)
```

2. Restart kvmd:
```bash
sudo systemctl restart kvmd
```

3. Toggle it from the System menu (top-right) on the web UI:

![Mouse Jiggler Toggle](../img/PixPin_2024-06-30_19-39-44.png)

#### How it works

!!! info "Mechanism"
    1. Monitors user input (keyboard and mouse)
    2. After 60 seconds of inactivity:
       - Absolute mode: move to `(-100, -100)` → wait → `(100, 100)` → wait
       - Relative mode: move `(-10, -10)` → wait → `(10, 10)` → wait
    3. Repeat until user activity is detected

!!! tip "Notes"
    - Supports both absolute and relative mouse modes
    - Coordinates auto-adjust to screen resolution
    - Continues running in the background even if the web UI is closed
    - Pauses automatically on user activity
    - Starts only after 60 seconds of inactivity

#### Use cases

- Monitor unattended software installations
- Prevent automatic lock/sleep
- Keep the system active
- Long unattended operations


