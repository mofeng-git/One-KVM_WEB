### Video Recording

One-KVM supports two recording methods: frontend and backend. Choose the one that fits your needs.

#### Frontend Recording

!!! note "Browser recording"
    Frontend recording uses the browser's MediaStream Recording API and supports:
    
    - MJPEG video (no audio)
    - H.264/WebRTC video (can include audio)
    - Automatic download of the recorded file (WebM format)

**How to use**

1. Click the top-right menu on the web page --> System --> Start Recording
2. The system starts recording the current video
3. After stopping the recording, the browser automatically downloads the file

![Recording UI](../img/image-202411052015.png)

#### Backend Recording

!!! tip "Command-line recording"
    Backend recording uses the `ustreamer-dump` tool and supports:

    - Multiple encoding formats
    - Real-time transcoding
    - Flexible command-line options

**Record raw bitstream**

```bash
# Record H.264 stream (H.264 must be enabled)
ustreamer-dump -s kvmd::ustreamer::h264 -o video-record.h264

# Record MJPEG stream (MJPEG must be enabled)
ustreamer-dump -s kvmd::ustreamer::jpeg -o video-record.mjpeg

# Record YUYV stream (YUYV must be enabled)
ustreamer-dump -s kvmd::ustreamer::yuyv -o video-record.yuyv
```

**Transcode to MP4 in real time**

```bash
# MJPEG to MP4
ustreamer-dump -s kvmd::ustreamer::jpeg -o - | \
    ffmpeg -use_wallclock_as_timestamps 1 -i pipe: -c:v libx264 video-record.mp4

# H.264 to MP4
ustreamer-dump -s kvmd::ustreamer::h264 -o - | \
    ffmpeg -use_wallclock_as_timestamps 1 -i pipe: -c:v libx264 video-record.mp4
```

!!! tip "Help"
    Use `ustreamer-dump --help` to view more options and usage details.


