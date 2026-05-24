### Replace the SSL Certificate

!!! note "One-KVM uses a self-signed certificate by default"
    The default self-signed certificate is stored in `/etc/kvmd/nginx/ssl/`. Because it is self-signed, browsers will show a warning. Replace it with a trusted SSL certificate to remove the warning.

Below is an example using a free ZeroSSL certificate:

1. Add your domain or IP in the ZeroSSL console and complete domain validation
2. Download the NGINX-format certificate package

![ZeroSSL download](../../img/PixPin_2024-06-30_17-10-48.png)

3. Rename and upload the certificate files:

    - Rename the certificate file to `server.crt`
    - Rename the private key file to `server.key`
    - Upload them to `/etc/kvmd/nginx/ssl/` on One-KVM

4. Restart the kvmd-nginx service to apply the new certificate:
```bash
sudo systemctl restart kvmd-nginx
```

![Certificate replaced](../../img/PixPin_2024-06-30_17-14-59.png)

!!! tip "Other certificate providers"
    The steps are similar for other providers. Ensure the certificate and key are renamed correctly and placed in the right directory.