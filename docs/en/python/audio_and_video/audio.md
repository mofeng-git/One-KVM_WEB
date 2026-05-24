### HDMI Audio Support

!!! note "Audio support"
    The latest One-KVM versions support real-time HDMI audio over H.264/WebRTC. Audio quality is smooth enough for music playback. The system uses Linux ALSA drivers, while ustreamer and janus capture HDMI audio and transcode it to Opus.

#### Configuration

**Docker users**

Specify the audio device with `-e AUDIONUM=0`. See [Docker environment variables](../start_install/docker_install.md#environment-variables).

**Integrated image users**

Edit `/etc/kvmd/janus/janus.plugin.ustreamer.jcfg`:

```yaml
video: {
	sink = "kvmd::ustreamer::h264"
}
audio: {
     device = "hw:0"
     tc358743 = "/dev/video0"
}
```

Configuration notes:

- `device`: audio device address
- `tc358743`: capture card video device address

#### Find Audio Devices

On Linux, check available devices with:
```bash
arecord -L   # Detailed list
arecord -l   # Short list
```

You can specify audio devices in one of the following ways:

1. Card index: `hw:0`
2. Card name: `hw:CARD=MS2109`
3. Device path: `hw:/dev/snd/controlC0`

Use one method to enable HDMI audio.

#### Example

![HDMI audio](../../img/image-202411051650.png)

![type:video](../../video/2024-11-05 16-36-29_x264.mp4)
