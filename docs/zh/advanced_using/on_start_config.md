### 开机运行脚本

这是玩客云的开机自启脚本，文件在 `/etc/rc.local`。

```bash
root@onecloud:~# cat /etc/rc.local
#!/bin/bash

#设置玩客云前面板 LED 灯为绿色
echo "default-on" >/sys/class/leds/onecloud\:green\:alive/trigger
echo "none" >/sys/class/leds/onecloud\:red\:alive/trigger
echo "none" >/sys/class/leds/onecloud\:blue\:alive/trigger

#锁定 CPU 频率，避免动态 CPU 频率带来的 ustreamer 视频帧画面乱序致使网页随机频繁黑屏
#若有需要，可根据 cpufreq-info 命令返回信息提升频率或超频
cpufreq-set -d 1200MHz -u 1200MHz

#在频率锁定后启动 kvmd 服务，使所有服务进程运行在静态 CPU 频率上
systemctl disable kvmd && systemctl stop kvmd
systemctl start kvmd

#设置 OTG 口为从设备模式
echo device > /sys/class/usb_role/c9040000.usb-role-switch/role

#退出脚本
exit 0
```

