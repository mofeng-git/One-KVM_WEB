### Replace SSL Certificate

!!! note "Self-signed by default"
    One-KVM uses a self-signed certificate by default, located at `/etc/kvmd/nginx/ssl/`. Because it is self-signed, browsers will flag it as insecure. You can replace it with a trusted SSL certificate to resolve this.

Below is an example using a free ZeroSSL certificate:

1. Add your domain or IP in the ZeroSSL console and complete validation
2. Download the certificate package in NGINX format

![ZeroSSL download](../img/PixPin_2024-06-30_17-10-48.png)

3. Rename and upload the downloaded files:

    - Rename the certificate file to `server.crt`
    - Rename the private key file to `server.key`
    - Upload them to One-KVM at `/etc/kvmd/nginx/ssl/`

4. Restart kvmd-nginx to apply the new certificate:
```bash
sudo systemctl restart kvmd-nginx
```

![Certificate replaced](../img/PixPin_2024-06-30_17-14-59.png)

!!! tip "Other CAs"
    If you use another CA, the steps are similar. Ensure the certificate and private key file names are correct and placed in the proper directory.


