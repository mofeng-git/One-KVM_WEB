This is a brief introduction to the PiKVM API. Since the software consists of multiple microservices, Nginx provides a unified API entry point at `/api/`.

### Authentication

All API endpoints require authentication. Each request must be authenticated individually, or you can obtain a token and pass it as a cookie with every request. When 2FA is enabled, you must append the one-time code to the password without spaces. You can use any TOTP library (for example, Python) to generate the code:

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

When the 2FA code is close to expiring, due to request latency the code may become invalid. A simple workaround for resulting 403 errors is to retry the request in seconds. A better approach is to combine this with checking the remaining validity; if about one second remains, delay the request. With this method, you can determine the remaining validity time:

```python
totp = pyotp.TOTP(secret)
now = int(time.time())
remaining = now - (now % totp.interval)
```

### Single-request authorization

- Using X-headers, send: `X-KVMD-User` and `X-KVMD-Passwd`

  ```
  curl -k -H X-KVMD-User:admin -H X-KVMD-Passwd:admin https://<pikvm-ip>/api/auth/check
  ```

- Using HTTP Basic Auth. Contrary to the standard, this implementation does not use headers. HTTP Basic Auth here is only for compatibility with other systems.

  ```
  curl -k -u admin:admin https://<pikvm-ip>/api/auth/check
  ```

### Session cookie authentication

1. Obtain a cookie: `POST /api/auth/login`

   ```
   $ curl -k -v -X POST --data user=admin --data passwd=admin https://pikvm/api/auth/login
   ...
   < Set-Cookie: auth_token=796cb83b11de4fcb749bc1bad14a91fb06dede84672b2f847fef1e988e6900de; Path=/
   ...
   ```

   Success returns HTTP 200; failure returns HTTP 403.

2. `GET /api/auth/check` verifies the cookie status. Likewise, success returns 200 and failure 403.

3. `POST /api/auth/logout` destroys the cookie.

### System

**Get software information**
`GET /api/info` returns all information about the PiKVM device.

Parameters: `fields=...` (optional) — return only specified categories, for example `fields=system,hw`. By default, all categories are shown.

```bash
curl -k -u admin:admin https://<pikvm-ip>/api/info
```
??? note "Click to expand"
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

**Get software logs**
`GET /api/log` returns logs for all KVMD services in plain text.

Parameters: `follow=1` (optional) — long polling mode to tail logs in real time; `seek=N` (optional) — show logs for the last N seconds (for example, the last hour).

```bash
curl -k -u admin:admin https://<pikvm-ip>/api/log?seek=3600
```
??? note "Click to expand"
    ```json
    [2024-07-01 04:48:37 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /log?seek=120 HTTP/1.0' => 200; size=751 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:48:46 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /log?seek=1800 HTTP/1.0' => 200; size=2668 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:48:56 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /log?seek=3600 HTTP/1.0' => 200; size=2988 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:09 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /log?seek=7200 HTTP/1.0' => 200; size=3308 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:17 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / -] 'GET /auth/check HTTP/1.0' => 200; size=194 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:30 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / -] 'GET /auth/check HTTP/1.0' => 200; size=194 --- referer='-'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:31 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / 192.168.31.242] 'GET /info?fields=auth,meta,extras HTTP/1.0' => 200; size=2141 --- referer='https://192.168.31.182/'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:32 kvmd.service] --- aiohttp.access                    INFO --- [admin (token) / -] 'GET /auth/check HTTP/1.0' => 200; size=194 --- referer='https://192.168.31.182/'; user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    [2024-07-01 04:49:33 kvmd-webterm.service] --- [2024/07/01 04:49:33:0792] N: WS   /ws - , clients: 1
    ```


