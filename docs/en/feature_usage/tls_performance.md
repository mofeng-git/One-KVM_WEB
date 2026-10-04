# TLS Performance Tuning (devices without AES hardware acceleration)

!!! warning "Scope"
    The guidance on this page comes from real-device testing on the **OneCloud (Amlogic S805 / 4×Cortex-A5 @1.5GHz)**,
    a SoC **without AES hardware acceleration instructions**. The conclusions apply to similar ARM devices
    that lack AES acceleration; on devices *with* AES hardware acceleration
    (most Cortex-A53+/A72+ platforms), prefer AES-GCM instead.

When HTTPS remote access is enabled, TLS encryption becomes a non-negligible CPU cost on single-core devices.
This page documents a tested approach — choosing the right cipher suite and putting a dedicated TLS terminator
in front — to reduce TLS overhead on the OneCloud, which lacks AES acceleration.

## Why tuning matters

The OneCloud's Cortex-A5 cores have **no AES hardware acceleration**. Verify it with:

```bash
grep -i aes /proc/crypto
# Only aes-generic (software implementation) is present; no h/w aes
```

Measured with `openssl speed` (OneCloud, single core):

| Algorithm | Throughput | Relative speed |
| --- | --- | --- |
| AES-256-GCM | ≈ 22.3 MB/s | 1× |
| ChaCha20-Poly1305 | ≈ 89.7 MB/s | **≈ 4×** |

At a One-KVM video stream of about **4.6 MB/s** (1080p MJPEG), the single-core pure-TLS encryption cost is:

| Cipher suite | Encryption cost (relative to one core) |
| --- | --- |
| AES-256-GCM | ≈ 20.7% |
| ChaCha20-Poly1305 | ≈ 5.2% |

In other words, on devices without AES acceleration, **preferring ChaCha20-Poly1305 cuts the TLS overhead to about 1/4**.

## Approach: terminate TLS with Hitch

!!! tip "Why not just configure the suite directly in nginx"
    Some nginx versions (such as the 1.18 shipped by Debian/Ubuntu) **do not support `ssl_conf_command`**,
    so they cannot pin a specific TLS 1.3 cipher suite. Besides, TLS 1.3 suite selection is negotiated during
    the handshake, and nginx only offers limited control. Putting a **dedicated TLS terminator** in front
    is the more robust approach.

Deployment architecture:

```
Client ──HTTPS 443──▶ Hitch (TLS 1.3 / ChaCha20) ──plaintext HTTP──▶ nginx (local port) ──▶ One-KVM
```

[Hitch](https://hitch-tls.org/) is a lightweight, dedicated TLS terminator that installs directly on the OneCloud:

```bash
sudo apt update && sudo apt install -y hitch
```

### 1. Prepare the certificate

Combine the certificate and private key into the single PEM file Hitch expects
(order: certificate → intermediate → private key):

```bash
cat server.crt intermediate.crt server.key | sudo tee /etc/hitch/cert.pem > /dev/null
sudo chmod 600 /etc/hitch/cert.pem
```

### 2. Configure Hitch

Edit `/etc/hitch/hitch.conf`:

```conf
frontend = "[*]:443"
backend  = "[127.0.0.1]:8080"   # the local plaintext port nginx listens on

pem-file = "/etc/hitch/cert.pem"

# Enable TLS 1.2 / 1.3 only, prefer ChaCha20
tls-protos = TLSv1.2 TLSv1.3
ciphers    = "ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256"

# Enable OCSP / session reuse to further reduce handshake overhead
write-proxy-tos = on
write-proxy-v2 = on
```

!!! note "PROXY protocol"
    If you enable `write-proxy-v2 = on`, nginx must enable `proxy_protocol` accordingly to recover the
    real client IP. If you do not need client IP passthrough, leave both options off and let nginx treat
    Hitch as a plain HTTP upstream.

### 3. Make nginx listen on a local plaintext port only

Change the One-KVM nginx server that previously listened on 443 to listen on a local port, and let Hitch
handle TLS:

```nginx
server {
    listen 127.0.0.1:8080;
    # Keep existing proxy_pass / static assets / WebSocket configuration as-is
    # Remove ssl_certificate / ssl_certificate_key / "listen 443 ssl" lines
}
```

### 4. Restart and verify

```bash
sudo systemctl restart hitch
sudo systemctl restart kvmd-nginx   # or the actual nginx service name you use
```

Verify that ChaCha20 is actually negotiated:

```bash
openssl s_client -connect <your-IP>:443 -tls1_3 2>/dev/null | grep -i cipher
# Expected: Cipher  : TLS_CHACHA20_POLY1305_SHA256
```

## Measured results

| Deployment | Single-core total usage (under 1080p MJPEG stream) |
| --- | --- |
| nginx terminating TLS directly (default AES-GCM) | ≈ 100% |
| Hitch + ChaCha20 front termination | ≈ 60~70% |

!!! tip "Conclusion"
    On **ARM devices without AES acceleration**, prefer **ChaCha20-Poly1305** and use Hitch as a dedicated
    TLS terminator. Single-core TLS overhead drops by **3~4×**, significantly relieving CPU pressure on
    single-core devices like the OneCloud.

## Alternative: a simpler approach without Hitch

If you do not want to add Hitch as an extra component, you can instead:

1. Keep **TLS 1.2 + ChaCha20** only in nginx and disable TLS 1.3 (TLS 1.3 suites are not controllable on old nginx):
    ```nginx
    ssl_protocols TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers on;
    ```
2. The trade-off: you lose TLS 1.3 handshake optimizations (1-RTT/0-RTT). For the OneCloud, the transfer cost of
   TLS 1.2 + ChaCha20 is essentially identical to TLS 1.3; the impact is mainly on handshake latency, which is
   acceptable.

!!! warning "nginx version requirement"
    `ssl_protocols`/`ssl_ciphers` above are standard directives supported by old nginx (including 1.18).
    However, `ssl_conf_command` (for pinning a TLS 1.3 suite) requires nginx ≥ 1.19.4 and is unavailable on
    older versions — this is the root reason for recommending a Hitch front-end.

## Further reading

- [Replace the SSL certificate (One-KVM Python edition)](../python/network/ssl.md)
- One-KVM Rust remote access: [GOSTC NAT Traversal](gostc_tunnel.md) / [FRP NAT Traversal](frp_tunnel.md) / [EasyTier Mesh](easytier_mesh.md)
