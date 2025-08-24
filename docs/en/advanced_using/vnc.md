# VNC Connection

In addition to the Web UI, you can access PiKVM using a regular VNC client. Compared to a browser, VNC has the advantage of true full-screen display and can fully intercept all keyboard shortcuts. In some scenarios, VNC may respond faster than a browser, especially on low-performance client machines. Note that VNC performance on PiKVM is not comparable to a typical VNC server or OS-level remote access tools.

!!! warning "Warning"
    Do not use VNC without X.509 or TLS encryption on untrusted networks! Otherwise, your password will travel over the network in plain text — this is an inherent limitation of the VNC protocol’s legacy implementations.

!!! note "Unsupported clients"
    Unsupported clients:<br>
    RealVNC — does not support many widely used open VNC protocol extensions;<br>
    Remmina — minor algorithm mismatches with the server; being improved;<br>
    Guacamole — incorrect vencrypt implementation; no JPEG compression support;<br>
    Vinagre — incorrect vencrypt implementation; tends to crash.

### Windows

For Windows, you can use UVNC and TigerVNC (downloadable from the shared drive: /玩客云/PiKVM相关软件/). Below is a UVNC example.

![img](../img/1717946873827-42.png)

### Android

For Android, the two open-source apps AVNC and bVNC Pro are recommended. Both support touchscreen and touchpad gestures. For AVNC, do not use the default security setting; change the security type to Vncauth to connect to PiKVM VNC correctly.

![img](../img/1717946871729-39.png)

![img](../img/1717946869599-36.png)

### iOS

For Apple iOS, you can use the paid app [bVNC](https://apps.apple.com/us/app/bvnc-pro/id1506461202).

### VNCAuth Authentication

For VNC clients that use VNCAuth (i.e., password-only without a username), if you change the PiKVM web account password, this auth mapping file will not be updated automatically. You must manually edit `/etc/kvmd/vncpasswd` to add a mapping. The format is "Custom VNC Password -> WEB_Account:WEB_Password". Example:

![img](../img/1717946094181-13.png)


