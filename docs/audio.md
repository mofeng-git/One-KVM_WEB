现 Docker 版 H.264/WebRTC 支持实时的流畅音频，音质足够听音乐。

HDMI 音频采集使用 Linux ALSA 声卡驱动，由 ustreamer janus 采集 HDMI 采集卡的音频并转码为 opus 实时音频格式，通过 H.264/WebRTC 在浏览器端播放。

### 使用

Docker 部署时可通过 `-e AUDIONUM=0` 环境变量指定。

音频设备配置文件为 `/etc/kvmd/janus/janus.plugin.ustreamer.jcfg`

```yaml
video: {
	sink = "kvmd::ustreamer::h264"
}
audio: {
     device = "hw:0"
     tc358743 = "/dev/video0"
}
```

其中 `device` 为采集卡音频设备地址，`tc358743` 为你的 采集卡视频地址。

Linux 系统下音频设备可通过 `arecord -L` 或 `arecord -l` 命令查看。

**音频输入设备编号说明**

1. 使用声卡编号，例如：hw:0

2. 使用声卡名，例如：hw:CARD=MS2109

3. 使用设备文件，例如：hw:/dev/snd/controlC0

从三种方式中任选其一写入配置文件中接口写入即可在网页使用 H.264 音频。

### 效果演示
![HDMI 音频](img/image-202411051650.png)

![type:video](./video/2024-11-05 16-36-29_x264.mp4)