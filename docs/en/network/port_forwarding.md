If you need to access One-KVM from the Internet, the simplest way is to set up port forwarding on your router. In this case, your ISP must assign your router a public IPv4 or public IPv6 address.

### Port forwarding configuration

!!! tip "Security recommendations"
    When exposing One-KVM services to the public Internet via port forwarding, it is strongly recommended to set a strong password and enable Two-Factor Authentication to prevent unauthorized access.<br>
    If you don't have a public IP, consider tools like Frp or Tailscale for port mapping or virtual networking.

The default web UI ports for the One-KVM integrated image are:

- HTTP: port 80 (automatically redirects to HTTPS)
- HTTPS: port 443

The default web UI ports for the One-KVM Docker image are:

- HTTP: port 8080 (automatically redirects to HTTPS)
- HTTPS: port 4430

In most cases, you only need to forward port 443 or 4430 to access the web management interface.

Below is an example of configuring port forwarding in the Xiaomi router admin console.

![PixPin_2024-06-30_17-01-25](../img/PixPin_2024-06-30_17-01-25.png)

!!! note "Access via HTTPS"
    When accessing the One-KVM web UI, you must use the `https://` scheme, for example:
    ```
    https://your-domain:port
    ```
    Using `http://` will result in a "400 Bad Request" error.

    ![HTTPS Access Hint](../img/PixPin_2024-06-30_16-37-59.png)


