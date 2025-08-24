### Tailscale 异地组网

!!! note "什么是 Tailscale?"
    Tailscale 是一个基于 WireGuard® 协议的零配置 VPN 网络工具。它能帮助您：
    
    - 在任何地方安全访问您的设备
    - 无需复杂的网络配置
    - 使用端到端加密保护数据安全
    - 支持多平台（Windows、macOS、Linux、iOS、Android）

#### 安装配置步骤

1. 在 One-KVM 上安装 Tailscale 客户端：
```bash
# 下载并执行安装脚本
curl -fsSL https://tailscale.com/install.sh | sh

# 启动 Tailscale 并登录
tailscale up
```

2. 按照终端提示的链接完成授权登录：

![Tailscale授权登录](../img/PixPin_2024-06-30_17-39-00.png)

3. 登录成功后，可以在 Tailscale 管理后台看到新添加的设备：

![Tailscale设备列表](../img/PixPin_2024-06-30_17-41-12.png)

!!! tip "Tailscale 设备 IP 地址"
    - Tailscale 默认会分配类似 `100.x.y.z` 的 IP 地址
    - 使用该 IP 地址即可从任何地方访问您的 One-KVM
    - 更多高级功能（如 ACL 控制、子网路由等）请参考 [Tailscale 官方文档](https://tailscale.com/kb)