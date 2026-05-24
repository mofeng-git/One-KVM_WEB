### Tailscale Mesh Networking

!!! note "What is Tailscale?"
    Tailscale is a zero-config VPN based on the WireGuard protocol. It helps you:

    - Securely access devices from anywhere
    - Avoid complex network configuration
    - Protect data with end-to-end encryption
    - Use it across platforms (Windows, macOS, Linux, iOS, Android)

#### Install and Configure

!!! tip "Tip"
    Tailscale enables built-in DNS (e.g., MagicDNS) by default. This can cause DNS issues in some networks. We recommend disabling Tailscale DNS to avoid problems.

1. Install the Tailscale client on One-KVM:
```bash
# Download and run the install script
curl -fsSL https://tailscale.com/install.sh | sh

# Start Tailscale and sign in
#tailscale up
tailscale up --accept-dns=false
```

2. Follow the link shown in the terminal to complete login:

![Tailscale auth](../../img/PixPin_2024-06-30_17-39-00.png)

3. After login, you will see the new device in the Tailscale admin console:

![Tailscale device list](../../img/PixPin_2024-06-30_17-41-12.png)

!!! tip "Tailscale Device IP"
    - Tailscale assigns IPs like `100.x.y.z`
    - Use this IP to access One-KVM from anywhere
    - For advanced features (ACLs, subnet routing, etc.), see the [Tailscale docs](https://tailscale.com/kb)