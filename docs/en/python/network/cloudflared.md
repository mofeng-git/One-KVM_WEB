### Cloudflared Tunnel

!!! note "Prerequisite"
    Using Cloudflare Tunnel requires a domain already added in Cloudflare. For more details, see [Cloudflare Tunnel Chinese docs](https://cloudflared.cn/).

#### Setup Steps

1. Go to Cloudflare Zero Trust, click Network in the sidebar, expand it, then click Tunnels. Under Select connector to private resources, choose Add a tunnel and click Next.

    ![PixPin_2024-06-30_18-04-12](../../img/PixPin_2024-06-30_18-04-12.png)

    ![PixPin_2024-06-30_18-05-34](../../img/PixPin_2024-06-30_18-05-34.png)

2. Click Add a Tunnel, then Next, enter a tunnel name, and click Save Tunnel.

    ![PixPin_2024-06-30_18-06-42](../../img/PixPin_2024-06-30_18-06-42.png)

3. Copy the install command (select your OS and architecture).

    !!! warning "ARM Devices"
        If you use an armhf device (such as OneCloud), run:
        ```bash
        sudo dpkg --add-architecture arm
        ```

    ![PixPin_2024-06-30_18-28-34](../../img/PixPin_2024-06-30_18-28-34.png)

    ![PixPin_2024-06-30_18-09-10](../../img/PixPin_2024-06-30_18-09-10.png)

4. Configure the public hostname

    - Switch to the Public Hostnames tab
    - Click Add a public hostname
    - Select the TCP protocol
    - Enter One-KVM LAN IP and port
    - Click Save tunnel

![PixPin_2024-06-30_18-20-29](../../img/PixPin_2024-06-30_18-20-29.png)

After configuration, you will see the Cloudflare Tunnel running:

![PixPin_2024-06-30_18-29-44](../../img/PixPin_2024-06-30_18-29-44.png)

!!! note "Access with HTTPS"
    When accessing the One-KVM web UI, you must use the `https://` scheme, for example:
    ```
    https://your-domain:port
    ```
    Using `http://` will return a "400 Bad Request" error.

    ![HTTPS Access Hint](../../img/PixPin_2024-06-30_16-37-59.png)