### USB Serial

The USB serial feature allows the target host to access One-KVM via a virtual serial port, or to be used in other serial-communication scenarios.

!!! info "USB endpoint limits"
    Each emulated USB function consumes limited hardware resources (endpoints).

#### Configuration

1. Edit `/etc/kvmd/override.yaml` to enable the serial function:
    ```yaml
    otg:
        devices:
            serial:
                enabled: true
    ```

2. Add the serial TTY to securetty:
    ```bash
    sudo echo ttyGS0 >> /etc/securetty
    ```

3. Configure the serial getty service:
    ```bash
    # Create the override directory
    sudo mkdir -p /etc/systemd/system/getty@ttyGS0.service.d

    # Edit the override file
    sudo nano /etc/systemd/system/getty@ttyGS0.service.d/override.conf
    ```

    Add:
    ```ini
    [Service]
    TTYReset=no
    TTYVHangup=no
    TTYVTDisallocate=no
    ```

4. Enable the service and reboot:
    ```bash
    sudo systemctl enable getty@ttyGS0.service
    sudo reboot
    ```

#### Usage

After reboot, the target host can access One-KVM via the virtual serial port. Possible device names include:

- `/dev/ttyAMA0`
- `/dev/ttyACM0`

Example:
```bash
sudo screen /dev/ttyACM0 115200
```

![Serial Console Example](../img/PixPin_2024-06-30_22-29-20.png)


