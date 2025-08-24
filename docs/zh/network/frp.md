### Frp 内网穿透

!!! note "什么是 Frp?"
    Frp 是一个高性能的反向代理应用，专注于内网穿透。它支持：

    - TCP、UDP、HTTP、HTTPS 等多种协议
    - 安全可靠的内网服务暴露
    - 支持自建服务器或使用第三方服务商

#### 安装配置步骤

1. 在 One-KVM 上安装 Frpc 客户端：
```bash
wget https://raw.githubusercontent.com/stilleshan/frpc/master/frpc_linux_install.sh && chmod +x frpc_linux_install.sh && ./frpc_linux_install.sh
```

2. 获取 Frp 配置信息

    - 如果使用第三方服务商（如 OpenFrp），需要创建隧道并获取配置
    - 如果自建服务器，需要先部署 Frps 服务端并准备配置信息

    以下是在 OpenFrp 创建 TCP 隧道的示例：
    ![创建隧道](../img/PixPin_2024-06-30_16-15-30.png)

    ![隧道配置](../img/PixPin_2024-06-30_16-18-34.png)

3. 修改 Frpc 配置文件：
```bash
# 编辑配置文件
nano /usr/local/frp/frpc.toml

# 重启服务使配置生效
sudo systemctl restart frpc

# 检查服务状态
sudo systemctl status frpc
```

![Frpc配置示例](../img/PixPin_2024-06-30_16-34-26.png)

#### 远程访问

!!! note "使用 HTTPS 协议访问"
    访问 One-KVM 网页界面时，必须使用 `https://` 协议头，例如：
    ```
    https://your-domain:port
    ```
    使用 `http://` 将会收到 "400 Bad Request" 错误。

    ![HTTPS访问提示](../img/PixPin_2024-06-30_16-37-59.png)

!!! tip "安全建议"
    - 使用强密码保护您的 Frp 服务
    - 建议开启 One-KVM 的双因素认证
    - 定期检查并更新 Frp 配置
