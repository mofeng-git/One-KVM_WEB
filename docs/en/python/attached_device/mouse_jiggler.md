### Mouse Jiggler

!!! note "Feature overview"
    Mouse Jiggler simulates mouse movement to:

    - Prevent sleep or standby
    - Stop screen savers from activating
    - Run automatically in the background
    - Avoid interfering with normal use

#### Enable

1. Edit `/etc/kvmd/override.yaml`:
```yaml
kvmd:
    hid:
        jiggler:
            enabled: true    # Show in menu
            active: true     # Auto-start on boot (optional)
```

2. Restart kvmd:
```bash
sudo systemctl restart kvmd
```

3. Enable it from the top-right system menu:

![Mouse Jiggler Toggle](../../img/PixPin_2024-06-30_19-39-44.png)

#### How It Works

!!! info "Behavior"
    1. The system monitors user input (keyboard and mouse)
    2. After 60 seconds of inactivity:
       - Absolute mode: move to `(-100, -100)` -> wait -> `(100, 100)` -> wait
       - Relative mode: move `(-10, -10)` -> wait -> `(10, 10)` -> wait
    3. Repeat until user input is detected

!!! tip "Highlights"
    - Supports both absolute and relative modes
    - Coordinates adjust to screen resolution
    - Runs even if the web UI is closed
    - Pauses automatically when the user is active
    - Only starts after 60 seconds of inactivity

#### Use Cases

- Monitoring software installs remotely
- Preventing auto lock or sleep
- Keeping systems active
- Long unattended operations