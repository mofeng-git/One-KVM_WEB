### USB Serial

USB serial lets the target host access One-KVM via a virtual serial port, or for other serial scenarios.

!!! info "USB endpoint limits"
    Each emulated USB device consumes limited hardware resources (endpoints).

#### Configuration Steps

1. Edit `/etc/kvmd/override.yaml` and add:
    ```yaml
    otg:
        devices:
            serial:
                enabled: true
    ```

2. Add the serial TTY device:
    ```bash
    sudo echo ttyGS0 >> /etc/securetty
    ```

3. Configure the serial service:
    ```bash
    # Create config directory
    sudo mkdir -p /etc/systemd/system/getty@ttyGS0.service.d

    # Edit config
    sudo nano /etc/systemd/system/getty@ttyGS0.service.d/override.conf
    ```

    Add:
    ```ini
    [Service]
    TTYReset=no
    TTYVHangup=no
    TTYVTDisallocate=no
    ```

4. Enable service and reboot:
    ```bash
    sudo systemctl enable getty@ttyGS0.service
    sudo reboot
    ```

#### Usage

After reboot, the target host can access One-KVM via the virtual serial port. Device names may include:

- `/dev/ttyAMA0`
- `/dev/ttyACM0`

Example:
```bash
sudo screen /dev/ttyACM0 115200
```

![Serial Console Example](../../img/PixPin_2024-06-30_22-29-20.png)