### Startup Script

This is the OneCloud startup script located at `/etc/rc.local`.

```bash
root@onecloud:~# cat /etc/rc.local
#!/bin/bash

# Set OneCloud front-panel LED to green
echo "default-on" >/sys/class/leds/onecloud\:green\:alive/trigger
echo "none" >/sys/class/leds/onecloud\:red\:alive/trigger
echo "none" >/sys/class/leds/onecloud\:blue\:alive/trigger

# Lock CPU frequency to avoid ustreamer frame disorder causing random black screens
# You may raise or overclock based on `cpufreq-info` output if needed
cpufreq-set -d 1200MHz -u 1200MHz

# Start kvmd after locking frequency so all services run at a static CPU frequency
systemctl disable kvmd && systemctl stop kvmd
systemctl start kvmd

# Set OTG port to device mode
echo device > /sys/class/usb_role/c9040000.usb-role-switch/role

# Exit script
exit 0
```


