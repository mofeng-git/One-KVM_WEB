If you need to access One-KVM from the Internet, the simplest method is to configure port forwarding on your router. This requires the ISP to assign your router a public IPv4 or public IPv6 address.

### Port Forwarding Setup

!!! tip "Security Recommendation"
    When exposing One-KVM to the public Internet, strongly use a strong password and enable two-factor authentication to prevent unauthorized access.<br>
    If you do not have a public IP address, consider using FRP, Tailscale, or similar tools for port mapping or mesh networking.

The One-KVM integrated image uses the following default ports for the web UI:

- HTTP: 80 (redirects to HTTPS)
- HTTPS: 443

The One-KVM Docker image uses the following default ports for the web UI:

- HTTP: 8080 (redirects to HTTPS)
- HTTPS: 4430

In most cases, forwarding only 443 or 4430 is sufficient to access the web UI.

The following is an example of port forwarding configuration in a Xiaomi router admin panel.

![PixPin_2024-06-30_17-01-25](../../img/PixPin_2024-06-30_17-01-25.png)

!!! note "Access with HTTPS"
    When accessing the One-KVM web UI, you must use the `https://` scheme, for example:
    ```
    https://your-domain:port
    ```
    Using `http://` will return a "400 Bad Request" error.

    ![HTTPS Access Hint](../../img/PixPin_2024-06-30_16-37-59.png)