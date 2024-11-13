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

### USB HID 继电器

CUS_HID USB 继电器的控制代码。

??? tip "C 语言版本"

    ```c
    #include <linux/types.h>
    #include <linux/input.h>
    #include <linux/hidraw.h>
    
    #include <sys/types.h>
    #include <sys/ioctl.h>
    #include <sys/stat.h>
    
    #include <unistd.h>
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <stdint.h>
    #include <fcntl.h>
    #include <errno.h>
    
    int find_usbrelay()
    {
        int found = 0;
        int fd = -1;
        int result;
        int id;
    
        char path[32];
        
        const struct hidraw_devinfo usb_relay_info = 
        {
            .bustype = BUS_USB,
            .vendor = 0x5131,
            .product = 0x2007
        };
    
        struct hidraw_devinfo t_info;
    
        for(id = 0; !found; id++)	
        {
            sprintf(path, "/dev/hidraw%d", id);
    
            fd = open(path, O_RDWR | O_NONBLOCK);
            if (fd < 0)
                break;
    
            result = ioctl(fd, HIDIOCGRAWINFO, &t_info);
            if (result < 0)
                break;
        
            if ((t_info.bustype == usb_relay_info.bustype)
            && (t_info.vendor == usb_relay_info.vendor)
            && (t_info.product = usb_relay_info.product))
            {
                found = 1;
                break;
            }
    
            close(fd);
            fd = -1;
        }
    
        if (fd >= 0)
            close(fd);
    
        return found ? id : -1;
    }
    
    int set_usbrelay_onoff(int id, int ch, int onoff)
    {
        int fd = -1;
        uint8_t cmd[8];
    
        char path[32];
    
        do
        {
            sprintf(path, "/dev/hidraw%d", id);
    
            fd = open(path, O_RDWR | O_NONBLOCK);
            if (fd < 0)
                break;
    
            cmd[0] = 0xA0;
            cmd[1] = ch;    // 1, 2
            cmd[2] = onoff; // 0, 1
            cmd[3] = cmd[0] + cmd[1] + cmd[2];
    
            write(fd, cmd, 4);
    
        } while(0);
    
        if (fd >= 0)
            close(fd);
    
        return 0;
    }
    
    int main(int argc, char *argv[])
    {
        int result;
        int id;
        int ch;
        int onoff;
        char path[32];
    
        do
        {
            if (argc != 3)
            {
                printf("Usage:\n"
                "\tusbrelay ch on|off\n");
                break;
            }
    
            ch = atoi(argv[1]);
            if (strcmp(argv[2], "on") == 0)
                onoff = 1;
            else if (strcmp(argv[2], "off") == 0)
                onoff = 0;
            else
                break;
    
            id = find_usbrelay();
            if (id < 0)
            {
                printf("usbrelay not found\n");
                break;
            }
    
            set_usbrelay_onoff(id, ch, onoff);
    
        } while(0);
    
        return 0;
    }
    ```

??? tip "Python3 语言版本"

    ```python
    import sys
    import hid

    VENDOR_ID = 0x5131
    PRODUCT_ID = 0x2007

    def find_usbrelay():
        for device in hid.enumerate():
            if device.get("vendor_id") == VENDOR_ID and device.get("product_id") == PRODUCT_ID:
                return device
        return None

    def send_command(device_info, channel, onoff):
        device = hid.device()
        device.open(device_info['vendor_id'], device_info['product_id'])
        if device is None:
            print("Failed to open device.")
            return

        try:
            cmd = [0xA0, channel, onoff, 0xA0 + channel + onoff]
            device.write(bytearray(cmd))
        finally:
            device.close()

    def main():
        if len(sys.argv) != 3:
            print("Usage:\n"
                "\tpython script.py id on|off")
            return
        
        try:
            id = int(sys.argv[1])
            if sys.argv[2].lower() == 'on':
                onoff = 1
            elif sys.argv[2].lower() == 'off':
                onoff = 0
            else:
                raise ValueError
        except ValueError:
            print("Invalid command, use 'on' or 'off'")
            return
        
        device_info = find_usbrelay()
        if device_info is None:
            print("USB relay not found")
        else:
            send_command(device_info, id, onoff)
            print(f"Sent command to channel {id}: {'ON' if onoff else 'OFF'}")

    if __name__ == "__main__":
        main()
    ```

参考资料：

- [Examples — HIDAPI documentation (trezor.github.io)](https://trezor.github.io/cython-hidapi/examples.html)
- [Ubuntu 20.04 驱动LCUS_HID USB继电器_hid继电器程序-CSDN博客](https://blog.csdn.net/nibiewuxuanze/article/details/127069479)


### 在 Linux 中重置 USB 设备

如果如 USB 设备处于异常状态，可以使用 `usbreset` 实用程序重置它。可以使用以下适合特定 Linux 发行版的命令来安装 `usbreset`。

```bash
sudo apt install usbutils         [On Debian, Ubuntu and Mint]
sudo yum install usbutils         [On RHEL/CentOS/Fedora and Rocky/AlmaLinux]
sudo emerge -a sys-apps/usbutils  [On Gentoo Linux]
sudo apk add usbutils             [On Alpine Linux]
sudo pacman -S usbutils           [On Arch Linux]
sudo zypper install usbutils      [On OpenSUSE]    
sudo pkg install usbutils         [On FreeBSD]
```

安装后，可以使用以下命令重置 USB 设备，将 Bus 001 Device 004 替换为 USB 设备的总线和设备号：

```bash
sudo usbreset /dev/bus/usb/001/004
```
或者，可以使用以下命令，其中 是 USB 设备的 ID（来自 lsusb 输出）：

```bash
sudo usbreset 090c:1000
sudo usbreset 001:005
```

参考资料：

- [如何从 Linux 终端重置 USB 设备](https://cn.linux-console.net/?p=33930)