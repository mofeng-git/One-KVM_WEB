# One-KVM Python 文档

!!! warning "维护状态"
    本文档对应 One-KVM Python（PiKVM 适配版）教程；当前站点首页与新内容以 One-KVM Rust 为主。
    新部署建议优先阅读 [One-KVM Rust 文档](../index.md)。

## 项目简介

One-KVM 是基于廉价计算机硬件和 PiKVM 软件二次开发的 BIOS 级远程控制项目。可以实现远程管理服务器或工作站，无需在被控机安装软件调整设置，实现无侵入式控制，适用范围广泛。

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } __安装迅速__

    ---

    使用 Docker 或整合包，即刻完成部署，开箱即用

-   :material-camera-control:{ .lg .middle } __非侵入式控制__

    ---

    无需在被控机安装软件，实现非侵入式控制

-   :material-view-headline:{ .lg .middle } __功能丰富__

    ---

    KVM 远程控制、ATX 电源管理、 USB 虚拟外设、VNC、H.264/WebRTC 等

-   :material-open-source-initiative:{ .lg .middle } __开源开放__

    ---

    基于 [PiKVM](https://github.com/pikvm/pikvm)，以 GPLv3 开源许可证在 [GitHub](https://github.com/mofeng-git/One-KVM) 开源

</div>

本项目目前主要支持 PiKVM（镜像命名为 One-KVM，后续若出现 One-KVM 皆指代 PiKVM 的适配版本），尝试性支持 BliKVM 和 JetVKM。

本项目对 PiKVM 的适配较为成熟，若无特殊需求请优先使用 PiKVM 的适配版本。

**One-KVM**

![KVM 主页](../img/image.png)

**BliKVM**

![KVM 主页](../img/image-20251116163100000.png)

**JetKVM**

![KVM 主页](../img/image-20251116185500000.png)

## 技术支持

**免费内网穿透服务**

[GOSTC 内网穿透文档](network/gostc.md)

[https://gostc.mofeng.run](https://gostc.mofeng.run)

**BUG 反馈、使用交流和免费技术支持**

- Github Issue：[https://github.com/mofeng-git/One-KVM/issues](https://github.com/mofeng-git/One-KVM/issues)
- QQ 交流群：569514148

**成品硬件套装**

作者时间能力有限，当前没有出售任何硬件套装。如有需要，可自行安装或在购物平台购买其他商家的成品。

**[远方](https://runyf.cn/)** 长期赞助作者，如需要成品硬件套装也可以看看他的店铺（闲鱼用户名：小远技术店铺）。

## 文件下载

免登录高速下载：[http://sd1.files.one-kvm.cn/](http://sd1.files.one-kvm.cn/)（由群友赞助，支持直链，接入 EdgeOne CDN，建议使用多线程下载工具下载获取最高速度）

免登录高速下载地址：[https://pan.huang1111.cn/s/mxkx3T1](https://pan.huang1111.cn/s/mxkx3T1) （由 Huang1111公益计划 赞助）

百度网盘：[https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj](https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj)

## 赞助方式

如果 One-KVM 对你有帮助，欢迎赞助作者，以支持作者继续开发和维护此项目。

[赞助计划与感谢页面](thanks.md)

## 赞助商

本项目得到以下赞助商的支持：

**CDN 加速及安全防护：**

- **[Tencent EdgeOne](https://edgeone.ai/zh?from=github)** - 提供 CDN 加速及安全防护服务

![Tencent EdgeOne](https://edgeone.ai/media/34fe3a45-492d-4ea4-ae5d-ea1087ca7b4b.png)

**文件存储服务：**

- **[Huang1111公益计划](https://pan.huang1111.cn/s/mxkx3T1)** - 提供免登录下载服务

**云服务商**

- **[林枫云](https://www.dkdun.cn)** - 赞助了本项目宁波大带宽服务器

![林枫云](../img/36076FEFF0898A80EBD5756D28F4076C.png)

林枫云主营国内外地域的精品线路业务服务器、高主频游戏服务器和大带宽服务器。
