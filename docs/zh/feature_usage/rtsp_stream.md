# RTSP 视频流

RTSP 视频流可以把 One-KVM 当前采集到的视频画面推送为标准 RTSP 地址，供 PotPlayer、VLC、ffmpeg 等客户端拉取观看。该功能适合只需要查看画面、录制视频或接入第三方监控/流媒体工具的场景。

RTSP 输出使用 H.264/H.265 编码；运行时会锁定当前输出编码。如果 RustDesk 已经运行，需要选择与 RustDesk 相同的编码。

## 配置项

| 项目 | 说明 | 示例/默认 |
| --- | --- | --- |
| 开机自启 | 系统启动后自动启动 RTSP 服务 | 关 |
| 监听地址 | RTSP 服务绑定的本机地址。`0.0.0.0` 表示监听所有 IPv4 地址 | `0.0.0.0` |
| 端口 | RTSP 服务端口 | `8554` |
| 流路径 | RTSP URL 中的路径部分 | `live` |
| 编码格式 | RTSP 输出编码 | `H.264` |
| 仅允许单客户端 | 限制同一时间只允许一个客户端拉流 | 开 |
| 用户名 | 留空表示无需认证 | - |
| 密码 | 设置后与用户名一起用于 RTSP Basic 认证 | - |

![RTSP 配置页](images/rtsp_stream-config.png)

## 配置步骤

1. 打开 **设置 → 扩展 → 第三方接入 → RTSP 视频流**
2. 设置监听地址、端口、流路径和编码格式
3. 如需限制访问，填写用户名和密码
4. 点击 **保存**，再点击 **启动**
5. 在 **RTSP 地址预览** 中复制访问地址

启动后，页面状态会显示为“运行中”，运行期间配置项会被锁定。如需修改端口、路径、编码或认证信息，请先停止 RTSP 服务，保存配置后再启动。

![RTSP 运行中](images/rtsp_stream-running.png)

## 使用客户端拉流

在同一局域网内，可以直接使用页面预览的地址访问：

```text
rtsp://设备IP:8554/live
```

如果配置了用户名和密码，客户端地址通常写为：

```text
rtsp://用户名:密码@设备IP:8554/live
```

使用 `ffplay` 预览：

```bash
ffplay rtsp://192.168.1.127:8554/live
```

使用 `ffmpeg` 录制：

```bash
ffmpeg -i rtsp://192.168.1.127:8554/live -c copy onekvm-rtsp.mp4
```

也可以在 PotPlayer、VLC 等播放器中添加网络串流地址进行播放。

![PotPlayer RTSP 测试](images/rtsp_stream-client.png)
