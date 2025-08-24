Conclusion: Running One-KVM in Docker shows no performance disadvantage compared to bare-metal installation. Thanks to minimized service dependencies, CPU usage is slightly better.

### Test method
```
# Target plays a 1080p video in a loop
# Collect CPU utilization and generate charts
apt-get install sysstat
sar -u 1 60 -o tmp1
sadf -T  -g ./tmp1  --  > test1.svg
```

### Results

**1080p30fps mjpeg/http** 

Bare metal (saturated)

![test1](../img/test1.png)

Docker (saturated)

![test4](../img/test4.png)

**720p60fps mjpeg/http**

Bare metal (stable at 48fps)

![test2](../img/test2.png)

Docker (stable at 48fps)

![test5](../img/test5.png)

**720p30fps h.264/webrtc**

Bare metal (saturated with minor fluctuations)

![test3](../img/test3.png)

Docker (saturated with minor fluctuations)

![test6](../img/test6.png)


