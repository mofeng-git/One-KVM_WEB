### FRP NAT Traversal

!!! note "What is FRP?"
    FRP is a high-performance reverse proxy focused on NAT traversal. It supports:

    - TCP, UDP, HTTP, HTTPS, and more
    - Securely exposing internal services
    - Self-hosted servers or third-party providers

#### Install and Configure

1. Install the FRPC client on One-KVM:
```bash
wget https://raw.githubusercontent.com/stilleshan/frpc/master/frpc_linux_install.sh && chmod +x frpc_linux_install.sh && ./frpc_linux_install.sh
```

2. Obtain FRP configuration info

    - If using a third-party provider (e.g., OpenFrp), create a tunnel and get its config
    - If self-hosting, deploy the FRPS server and prepare the config

    Example of creating a TCP tunnel in OpenFrp:
    ![Create tunnel](../../img/PixPin_2024-06-30_16-15-30.png)

    ![Tunnel config](../../img/PixPin_2024-06-30_16-18-34.png)

3. Edit the FRPC config file:
```bash
# Edit the config file
nano /usr/local/frp/frpc.toml

# Restart to apply changes
sudo systemctl restart frpc

# Check status
sudo systemctl status frpc
```

![FRPC config example](../../img/PixPin_2024-06-30_16-34-26.png)

#### Remote Access

!!! note "Access with HTTPS"
    When accessing the One-KVM web UI, you must use the `https://` scheme, for example:
    ```
    https://your-domain:port
    ```
    Using `http://` will return a "400 Bad Request" error.

    ![HTTPS Access Hint](../../img/PixPin_2024-06-30_16-37-59.png)

!!! tip "Security Recommendation"
    - Use strong passwords to protect your FRP service
    - Enable two-factor authentication in One-KVM
    - Review and update FRP configs regularly