### GOSTC

!!! note "What is GOSTC?"
    GOSTC v2 is a NAT traversal service based on the open-source FRP project. It provides a web UI for managing tunnels, so you can change tunnel settings remotely with minimal setup. It supports multiple platforms.

    Anyone with a cloud server can self-host a node. The experience depends entirely on your server bandwidth, latency, and performance.

This project offers an open-source version and a pro version. One-KVM uses the open-source version.

GOSTC docs: https://docs.sian.one/gostc/info/

Integrated images and Docker images after build 251001 include GOSTC by default. After logging into the One-KVM homepage, you can open the GOSTC service and access the settings page.

![alt text](../../img/image-251001084100000.png)

![alt text](../../img/image-251001084400000.png)

### How to Use

All steps are done in the web UI. The GOSTC client pulls and applies the configuration you set on the service site in real time.

First, choose a service site. The two sites below are completely free.

!!! tip "Notice"
    The NAT traversal service is free for personal learning, testing, and non-commercial use only. Long-running bandwidth abuse, bulk registration, network attacks, data scraping, distributing illegal content, or any commercial profit activities are strictly prohibited.<br>Please use resources responsibly to avoid service interruptions and maintain a fair, healthy environment.

=== "One-KVM Dedicated (author-hosted)"
    Optimized for One-KVM usage. Only accepts One-KVM services and rejects other apps to avoid abuse.

    [https://gostc.mofeng.run](https://gostc.mofeng.run)

    ![alt text](../../img/image-251001085700000.png)

=== "Official GOSTC Service"
    Official GOSTC service site, no restrictions but higher latency.

    [https://gost.sian.one/](https://gost.sian.one/)

    ![alt text](../../img/image-250901085900000.png)

After registering on the service site, add a client device (name it as you like) and click Save. Then click the key link and copy the secret. Next, enter the secret and server address (without http:// or https://) into the One-KVM GOSTC page. We recommend enabling auto-start so tunnels come up after reboots.

![alt text](../../img/image-251001090200000.png)

![alt text](../../img/image-251001090600000.png)

After adding the client device, toggle it on to connect to the server. You can then see the client online on the service site.

Next, add a tunnel. On the service site, go to the port forwarding page and add a new mapping. Choose a node based on your situation, name it as you like, set the internal address to `127.0.0.1`, and set the internal port to `443` (use `4430` for Docker deployments). Save it, then you will see the public access address.

![alt text](../../img/image-251001091200000.png)

![alt text](../../img/image-251001092000000.png)

Any changes later (port changes, node changes, adding nodes) can be made on the service site; the One-KVM GOSTC client will pull and apply them automatically.

### Advanced Usage

You can also add your own relay nodes or host your own server according to the docs. The setup is very flexible.