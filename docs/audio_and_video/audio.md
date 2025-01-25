### HDMI 音频支持

!!! note "音频功能说明"
    One-KVM 最新版本支持通过 H.264/WebRTC 实时传输 HDMI 音频，音质足够流畅地播放音乐。系统使用 Linux ALSA 声卡驱动，由 ustreamer 和 janus 负责采集 HDMI 音频并转码为 opus 格式。

#### 配置方法

**Docker 版本用户**

通过环境变量 `-e AUDIONUM=0` 指定音频设备，详见[Docker 环境变量说明](../start_install/docker_install.md#_3)。

**整合包用户**

编辑音频配置文件 `/etc/kvmd/janus/janus.plugin.ustreamer.jcfg`：

```yaml
video: {
	sink = "kvmd::ustreamer::h264"
}
audio: {
     device = "hw:0"
     tc358743 = "/dev/video0"
}
```

配置说明：

- `device`: 音频设备地址
- `tc358743`: 采集卡视频设备地址

#### 查找音频设备

在 Linux 系统下，可以通过以下命令查看可用的音频设备：
```bash
arecord -L   # 查看详细设备列表
arecord -l   # 查看简要设备列表
```

支持以下三种方式指定音频设备：

1. 声卡编号方式：`hw:0`
2. 声卡名称方式：`hw:CARD=MS2109`
3. 设备文件方式：`hw:/dev/snd/controlC0`

选择其中一种方式配置即可启用 HDMI 音频功能。

#### 效果展示

![HDMI 音频](../img/image-202411051650.png)

![type:video](../video/2024-11-05 16-36-29_x264.mp4)