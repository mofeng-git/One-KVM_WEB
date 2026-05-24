# One-KVM Python Docs

!!! warning "Maintenance Status"
    This documentation covers One-KVM Python (PiKVM-based). The site homepage and new content focus on One-KVM Rust.
    For new deployments, we recommend reading the [One-KVM Rust docs](../index.md) first.

## Project Overview

One-KVM is a BIOS-level remote control project based on low-cost hardware and the PiKVM software. It enables remote management of servers or workstations without installing software on the target machine, providing non-intrusive control across many scenarios.

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __Fast Installation__

    ---

    Deploy with Docker or an integrated image and start using it immediately

-   :material-camera-control:{ .lg .middle } __Non-intrusive Control__

    ---

    No software installation required on the controlled machine

-   :material-view-headline:{ .lg .middle } __Feature Rich__

    ---

    KVM remote control, ATX power management, USB virtual devices, VNC, H.264/WebRTC, and more

-   :material-open-source-initiative:{ .lg .middle } __Open Source__

    ---

    Based on [PiKVM](https://github.com/pikvm/pikvm), released under GPLv3 on [GitHub](https://github.com/mofeng-git/One-KVM)

</div>

This project primarily supports PiKVM (images are named One-KVM; references to One-KVM generally mean the PiKVM-based variant), with experimental support for BliKVM and JetKVM.

PiKVM support is the most mature; unless you have special requirements, we recommend the PiKVM-based version.

**One-KVM**

![KVM Home](../img/image.png)

**BliKVM**

![KVM Home](../img/image-20251116163100000.png)

**JetKVM**

![KVM Home](../img/image-20251116185500000.png)

## Support

**Free NAT Traversal Service**

[GOSTC tunneling guide](network/gostc.md)

[https://gostc.mofeng.run](https://gostc.mofeng.run)

**Bug Reports, Discussion, and Free Technical Support**

- GitHub Issues: [https://github.com/mofeng-git/One-KVM/issues](https://github.com/mofeng-git/One-KVM/issues)
- QQ Group: 569514148

**Prebuilt Hardware Kits**

The author does not currently sell prebuilt hardware kits due to limited time. If you need one, you can build it yourself or buy a third-party kit.

**[Yuanfang](https://runyf.cn/)** is a long-term sponsor. If you need a prebuilt kit, you can also check their store (Xianyu username: Xiaoyuan Technical Store).

## Downloads

High-speed direct download: [http://sd1.files.one-kvm.cn/](http://sd1.files.one-kvm.cn/) (sponsored by community members; direct links, EdgeOne CDN; multi-threaded download recommended).

High-speed direct download: [https://pan.huang1111.cn/s/mxkx3T1](https://pan.huang1111.cn/s/mxkx3T1) (sponsored by Huang1111 Public Welfare).

Baidu Netdisk: [https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj](https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj)

## Sponsorship

If One-KVM helps you, consider supporting the project so development and maintenance can continue.

[Sponsorship plan and acknowledgements](thanks.md)

## Sponsors

This project is supported by the following sponsors:

**CDN Acceleration and Security**

- **[Tencent EdgeOne](https://edgeone.ai/zh?from=github)** - CDN acceleration and security protection

![Tencent EdgeOne](https://edgeone.ai/media/34fe3a45-492d-4ea4-ae5d-ea1087ca7b4b.png)

**File Storage Service**

- **[Huang1111 Public Welfare](https://pan.huang1111.cn/s/mxkx3T1)** - Provides login-free downloads

**Cloud Service Provider**

- **[LinFeng Cloud](https://www.dkdun.cn)** - Sponsors a high-bandwidth server in Ningbo

![LinFeng Cloud](../img/36076FEFF0898A80EBD5756D28F4076C.png)

LinFeng Cloud offers premium network routes in China and abroad, high-frequency game servers, and high-bandwidth servers.