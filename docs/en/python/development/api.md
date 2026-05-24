This is a brief introduction to the PiKVM API. Since the software consists of multiple microservices, Nginx provides a unified API entry point at `/api/`.

### Authentication

All APIs require authentication. Each request must be authenticated, or you can get a token and pass it as a cookie. When 2FA is enabled, append the one-time code to the password with no spaces. You can generate the code using any TOTP library (e.g., Python):

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

When the 2FA code is close to expiring, request delays may cause a 403. One workaround is to retry in seconds. A better method is to combine retries with checking the remaining validity. If less than a second remains, delay the request. You can calculate remaining time like this:

```python
totp = pyotp.TOTP(secret)
now = int(time.time())
remaining = now - (now % totp.interval)
```

### Per-request authentication

- **Using X-headers**: send `X-KVMD-User` and `X-KVMD-Passwd`

  ```
  curl -k -H X-KVMD-User:admin -H X-KVMD-Passwd:admin https://<pikvm-ip>/api/auth/check
  ```

- **Using HTTP Basic Auth**: unlike standard practice, this implementation does not use headers; it is provided only for compatibility.

  ```
  curl -k -u admin:admin https://<pikvm-ip>/api/auth/check
  ```

### Session cookie authentication

1. Get a cookie: `POST /api/auth/login`

   ```
   $ curl -k -v -X POST --data user=admin --data passwd=admin https://pikvm/api/auth/login
   ...
   < Set-Cookie: auth_token=796cb83b11de4fcb749bc1bad14a91fb06dede84672b2f847fef1e988e6900de; Path=/
   ...
   ```

   Returns 200 on success, 403 on failure.

2. `GET /api/auth/check` checks cookie status. Returns 200 on success, 403 on failure.

3. `POST /api/auth/logout` destroys the cookie.

### System features

**Get software info**
`GET /api/info` returns all PiKVM device information.

Parameter: fields=... (optional) - only return specified categories, e.g., `fields=system,hw`. By default, all categories are returned.

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

**Get logs**
`GET /api/log` returns kvmd service logs in plain text.

Parameters: follow=1 (optional) - long polling to follow logs; seek=N (optional) - return logs from the past N seconds.

```bash
curl -k -u admin:admin https://<pikvm-ip>/api/log?seek=3600
```
??? note "Click to expand"
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