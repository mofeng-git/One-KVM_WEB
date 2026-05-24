# One-KVM Rust 文档

One-KVM Rust 是一个 Rust 编写的轻量级 IP-KVM 解决方案，可通过网络远程管理服务器和工作站，实现 BIOS 级远程控制。

**项目目标**：提供一个开放、轻量、易用的 IPKVM 解决方案。

- **开放**：不绑定特定硬件配置，可在各类硬件环境中稳定运行。
- **轻量**：以二进制文件形式分发，无繁杂的依赖项，部署过程简单。
- **易用**：无需手动编辑配置文件，参数设置均可通过网页界面完成。

<div class="grid cards" markdown>

-   :material-cog-off:{ .lg .middle } __零配置文件__

    ---

    无需编辑配置文件，在网页界面完成音视频与鼠键设备配置

-   :material-usb-flash-drive:{ .lg .middle } __虚拟媒体__

    ---

    支持虚拟磁盘与 Ventoy U 盘模式，安装与引导更方便

-   :material-puzzle:{ .lg .middle } __扩展能力__

    ---

    网页终端、RustDesk 接入、GOSTC 内网穿透、EasyTier 组网等

-   :material-language-rust:{ .lg .middle } __Rust 重写__

    ---

    轻量小巧、安全可靠、高性能

</div>

> One-KVM Python 已停止开发；若仍需查阅，请访问 [One-KVM Python 教程](python/index.md)。

## 快速开始

[Docker 安装 :material-arrow-right:](getting-started/docker-install.md){ .md-button .md-button--primary }

[DEB 软件包安装 :material-arrow-right:](getting-started/deb-install.md){ .md-button .md-button--primary }

[飞牛 NAS 安装 :material-arrow-right:](getting-started/fnnas-install.md){ .md-button .md-button--primary }


[首次配置引导 :material-arrow-right:](ui/onboarding.md){ .md-button }

## 技术支持

**免费内网穿透服务**

[GOSTC 内网穿透文档](feature_usage/gostc_tunnel.md)

[https://gostc.mofeng.run](https://gostc.mofeng.run)

**BUG 反馈、使用交流和技术支持**

- Github Issue：[https://github.com/mofeng-git/One-KVM/issues](https://github.com/mofeng-git/One-KVM/issues)
- QQ 交流群：569514148

**成品硬件套装**

作者时间能力有限，当前没有出售任何硬件套装。如有需要，可自行安装或在购物平台购买其他商家的成品。

**[远方](https://runyf.cn/)** 长期赞助作者，如需要成品硬件套装也可以看看他的店铺（闲鱼用户名：小远技术店铺）。

## 文件下载

重庆大学开源软件镜像站下载：[重庆大学开源软件镜像站](https://mirrors.cqu.edu.cn/)（网页右侧点击获取下载链接 --> 选择常用软件 One-KVM --> 下载安装包）

免登录下载地址 1：[http://sd1.files.one-kvm.cn/](http://sd1.files.one-kvm.cn/)（由群友赞助，支持直链，接入 EdgeOne CDN）

免登录下载地址 2：[https://pan.huang1111.cn/s/mxkx3T1](https://pan.huang1111.cn/s/mxkx3T1) （由 Huang1111公益计划 赞助）

百度网盘：[https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj](https://pan.baidu.com/s/166-2Y8PBF4SbHXFkGmFJYg?pwd=o9aj)

## 赞助方式

如果 One-KVM 对你有帮助，欢迎赞助作者，以支持作者继续开发和维护此项目。

[赞助计划与感谢页面](other/thanks.md)

## 赞助商

本项目得到以下赞助商的支持：

**镜像下载服务：**

- **[重庆大学开源软件镜像站](https://mirrors.cqu.edu.cn/)** - 提供镜像站下载服务

**文件存储服务：**

- **[Huang1111公益计划](https://pan.huang1111.cn/s/mxkx3T1)** - 提供免登录下载服务

**云服务商**

- **[林枫云](https://www.dkdun.cn)** - 赞助了本项目服务器

![林枫云](https://docs.one-kvm.cn/img/36076FEFF0898A80EBD5756D28F4076C.png)

林枫云主营国内外地域的精品线路业务服务器、高主频游戏服务器和大带宽服务器。
