# VNC Connection

In addition to the web UI, you can use standard VNC clients to access PiKVM. Compared to a browser, VNC can go full-screen and capture all keyboard shortcuts. In some cases, VNC is faster than the browser, especially on low-performance client machines. VNC performance on PiKVM is not comparable to full VNC servers or OS-level remote access tools.

!!! warning "Warning"
    Do not use VNC without X.509 or TLS encryption on untrusted networks. Otherwise your password is sent in plaintext. This is a limitation of the VNC protocol.

!!! note "Unsupported clients"
    Unsupported clients:<br>RealVNC - does not support many common VNC protocol extensions;<br>Remmina - algorithm mismatch with server settings (being improved);<br>Guacamole - vencrypt not implemented correctly, no JPEG compression;<br>Vinagre - vencrypt not implemented correctly and crashes.

### Windows

On Windows, use UVNC or TigerVNC. Download from the shared drive (path: /OneCloud/PiKVM related software/). Example using UVNC:

![img](../../img/1717946873827-42.png)

### Android

On Android, use AVNC or bVNC Pro. Both support touchscreen and touchpad gestures. For AVNC, you must manually set security to Vncauth to connect to PiKVM.

![img](../../img/1717946871729-39.png)

![img](../../img/1717946869599-36.png)

### iOS

On iOS, use [bVNC](https://apps.apple.com/us/app/bvnc-pro/id1506461202), which is a paid app.

### VNCAuth Authentication

For VNC clients using VNCAuth (password only), if you change the PiKVM program password, the auth file is not updated automatically. Manually edit `/etc/kvmd/vncpasswd` and add mappings in the form "Custom VNC password -> WEB user:WEB password". Example:

![img](../../img/1717946094181-13.png)