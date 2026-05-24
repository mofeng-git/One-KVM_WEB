Conclusion: Installing One-KVM with Docker is not slower than bare-metal, and its streamlined services result in slightly lower CPU usage.

### Test Method
```
# The target machine loops a 1080p video
# Use the following commands to sample CPU usage and generate charts
apt-get install sysstat
sar -u 1 60 -o tmp1
sadf -T  -g ./tmp1  --  > test1.svg
```

### Test Results

**1080p30fps mjpeg/http**

Bare-metal One-KVM install (running at full speed)

![test1](../../img/test1.png)

Docker One-KVM install (running at full speed)

![test4](../../img/test4.png)

**720p60fps mjpeg/http**

Bare-metal One-KVM install (stable around 48fps)

![test2](../../img/test2.png)

Docker One-KVM install (stable around 48fps)

![test5](../../img/test5.png)

**720p30fps h.264/webrtc**

Bare-metal One-KVM install (running at full speed with occasional fluctuations)

![test3](../../img/test3.png)

Docker One-KVM install (running at full speed with occasional fluctuations)

![test6](../../img/test6.png)