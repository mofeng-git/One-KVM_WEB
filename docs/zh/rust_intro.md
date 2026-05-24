# One-KVM Rust 介绍

## 什么是 One-KVM Rust？

One-KVM Rust 是一个 Rust 编写的的 IP-KVM（基于网络的键盘、视频、鼠标）解决方案，它能够让您通过网络远程管理服务器和工作站，实现 BIOS 级别的远程控制。

**项目目标**：提供一个开放、轻量、易用的 IPKVM 解决方案。

- **开放**：不绑定特定硬件配置，可在各类硬件环境中稳定运行。
- **轻量**：以二进制文件形式分发，无繁杂的依赖项，部署过程简单。
- **易用**：无需手动编辑配置文件，参数设置均可通过网页界面完成。

!!! info "项目背景"
    One-KVM Rust 是原 One-KVM（PiKVM） Python 版本的完全重写，除了名称几乎没有关联。

!!! warning "项目早期警告"
    当前项目仍处于早期阶段，很多功能可能不完善，仅供体验测试，不建议用于正式生成环境。 

## 主要特性



<div class="grid cards" markdown>

-   :material-cog-off:{ .lg .middle } __零配置文件__

    ---

    无需编辑任何配置文件，在网页界面选择音视频、鼠键设备并在线配置

-   :material-usb-flash-drive:{ .lg .middle } __Ventoy U盘模式__

    ---

    支持 Ventoy 虚拟 U 盘，无论传输文件还是引导大文件都不在话下

-   :material-puzzle:{ .lg .middle } __丰富的扩展功能__

    ---

    网页终端、RustDesk 接入、GOSTC 内网穿透、EasyTier 组网

-   :material-language-rust:{ .lg .middle } __Rust 编写__

    ---

    Rust 语言重写，轻量小巧、安全可靠、高性能

</div>

## 支持的硬件平台

docker

## 快速开始

[Docker 安装指南 :material-arrow-right:](getting-started/docker-install.md){ .md-button .md-button--primary }

## 获取帮助

- **GitHub Issues** - [报告问题或建议](https://github.com/mofeng-git/One-KVM/issues)
- **常见问题** - [查看 FAQ](getting-started/faq.md)
