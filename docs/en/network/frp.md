### Frp NAT Traversal

!!! note "What is Frp?"
    Frp is a high-performance reverse proxy application focused on NAT traversal. It supports:

    - Multiple protocols: TCP, UDP, HTTP, HTTPS, etc.
    - Secure exposure of intranet services
    - Either self-hosted servers or third-party providers

#### Installation and Configuration

1. Install the Frpc client on One-KVM:
```bash
wget https://raw.githubusercontent.com/stilleshan/frpc/master/frpc_linux_install.sh && chmod +x frpc_linux_install.sh && ./frpc_linux_install.sh
```

2. Obtain Frp configuration

    - If using a third-party provider (e.g., OpenFrp), create a tunnel and obtain the configuration
    - If self-hosting, deploy the Frps server first and prepare the configuration

    Example of creating a TCP tunnel in OpenFrp:
    ![Create tunnel](../img/PixPin_2024-06-30_16-15-30.png)

    ![Tunnel config](../img/PixPin_2024-06-30_16-18-34.png)

3. Modify the Frpc configuration file:
```bash
# Edit config
nano /usr/local/frp/frpc.toml

# Restart service to apply changes
sudo systemctl restart frpc

# Check service status
sudo systemctl status frpc
```

![Frpc config example](../img/PixPin_2024-06-30_16-34-26.png)

#### Remote Access

!!! note "Access via HTTPS"
    When accessing the One-KVM web UI, you must use the `https://` scheme, for example:
    ```
    https://your-domain:port
    ```
    Using `http://` will result in a "400 Bad Request" error.

    ![HTTPS Access Hint](../img/PixPin_2024-06-30_16-37-59.png)

!!! tip "Security recommendations"
    - Use strong passwords for your Frp services
    - Enable One-KVM Two-Factor Authentication
    - Review and update Frp configuration regularly


