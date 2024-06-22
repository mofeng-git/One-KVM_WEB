这里记录了一些有用的东西。

### 玩客云 UBoot 备份

```bash
#跳过 MBR 分区表，备份玩客云 UBoot 内容并压缩
gzip -dc Boot_SkipUSBBurning.gz | dd of=/dev/mmcblk1 bs=512 seek=1 count=32767
#恢复备份的 UBoot 内容
dd if=/dev/mmcblk1 bs=512 skip=1 count=32767  | gzip > Boot_SkipUSBBurning.gz
```

### 玩客云 GPIO 驱动

实际上，从 Linux 4.8 开始，不再推荐使用 sysfs 接口（/sys/class/gpio）操作 GPIO，而是建议在用户空间使用字符设备进行操作，libgpiod 就是一个用于操作 GPIO 字符设备的库，同时提供了一些工具，方便开发者进行调试。libgpiod 包含一系列命令，有 gpioget、 gpioset、gpiodetect、gpioinfo、gpiofind 和 gpiomon 命令。

这里展示两种方式操控玩客云 GPIO 的使用示例。

使用 sysfs 接口命令进行玩客云 GPIO 控制：

```bash
#!/bin/bash
echo 420 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio420/direction
echo 0 > /sys/class/gpio/gpio420/value
case $1 in
    short)
	sleep 1
    ;;
    long)
    sleep 5
    ;;
    *)
    echo "No thing."
esac
echo 1 > /sys/class/gpio/gpio420/value
echo 420 > /sys/class/gpio/unexport
```

使用 libgpiod 包命令进行玩客云 GPIO 控制：

```bash
#!/bin/bash
case $1 in
    short)
    gpioset -m time -s 1 gpiochip1 7=0
    gpioset gpiochip1 7=1
    ;;
    long)
    gpioset -m time -s 5 gpiochip1 7=0
    gpioset gpiochip1 7=1
    ;;
    *)
    echo "No thing."
esac
```

参考资料：[gpioset 命令 | 人人都懂物联网 (getiot.tech)](https://getiot.tech/zh/linux-command/gpioset)

### HDMI环出

```bash
#设置显示背景图片
fbi text.png -T 1 -d /dev/fb0

#tty清屏
echo -e "\033c" > /dev/tty1

#隐藏光标
echo -e "\033[?25l" > /dev/tty1

#在HDMI显示器输出采集卡画面
ustreamer-dump  --sink=kvmd::ustreamer::jpeg  --output - | ffmpeg  -use_wallclock_as_timestamps 1 -i pipe:c:v -an -pix_fmt bgr24 -f fbdev /dev/fb0
```

