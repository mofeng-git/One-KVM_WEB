# EasyTier 异地组网

EasyTier 提供 P2P VPN 组网能力，可把 One-KVM 加入同一虚拟局域网。需要系统内已安装 `easytier-core`（扩展页面显示“可用”），准备好网络名称与网络密钥。

## 配置项

| 项目 | 说明 | 示例 |
| --- | --- | --- |
| 网络名称 | 必填，加入同一组网的标识 | `one-kvm` |
| 网络密钥 | 可选但推荐 | `your-secret` |
| 对等节点 | 可选，引导连接，支持多条 | `tcp://1.2.3.4:11010` |
| 虚拟 IP | 可选，留空自动分配 | `10.0.0.2/24` |

## 公共节点配置

公共节点配置无需密码，默认折叠隐藏，点击按钮后在浏览器本地展示。

!!! warning "使用须知"
    公共节点免费提供，不承诺可用性、稳定性、延迟或服务质量。请勿滥用、刷流量、攻击、批量占用资源或用于违法违规用途。

<button type="button" class="md-button md-button--primary" data-public-config="easytier">查看 EasyTier 公共节点配置</button>

![easytier_mesh-2026-01-28-00-41-29](images/easytier_mesh-2026-01-28-00-41-29.png)

## 配置步骤

1. 打开 设置 → 扩展 → 远程访问 → EasyTier
2. 填写网络名称、密钥、对等节点（可选；可使用上方公共节点）
3. 虚拟 IP 留空表示自动分配，手动填写需带网段
4. 点击 **保存**，再点击 **启动**

![easytier_mesh-2026-01-28-00-44-18](images/easytier_mesh-2026-01-28-00-44-18.png)

![easytier_mesh-2026-01-28-00-44-48](images/easytier_mesh-2026-01-28-00-44-48.png)
