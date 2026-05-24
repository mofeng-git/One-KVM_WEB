# Settings

The settings page lets you configure One-KVM features.

## Access Settings

Click the gear icon :material-cog: in the top-right corner to open Settings.

## General

### Appearance

Choose the web UI theme and display language.

![settings-2026-01-03-22-36-34](../../zh/ui/images/settings-2026-01-03-22-36-34.png)

### User

Manage the login username and password, and whether multiple web sessions may stay online (when off, a new login disconnects the previous session).

![User settings](../../zh/ui/images/settings-user.png)

### Network

Configure web listen ports, HTTPS/HTTP, listen addresses, and TLS certificates.

![Network settings](../../zh/ui/images/settings-network.png)

## Hardware

### Video Settings

Pick the capture device, format, resolution, and frame rate, and set the WebRTC encoder backend plus STUN/TURN.

![settings-2026-01-03-22-37-25](../../zh/ui/images/settings-2026-01-03-22-37-25.png)

### HID Settings

Configure the HID backend, OTG endpoint budget, and which HID features are exposed to the target machine.

![settings-2026-01-03-22-37-46](../../zh/ui/images/settings-2026-01-03-22-37-46.png)

### MSD

Set the root directory for virtual media (ISO images, etc.) and view MSD service status.

![settings-2026-01-03-22-44-36](../../zh/ui/images/settings-2026-01-03-22-44-36.png)

### ATX Settings

Bind power and reset actions (and optional power-LED sensing) to GPIO or USB relay drivers.

![settings-2026-01-03-22-38-04](../../zh/ui/images/settings-2026-01-03-22-38-04.png)

### Environment

Run diagnostics to verify the USB OTG / gadget chain and hardware video encoding capability.

![Environment settings](../../zh/ui/images/settings-environment.png)

## Extensions

### RustDesk Remote

Connect to your RustDesk server and manage this device’s ID, one-time password, and auto-start options.

![settings-2026-01-03-22-40-55](../../zh/ui/images/settings-2026-01-03-22-40-55.png)

### Ttyd Web Terminal

Open a host shell in the browser via ttyd; configure the default shell and boot auto-start behavior.

![settings-2026-01-03-22-41-07](../../zh/ui/images/settings-2026-01-03-22-41-07.png)

### RTSP Video Stream

Publish the current video over RTSP with listen address, port, path, codec, and optional authentication.

![RTSP settings](../../zh/ui/images/settings-rtsp.png)

### Remote Access

Configure **GOSTC NAT traversal** and **EasyTier P2P VPN** on the same page.

![Remote access settings](../../zh/ui/images/settings-remote-access.png)

## System

### About

Check the online upgrade channel and version info, plus host identity, CPU/memory usage, and network addresses.

![settings-2026-01-03-22-42-31](../../zh/ui/images/settings-2026-01-03-22-42-31.png)
