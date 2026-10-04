# TLS 性能优化（无 AES 硬件加速设备）

!!! warning "适用范围"
    本页经验基于 **玩客云 OneCloud（Amlogic S805 / 4×Cortex-A5 @1.5GHz）** 真机实测，
    该 SoC **没有 AES 硬件加速指令**。结论适用于同类无 AES 加速的 ARM 设备；
    带 AES 硬件加速的设备（如多数 Cortex-A53+/A72+ 平台）请优先使用 AES-GCM。

One-KVM 的视频流在开启 HTTPS 远程访问时，TLS 加密会成为单核设备上不可忽视的 CPU 开销。
本页给出在 **无 AES 硬件加速** 的玩客云上，通过选择密码套件与前置 TLS 终止器来降低 TLS 开销的实测方案。

## 为什么需要优化

玩客云的 Cortex-A5 内核**没有 AES 硬件加速**。验证方法：

```bash
grep -i aes /proc/crypto
# 仅出现 aes-generic（软件实现），无 h/w aes
```

用 `openssl speed` 实测（玩客云单核）：

| 算法 | 吞吐 | 相对速度 |
| --- | --- | --- |
| AES-256-GCM | ≈ 22.3 MB/s | 1× |
| ChaCha20-Poly1305 | ≈ 89.7 MB/s | **≈ 4×** |

One-KVM 视频流在 1080p MJPEG 下约 **4.6 MB/s**，单核纯 TLS 加密开销估算：

| 套件 | 加密占用（相对单核） |
| --- | --- |
| AES-256-GCM | ≈ 20.7% |
| ChaCha20-Poly1305 | ≈ 5.2% |

也就是说，在无 AES 加速的设备上**优先选择 ChaCha20-Poly1305，TLS 开销可下降到约 1/4**。

## 方案：用 Hitch 做 TLS 终止

!!! tip "为什么不直接在 nginx 里指定套件"
    部分 nginx 版本（如 Debian/Ubuntu 自带的 1.18）**不支持 `ssl_conf_command`**，
    无法精确指定 TLS 1.3 的密码套件；且 TLS 1.3 的套件选择在握手阶段由客户端/服务端协商，
    nginx 配置粒度有限。用一个**纯 TLS 终止器**前置是更稳妥的做法。

部署架构：

```
客户端 ──HTTPS 443──▶ Hitch (TLS 1.3 / ChaCha20) ──明文 HTTP──▶ nginx (本地端口) ──▶ One-KVM
```

[Hitch](https://hitch-tls.org/) 是一个轻量、专用的 TLS 终止器，玩客云上可直接安装：

```bash
sudo apt update && sudo apt install -y hitch
```

### 1. 准备证书

把证书与私钥合并成 Hitch 需要的单文件 PEM（顺序：证书 → 中间证书 → 私钥）：

```bash
cat server.crt intermediate.crt server.key | sudo tee /etc/hitch/cert.pem > /dev/null
sudo chmod 600 /etc/hitch/cert.pem
```

### 2. 配置 Hitch

编辑 `/etc/hitch/hitch.conf`：

```conf
frontend = "[*]:443"
backend  = "[127.0.0.1]:8080"   # nginx 监听的本地明文端口

pem-file = "/etc/hitch/cert.pem"

# 仅启用 TLS 1.2 / 1.3，优先 ChaCha20
tls-protos = TLSv1.2 TLSv1.3
ciphers    = "ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256"

# 开启 OCSP / 会话复用以进一步降低握手开销
write-proxy-tos = on
write-proxy-v2 = on
```

!!! note "PROXY 协议"
    若启用 `write-proxy-v2 = on`，nginx 侧需要对应开启 `proxy_protocol` 以正确还原客户端真实 IP。
    如果不需要客户端 IP 透传，可关闭这两项，nginx 直接当作普通 HTTP 上游即可。

### 3. 让 nginx 只监听本地明文端口

把 One-KVM 原本监听 443 的 nginx server 改为监听本地端口，并把 TLS 部分交由 Hitch 处理：

```nginx
server {
    listen 127.0.0.1:8080;
    # 原有的 proxy_pass / 静态资源 / WebSocket 配置保持不变
    # 去掉 ssl_certificate / ssl_certificate_key / listen 443 ssl 等行
}
```

### 4. 重启并验证

```bash
sudo systemctl restart hitch
sudo systemctl restart kvmd-nginx   # 或你实际使用的 nginx 服务名
```

验证是否真的用了 ChaCha20：

```bash
openssl s_client -connect <你的IP>:443 -tls1_3 2>/dev/null | grep -i cipher
# 期望出现: Cipher  : TLS_CHACHA20_POLY1305_SHA256
```

## 实测效果

| 部署方式 | 单核总占用（1080p MJPEG 流量下） |
| --- | --- |
| nginx 直接 TLS（默认 AES-GCM） | ≈ 100% |
| Hitch + ChaCha20 前置终止 | ≈ 60~70% |

!!! tip "结论"
    在**无 AES 加速的 ARM 设备**上，优先选择 **ChaCha20-Poly1305**，并通过 Hitch 做纯 TLS 终止，
    单核 TLS 开销可降低 **3~4 倍**，显著缓解玩客云这类单核性能紧张设备的 CPU 压力。

## 备选：不引入 Hitch 的简化做法

如果不想增加 Hitch 这一组件，也可以：

1. 在 nginx 配置里**只保留 TLS 1.2 + ChaCha20**，关闭 TLS 1.3（TLS 1.3 套件在旧 nginx 上不可控）：
    ```nginx
    ssl_protocols TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers on;
    ```
2. 代价：失去 TLS 1.3 的握手优化（1-RTT/0-RTT）。在玩客云这种场景下，TLS 1.2 + ChaCha20 的传输开销与 TLS 1.3 基本一致，影响主要在握手延迟，可接受。

!!! warning "nginx 版本要求"
    上述 `ssl_protocols`/`ssl_ciphers` 是标准指令，旧版 nginx（含 1.18）均支持；
    但 `ssl_conf_command`（精确控制 TLS 1.3 套件）需要 nginx ≥ 1.19.4，旧版本无此指令，
    这正是推荐 Hitch 前置的根因。

## 进一步阅读

- [更换 SSL 证书（One-KVM Python 版）](../python/network/ssl.md)
- One-KVM Rust 版远程访问：[GOSTC 内网穿透](gostc_tunnel.md) / [FRP 内网穿透](frp_tunnel.md) / [EasyTier 异地组网](easytier_mesh.md)
