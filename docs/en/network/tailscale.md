### Tailscale Mesh Networking

!!! note "What is Tailscale?"
    Tailscale is a zero-config VPN built on the WireGuard® protocol. It helps you:
    
    - Securely access your devices from anywhere
    - Avoid complex network configuration
    - Protect data with end-to-end encryption
    - Use across multiple platforms (Windows, macOS, Linux, iOS, Android)

#### Installation & Setup

1. Install the Tailscale client on One-KVM:
```bash
# Download and run the installer
curl -fsSL https://tailscale.com/install.sh | sh

# Start Tailscale and sign in
tailscale up
```

2. Follow the link shown in the terminal to complete sign-in authorization:

![Tailscale auth](../img/PixPin_2024-06-30_17-39-00.png)

3. After login, you will see the newly added device in the Tailscale admin console:

![Tailscale device list](../img/PixPin_2024-06-30_17-41-12.png)

!!! tip "Tailscale device IP"
    - Tailscale typically assigns an IP like `100.x.y.z`
    - Use this IP to access your One-KVM from anywhere
    - For advanced features (ACLs, subnet routing, etc.), see the [official Tailscale docs](https://tailscale.com/kb)


