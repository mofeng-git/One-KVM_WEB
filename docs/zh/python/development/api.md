这里简单介绍 PiKVM API，由于软件由多个微服务组成，因此由 Nginx 提供一个通用的 API 入口点 `/api/`。

### 身份验证

所有应用程序接口都需要鉴权，每个请求都要逐一地进行身份验证，或者获取一个令牌并将其作为 Cookie 与每个请求一起传递。启用 2FA 后，需要将一次性代码添加到密码中，且不留空格。可以使用任何 TOTP 库（例如 Python）生成代码：

```python
import requests
import pyotp

user = "admin"
passwd = "admin"
secret = "3OBBOGSJRYRBZH35PGXURM4CMWTH3WSU"  # Can be found in /etc/kvmd/totp.secret

print(requests.get(
    url="https://pikvm/api/info",
    verify=False,  # For self-signed SSL certificate
    headers={
        "X-KVMD-User": user,
        "X-KVMD-Passwd": passwd + pyotp.TOTP(secret).now(),
    },
).text)
```

在 2FA 验证码有效期即将结束时，由于请求延迟验证码可能失效，处理此问题带来的错误 403 的方法可以是以秒为单位重复请求。更好的方法是将此方法与检查剩余有效期相结合，如果还有一秒左右的时间，则推迟请求。通过这种方法，你可以知道有效期还剩多少时间：

```python
totp = pyotp.TOTP(secret)
now = int(time.time())
remaining = now - (now % totp.interval)
```

### 单次请求授权

- **使用 X-headers** 需要发送：`X-KVMD-User` `X-KVMD-Passwd`

  ```
  curl -k -H X-KVMD-User:admin -H X-KVMD-Passwd:admin https://<pikvm-ip>/api/auth/check
  ```

- **使用 HTTP Basic Auth** 与标准相反，此方法不使用标头，此实现中的 HTTP Basic Auth 仅用于与其他系统兼容。

  ```
  curl -k -u admin:admin https://<pikvm-ip>/api/auth/check
  ```

### 基于会话的 cookie 身份验证

1. 获取 cookie :`POST /api/auth/login`

   ```
   $ curl -k -v -X POST --data user=admin --data passwd=admin https://pikvm/api/auth/login
   ...
   < Set-Cookie: auth_token=796cb83b11de4fcb749bc1bad14a91fb06dede84672b2f847fef1e988e6900de; Path=/
   ...
   ```

   身份验证成功会返回200，身份验证失败会返回403。

2.  `GET /api/auth/check` 此方法可以验证 cookie 状态，同样的，验证成功会返回200，验证失败会返回403。 

3. `POST /api/auth/logout` 此方法可以销毁 cookie。

### 系统功能
**获取软件信息**
`GET /api/info` 该方法返回 PiKVM 设备的所有信息。

参数：fields=...（可选）- 仅返回指定的类别，例如 `fields=system,hw`。默认情况下，将显示所有类别。

```bash
curl -k -u admin:admin https://<pikvm-ip>/api/info
```
??? note "点击展开"
    ```json
    {
        "ok": true,
        "result": {
            "auth": {
                "enabled": true
            },
            "extras": {
                "ipmi": {
                    "daemon": "kvmd-ipmi",
                    "description": "Show IPMI information",
                    "enabled": true,
                    "icon": "share/svg/ipmi.svg",
                    "name": "IPMI",
                    "path": "ipmi",
                    "place": 21,
                    "port": 623,
                    "started": true
                },
                "janus": {
                    "daemon": "kvmd-janus",
                    "description": "Janus WebRTC Gateway",
                    "enabled": false,
                    "name": "Janus",
                    "path": "janus",
                    "place": -1,
                    "started": false
                },
                "janus_static": {
                    "daemon": "kvmd-janus-static",
                    "description": "Janus WebRTC Gateway (Static Config)",
                    "enabled": true,
                    "name": "Janus Static",
                    "path": "janus",
                    "place": -1,
                    "started": true
                },
                "vnc": {
                    "daemon": "kvmd-vnc",
                    "description": "Show VNC information",
                    "enabled": true,
                    "icon": "share/svg/vnc.svg",
                    "name": "VNC",
                    "path": "vnc",
                    "place": 20,
                    "port": 5900,
                    "started": true
                },
                "webterm": {
                    "daemon": "kvmd-webterm",
                    "description": "Open terminal in a web browser",
                    "enabled": true,
                    "icon": "extras/webterm/terminal.svg",
                    "name": "Terminal",
                    "path": "extras/webterm/ttyd",
                    "place": 10,
                    "started": true
                }
            },
            "fan": {
                "monitored": false,
                "state": null
            },
            "hw": {
                "health": {
                    "temp": {
                        "cpu": 57.187
                    },
                    "throttling": {
                        "ignore_past": false,
                        "parsed_flags": {
                            "freq_capped": {
                                "now": false,
                                "past": false
                            },
                            "throttled": {
                                "now": false,
                                "past": false
                            },
                            "undervoltage": {
                                "now": false,
                                "past": false
                            }
                        },
                        "raw_flags": 0
                    }
                },
                "platform": {
                    "base": "Xunlei OneCloud",
                    "serial": null,
                    "type": "rpi"
                }
            },
            "meta": {
                "kvm": {},
                "server": {
                    "host": "onecloud"
                }
            },
            "system": {
                "kernel": {
                    "machine": "armv7l",
                    "release": "6.6.34-current-meson",
                    "system": "Linux",
                    "version": "#10 SMP Sun Jun 16 19:47:49 CST 2024"
                },
                "kvmd": {
                    "version": "3.291"
                },
                "streamer": {
                    "app": "ustreamer",
                    "features": {
                        "HAS_PDEATHSIG": true,
                        "WITH_GPIO": true,
                        "WITH_PTHREAD_NP": true,
                        "WITH_SETPROCTITLE": true,
                        "WITH_SYSTEMD": true
                    },
                    "version": "6.12"
                }
            }
        }
    }
    ```

**获取软件日志**
`GET /api/log` 该方法以纯文本形式显示所有 KVMD 服务的日志。

参数：follow=1 （可选）- 将请求转为长时间轮询模式，实时跟踪日志信息；seek=N （可选）- 以秒为单位运行指定时间的日志，例如将显示过去一小时的日志。

```bash
curl -k -u admin:admin https://<pikvm-ip>/api/log?seek=3600
```
??? note "点击展开"
    ```json
    [2024-07-01 04:48:37 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /log?seek=120 HTTP/1.0' => 200; size=751 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:48:46 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /log?seek=1800 HTTP/1.0' => 200; size=2668 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:48:56 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /log?seek=3600 HTTP/1.0' => 200; size=2988 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:09 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /log?seek=7200 HTTP/1.0' => 200; size=3308 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:17 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /log?seek=14400 HTTP/1.0' => 200; size=3628 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:30 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / -] 'GET /auth/check HTTP/1.0' => 200; size=194 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:30 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / -] 'GET /auth/check HTTP/1.0' => 200; size=194 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:31 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /info?fields=auth,meta,extras HTTP/1.0' => 200; size=2141 --- referer='https://192.168.31.182/'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:31 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / -] 'GET /auth/check HTTP/1.0' => 200; size=194 --- referer='https://192.168.31.182/'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:32 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / -] 'GET /auth/check HTTP/1.0' => 200; size=194 --- referer='https://192.168.31.182/'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:32 kvmd-webterm.service] --- [2024/07/01 04:49:32:9667] N: HTTP / -
    [2024-07-01 04:49:33 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / -] 'GET /auth/check HTTP/1.0' => 200; size=194 --- referer='https://192.168.31.182/extras/webterm/ttyd/'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:33 kvmd-webterm.service] --- [2024/07/01 04:49:33:0792] N: HTTP /token/ -
    [2024-07-01 04:49:33 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / -] 'GET /auth/check HTTP/1.0' => 200; size=194 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:33 kvmd-webterm.service] --- [2024/07/01 04:49:33:1500] N: WS   /ws - , clients: 1
    [2024-07-01 04:49:33 kvmd-webterm.service] --- [2024/07/01 04:49:33:1603] N: started process, pid: 2519
    ```