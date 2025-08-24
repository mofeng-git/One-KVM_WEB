**WOL** (Wake On LAN) enables powering on a machine over the network when supported by the target (some machines may have it disabled by default and require manual enabling). Refer to official guides for more details.

### Enable WOL

??? tip "Docker deployment notes for WOL"
    When deploying with Docker, use `--network host`; otherwise, WOL may not work. If you are currently using `-p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623`, replace them with `--network host`.<br><br>
    On multi-NIC devices (e.g., OpenWrt routers) when deploying Docker, specify the broadcast address for the LAN where the target host resides (e.g., 192.168.100.255). Otherwise, WOL packets broadcast to 255.255.255.255 may be routed to the wrong interface due to NIC priority differences.

There are two configuration methods; choose one.

Get the target MAC address (Linux lowercase format), then edit `/etc/kvmd/override.yaml` to add the following. After editing, restart services with `systemctl restart kvmd` (be careful with indentation, otherwise services may fail to start).

**Built-in WOL configuration**

If configured here, the WOL action will appear under Tools in the system menu on the web UI.

```yaml
    wol:
        mac: 54:ab:3a:02:73:4a
        #ip: 255.255.255.255
        #port: 9
```

**Custom GPIO driver method**

If configured here, the WOL action will appear under the custom menu.

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

![img](../img/1717947165712-57.png)


