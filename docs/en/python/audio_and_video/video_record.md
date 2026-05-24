### Video Recording

One-KVM supports both front-end and back-end recording. Choose the method that fits your needs.

#### Front-end Recording

!!! note "Browser recording"
    Front-end recording uses the browser MediaStream Recording API and supports:

    - MJPEG mode (no audio)
    - H.264/WebRTC mode (with audio)
    - Automatic download of recordings (WebM)

**How to use**

1. Click top-right menu -> System -> Start recording
2. The system records the current video stream
3. Click Stop recording and the browser downloads the file

![Recording UI](../../img/image-202411052015.png)

#### Back-end Recording

!!! tip "CLI recording"
    Back-end recording uses `ustreamer-dump` and supports:

    - Multiple video formats
    - Real-time transcoding
    - Flexible CLI options

**Record raw streams**

```bash
# Record H.264 stream (requires H.264 enabled)
ustreamer-dump -s kvmd::ustreamer::h264 -o video-record.h264

# Record MJPEG stream (requires MJPEG enabled)
ustreamer-dump -s kvmd::ustreamer::jpeg -o video-record.mjpeg

# Record YUYV stream (requires YUYV enabled)
ustreamer-dump -s kvmd::ustreamer::yuyv -o video-record.yuyv
```

**Transcode to MP4 in real time**

```bash
# MJPEG -> MP4
ustreamer-dump -s kvmd::ustreamer::jpeg -o - | \
    ffmpeg -use_wallclock_as_timestamps 1 -i pipe: -c:v libx264 video-record.mp4

# H.264 -> MP4
ustreamer-dump -s kvmd::ustreamer::h264 -o - | \
    ffmpeg -use_wallclock_as_timestamps 1 -i pipe: -c:v libx264 video-record.mp4
```

!!! tip "Help"
    Run `ustreamer-dump --help` to see more options.