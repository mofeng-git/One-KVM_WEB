### Cloudflared 隧道

!!! note "前置条件"
    使用 Cloudflare Tunnel 需要您已经在 Cloudflare 添加了域名。更多详细内容可以参考 [Cloudflare Tunnel 中文文档](https://cloudflared.cn/)。

#### 配置步骤

1. 进入 Cloudflare Zero Trust，在侧栏中点击 Network，展开后点击 Tunnels。在 Select connector to private resources 处选择 Add a tunnel，然后点击 Next。

    ![PixPin_2024-06-30_18-04-12](../img/PixPin_2024-06-30_18-04-12.png)

    ![PixPin_2024-06-30_18-05-34](../img/PixPin_2024-06-30_18-05-34.png)

2. 选择 Add a Tunnel，点击 Next，填入隧道名称，然后点击 Save Tunnel。

    ![PixPin_2024-06-30_18-06-42](../img/PixPin_2024-06-30_18-06-42.png)

3. 复制安装命令（选择对应的系统和架构）

    !!! warning "ARM 设备注意事项"
        如果您使用 armhf 架构设备（如玩客云），需要先执行：
        ```bash
        sudo dpkg --add-architecture arm
        ```

    ![PixPin_2024-06-30_18-28-34](../img/PixPin_2024-06-30_18-28-34.png)

    ![PixPin_2024-06-30_18-09-10](../img/PixPin_2024-06-30_18-09-10.png)

4. 配置公共域名

    - 切换到 Public Hostnames 标签页
    - 点击 Add a public hostname
    - 选择 TCP 协议
    - 填入 One-KVM 的内网 IP 和端口
    - 点击 Save tunnel 保存配置

![PixPin_2024-06-30_18-20-29](../img/PixPin_2024-06-30_18-20-29.png)

配置完成后，您可以看到正在运行的 Cloudflare Tunnel：

![PixPin_2024-06-30_18-29-44](../img/PixPin_2024-06-30_18-29-44.png)

!!! note "使用 HTTPS 协议访问"
    访问 One-KVM 网页界面时，必须使用 `https://` 协议头，例如：
    ```
    https://your-domain:port
    ```
    使用 `http://` 将会收到 "400 Bad Request" 错误。
    
    ![HTTPS访问提示](../img/PixPin_2024-06-30_16-37-59.png)