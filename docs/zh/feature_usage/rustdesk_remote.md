# RustDesk 远程控制

One-KVM 内置 RustDesk 被控端，可通过 RustDesk 客户端远程连接设备。

如需自建 RustDesk 中继服务器，可以使用 `rustdesk/rustdesk-server-s6:latest` docker 容器快速部署。

## 配置项

| 项目 | 说明 | 示例 |
| --- | --- | --- |
| 开机自启 | 启动后自动运行 | 关闭 |
| ID 服务器 | hbbs 地址（可省略端口） | `hbbs.example.com` |
| 中继服务器 | hbbr 地址（可留空） | `hbbr.example.com` |
| 中继密钥 | 服务器使用 `-k` 时必填 | `your-relay-key` |

!!! tip "端口默认值"
    若未填写端口，系统会自动补齐：ID 服务器 `21116`，中继服务器 `21117`。

## 公共服务器配置

公共服务器配置无需密码，默认折叠隐藏，点击按钮后在浏览器本地展示。

!!! warning "使用须知"
    公共服务器免费提供，不承诺可用性、稳定性、延迟或服务质量。请勿滥用、刷流量、攻击、批量占用资源或用于违法违规用途。

<button type="button" class="md-button md-button--primary" data-public-config="rustdesk">查看 RustDesk 服务器配置</button>

![rustdesk_remote-2026-01-28-00-19-25](images/rustdesk_remote-2026-01-28-00-19-25.png)

## 配置步骤

1. 打开 设置 → 扩展 → RustDesk 远程
2. 填写 ID 服务器和服务器密钥
3. 点击 **保存**，再点击 **启动**
4. 在设备信息区复制 **设备 ID** 与 **设备密码**
5. 在 RustDesk 客户端输入 ID 与密码进行连接

![RustDesk 远程设置页](../ui/images/settings-2026-01-03-22-40-55.png)

![rustdesk_remote-2026-01-28-00-20-27](images/rustdesk_remote-2026-01-28-00-20-27.png)

![rustdesk_remote-2026-01-28-00-21-19](images/rustdesk_remote-2026-01-28-00-21-19.png)

## RustDesk 客户端支持功能

!!! tip "RustDesk 键盘模式"
    如果你的被控机为 Linux 或安卓系统，使用 RustDesk 连接时，请设置为传统模式，从而获得正确键盘输入。
    ![rustdesk_remote-2026-01-31-01-20-14](images/rustdesk_remote-2026-01-31-01-20-14.png)

支持音频传输（需要已设置好采集的音频设备），支持视频格式切换，支持视频质量调整。

| | |
| --- | --- |
| ![rustdesk_remote-2026-01-28-00-22-43](images/rustdesk_remote-2026-01-28-00-22-43.png) | ![rustdesk_remote-2026-01-28-00-23-14](images/rustdesk_remote-2026-01-28-00-23-14.png) |

还支持相对鼠标模式（版本要求：One-KVM Rust >=0.1.3 且 RustDesk >= 1.4.5），当被控机器是 Linux 或安卓时可以使用这个模式。

![rustdesk_remote-2026-01-30-16-31-53](images/rustdesk_remote-2026-01-30-16-31-53.png)
