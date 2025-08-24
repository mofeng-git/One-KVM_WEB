### Cloudflared Tunnel

!!! note "Prerequisites"
    Using Cloudflare Tunnel requires that you have already added a domain in Cloudflare. For more details, see the [Cloudflare Tunnel Chinese docs](https://cloudflared.cn/).

#### Configuration Steps

1. Go to Cloudflare Zero Trust, click Network in the sidebar, expand and click Tunnels. In “Select connector to private resources”, choose Add a tunnel, then click Next.

    ![PixPin_2024-06-30_18-04-12](../img/PixPin_2024-06-30_18-04-12.png)

    ![PixPin_2024-06-30_18-05-34](../img/PixPin_2024-06-30_18-05-34.png)

2. Choose Add a Tunnel, click Next, enter a tunnel name, then click Save Tunnel.

    ![PixPin_2024-06-30_18-06-42](../img/PixPin_2024-06-30_18-06-42.png)

3. Copy the installation command (select the appropriate OS and architecture)

    !!! warning "Notes for ARM devices"
        If you are using an armhf device (e.g., OneCloud), run this first:
        ```bash
        sudo dpkg --add-architecture arm
        ```

    ![PixPin_2024-06-30_18-28-34](../img/PixPin_2024-06-30_18-28-34.png)

    ![PixPin_2024-06-30_18-09-10](../img/PixPin_2024-06-30_18-09-10.png)

4. Configure a public hostname

    - Switch to the Public Hostnames tab
    - Click Add a public hostname
    - Select TCP protocol
    - Enter the internal IP and port of One-KVM
    - Click Save tunnel

![PixPin_2024-06-30_18-20-29](../img/PixPin_2024-06-30_18-20-29.png)

After configuration, you should see the running Cloudflare Tunnel:

![PixPin_2024-06-30_18-29-44](../img/PixPin_2024-06-30_18-29-44.png)

!!! note "Access via HTTPS"
    When accessing the One-KVM web UI, you must use the `https://` scheme, for example:
    ```
    https://your-domain:port
    ```
    Using `http://` will result in a "400 Bad Request" error.
    
    ![HTTPS Access Hint](../img/PixPin_2024-06-30_16-37-59.png)


