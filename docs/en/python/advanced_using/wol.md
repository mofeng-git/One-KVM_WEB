**WOL** (Wake-on-LAN) allows you to power on a supported target machine over the network (some systems disable it by default and require manual enabling). For more details, see the official docs.

### Enable WOL

??? tip "WOL with Docker"

    For Docker deployments, set the network mode to `host`. Otherwise WOL may not work. In CLI usage, replace `-p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623` with `--network host`.<br><br>
    On multi-NIC devices (e.g., OpenWrt routers), you must set the target subnet in the config (e.g., 192.168.100.255). Otherwise WOL packets may be routed to the wrong interface (e.g., 255.255.255.255 broadcast) due to NIC priority.

Choose one of the following WOL methods.

Get the target NIC MAC address (lowercase) and add the following to `/etc/kvmd/override.yaml`, then restart `kvmd` (ensure proper indentation or the service will fail to start).

**Built-in WOL**

If configured here, the WOL control appears under the System menu.

```yaml
    wol:
        mac: 54:ab:3a:02:73:4a
        #ip: 255.255.255.255
        #port: 9
```

**Custom GPIO driver**

If configured here, the WOL control appears under the Custom menu.

```yaml
    gpio:
        drivers:
            wol_server1:
                type: wol
                mac: 2c:56:dc:db:7c:1e
        scheme:
            wol_server1:
                driver: wol_server1
                pin: 0
                mode: output
                switch: false
        view:
            table:
                - ["#Device Name", "wol_server1|Wake-on-LAN"]
```

![img](../../img/1717947165712-57.png)