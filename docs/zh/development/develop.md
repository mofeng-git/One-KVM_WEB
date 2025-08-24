### 玩客云 UBoot 备份

```bash
#跳过 MBR 分区表，备份玩客云 UBoot 内容并压缩
gzip -dc Boot_SkipUSBBurning.gz | dd of=/dev/mmcblk1 bs=512 seek=1 count=32767
#恢复备份的 UBoot 内容
dd if=/dev/mmcblk1 bs=512 skip=1 count=32767  | gzip > Boot_SkipUSBBurning.gz
```

### 玩客云 GPIO 驱动

实际上，从 Linux 4.8 开始，不再推荐使用 sysfs 接口（/sys/class/gpio）操作 GPIO，而是建议在用户空间使用字符设备进行操作，libgpiod 就是一个用于操作 GPIO 字符设备的库，同时提供了一些工具，方便开发者进行调试。libgpiod 包含一系列命令，有 gpioget、 gpioset、gpiodetect、gpioinfo、gpiofind 和 gpiomon 命令。

这里展示 sysfs 接口和 libgpiod 包命令两种方式操控玩客云 GPIO 的使用示例。

=== "sysfs"

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
=== "libgpiod"

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

??? tip "玩客云 5.x Linux 内核的所有 GPIO 引脚"
    === "gpioinfo"
        ```
        gpiochip0 - 83 lines:
            line   0: "J2 Header Pin 35" unused input active-high 
            line   1: "J2 Header Pin 36" unused input active-high 
            line   2: "J2 Header Pin 32" unused input active-high 
            line   3: "J2 Header Pin 31" unused input active-high 
            line   4: "J2 Header Pin 29" unused input active-high 
            line   5: "J2 Header Pin 18" unused input active-high 
            line   6: "J2 Header Pin 22" unused input active-high 
            line   7: "J2 Header Pin 16" unused input active-high 
            line   8: "J2 Header Pin 23" unused input active-high 
            line   9: "J2 Header Pin 21" unused input active-high 
            line  10: "J2 Header Pin 19" unused input active-high 
            line  11: "J2 Header Pin 33" unused input active-high 
            line  12: "J2 Header Pin 8" unused input active-high 
            line  13: "J2 Header Pin 10" unused input active-high 
            line  14: "J2 Header Pin 15" unused input active-high 
            line  15: "J2 Header Pin 13" unused input active-high 
            line  16: "J2 Header Pin 24" unused input active-high 
            line  17: "J2 Header Pin 26" unused input active-high 
            line  18: "Revision (upper)" unused input active-high 
            line  19: "Revision (lower)" unused input active-high 
            line  20: "J2 Header Pin 7" unused input active-high 
            line  21:      unnamed       unused   input  active-high 
            line  22: "J2 Header Pin 12" unused input active-high 
            line  23: "J2 Header Pin 11" unused input active-high 
            line  24:      unnamed       unused   input  active-high 
            line  25:      unnamed       unused   input  active-high 
            line  26:      unnamed       unused   input  active-high 
            line  27: "TFLASH_VDD_EN" "regulator-tflash_vdd" output active-high [used]
            line  28:      unnamed       unused   input  active-high 
            line  29:      unnamed       unused   input  active-high 
            line  30: "VCCK_PWM (PWM_C)" unused input active-high 
            line  31:   "I2CA_SDA"       unused   input  active-high 
            line  32:   "I2CA_SCL"       unused   input  active-high 
            line  33:   "I2CB_SDA"       unused   input  active-high 
            line  34:   "I2CB_SCL"       unused   input  active-high 
            line  35: "VDDEE_PWM (PWM_D)" unused input active-high 
            line  36:      unnamed       unused   input  active-high 
            line  37:   "HDMI_HPD"       unused   input  active-high 
            line  38: "HDMI_I2C_SDA" unused input active-high 
            line  39: "HDMI_I2C_SCL" unused input active-high 
            line  40: "ETH_PHY_INTR" unused input active-high 
            line  41: "ETH_PHY_NRST" "PHY reset" output active-low [used]
            line  42:   "ETH_TXD1"       unused   input  active-high 
            line  43:   "ETH_TXD0"       unused   input  active-high 
            line  44:   "ETH_TXD3"       unused   input  active-high 
            line  45:   "ETH_TXD2"       unused   input  active-high 
            line  46: "ETH_RGMII_TX_CLK" unused input active-high 
            line  47: "SD_DATA1 (SDB_D1)" unused input active-high 
            line  48: "SD_DATA0 (SDB_D0)" unused input active-high 
            line  49:     "SD_CLK"       unused   input  active-high 
            line  50:     "SD_CMD"       unused   input  active-high 
            line  51: "SD_DATA3 (SDB_D3)" unused input active-high 
            line  52: "SD_DATA2 (SDB_D2)" unused input active-high 
            line  53: "SD_CDN (SD_DET_N)" "cd" input active-low [used]
            line  54: "SDC_D0 (EMMC)" unused output active-high 
            line  55: "SDC_D1 (EMMC)" unused output active-high 
            line  56: "SDC_D2 (EMMC)" unused output active-high 
            line  57: "SDC_D3 (EMMC)" unused output active-high 
            line  58: "SDC_D4 (EMMC)" unused output active-high 
            line  59: "SDC_D5 (EMMC)" unused output active-high 
            line  60: "SDC_D6 (EMMC)" unused output active-high 
            line  61: "SDC_D7 (EMMC)" unused output active-high 
            line  62: "SDC_CLK (EMMC)" unused output active-high 
            line  63: "SDC_RSTn (EMMC)" "reset" output active-low [used]
            line  64: "SDC_CMD (EMMC)" unused output active-high 
            line  65:   "BOOT_SEL"       unused   input  active-high 
            line  66:      unnamed       unused   input  active-high 
            line  67:      unnamed       unused   input  active-high 
            line  68:      unnamed       unused   input  active-high 
            line  69:      unnamed       unused   input  active-high 
            line  70:      unnamed       unused  output  active-high 
            line  71:      unnamed       unused  output  active-high 
            line  72:      unnamed       unused   input  active-high 
            line  73:   "ETH_RXD1"       unused   input  active-high 
            line  74:   "ETH_RXD0"       unused   input  active-high 
            line  75:  "ETH_RX_DV"       unused   input  active-high 
            line  76: "RGMII_RX_CLK" unused input active-high 
            line  77:   "ETH_RXD3"       unused   input  active-high 
            line  78:   "ETH_RXD2"       unused   input  active-high 
            line  79:   "ETH_TXEN"       unused   input  active-high 
            line  80: "ETH_PHY_REF_CLK_25MOUT" unused input active-high 
            line  81:    "ETH_MDC"       unused   input  active-high 
            line  82:   "ETH_MDIO"       unused   input  active-high 
        gpiochip1 - 16 lines:
            line   0:    "UART TX"       unused   input  active-high 
            line   1:    "UART RX"       unused   input  active-high 
            line   2:      unnamed       unused  output  active-high 
            line   3: "TF_3V3N_1V8_EN" "TF_IO" output active-high [used]
            line   4: "USB_HUB_RST_N" "usb-hub-reset" output active-high [used]
            line   5: "USB_OTG_PWREN" unused input active-high 
            line   6: "J7 Header Pin 2" unused input active-high 
            line   7:      "IR_IN"       unused   input  active-high 
            line   8: "J7 Header Pin 4" unused input active-high 
            line   9: "J7 Header Pin 6" unused input active-high 
            line  10: "J7 Header Pin 5" unused input active-high 
            line  11: "J7 Header Pin 7" unused input active-high 
            line  12:   "HDMI_CEC"       unused   input  active-high 
            line  13:    "SYS_LED" "BugScaner:blue:alive" output active-low [used]
            line  14:      unnamed       unused  output  active-high 
            line  15:      unnamed       unused  output  active-high
        ```
    === "sysfs"
        ```
        gpiochip1: GPIOs 413-428, parent: platform/c8100084.pinctrl, aobus-banks:
        gpio-413 (UART TX             )
        gpio-414 (UART RX             )
        gpio-415 (                    )
        gpio-416 (TF_3V3N_1V8_EN      |TF_IO               ) out hi 
        gpio-417 (USB_HUB_RST_N       |usb-hub-reset       ) out lo 
        gpio-418 (USB_OTG_PWREN       )
        gpio-419 (J7 Header Pin 2     )
        gpio-420 (IR_IN               )
        gpio-421 (J7 Header Pin 4     )
        gpio-422 (J7 Header Pin 6     )
        gpio-423 (J7 Header Pin 5     )
        gpio-424 (J7 Header Pin 7     )
        gpio-425 (HDMI_CEC            )
        gpio-426 (SYS_LED             |BugScaner:blue:alive) out hi ACTIVE LOW
        gpio-427 (                    )
        gpio-428 (                    )

        gpiochip0: GPIOs 429-511, parent: platform/c1109880.pinctrl, cbus-banks:
        gpio-429 (J2 Header Pin 35    )
        gpio-430 (J2 Header Pin 36    )
        gpio-431 (J2 Header Pin 32    )
        gpio-432 (J2 Header Pin 31    )
        gpio-433 (J2 Header Pin 29    )
        gpio-434 (J2 Header Pin 18    )
        gpio-435 (J2 Header Pin 22    )
        gpio-436 (J2 Header Pin 16    )
        gpio-437 (J2 Header Pin 23    )
        gpio-438 (J2 Header Pin 21    )
        gpio-439 (J2 Header Pin 19    )
        gpio-440 (J2 Header Pin 33    )
        gpio-441 (J2 Header Pin 8     )
        gpio-442 (J2 Header Pin 10    )
        gpio-443 (J2 Header Pin 15    )
        gpio-444 (J2 Header Pin 13    )
        gpio-445 (J2 Header Pin 24    )
        gpio-446 (J2 Header Pin 26    )
        gpio-447 (Revision (upper)    )
        gpio-448 (Revision (lower)    )
        gpio-449 (J2 Header Pin 7     )
        gpio-450 (                    )
        gpio-451 (J2 Header Pin 12    )
        gpio-452 (J2 Header Pin 11    )
        gpio-453 (                    )
        gpio-454 (                    )
        gpio-455 (                    )
        gpio-456 (TFLASH_VDD_EN       |regulator-tflash_vdd) out lo 
        gpio-457 (                    )
        gpio-458 (                    )
        gpio-459 (VCCK_PWM (PWM_C)    )
        gpio-460 (I2CA_SDA            )
        gpio-461 (I2CA_SCL            )
        gpio-462 (I2CB_SDA            )
        gpio-463 (I2CB_SCL            )
        gpio-464 (VDDEE_PWM (PWM_D)   )
        gpio-465 (                    )
        gpio-466 (HDMI_HPD            )
        gpio-467 (HDMI_I2C_SDA        )
        gpio-468 (HDMI_I2C_SCL        )
        gpio-469 (ETH_PHY_INTR        )
        gpio-470 (ETH_PHY_NRST        |PHY reset           ) out hi ACTIVE LOW
        gpio-471 (ETH_TXD1            )
        gpio-472 (ETH_TXD0            )
        gpio-473 (ETH_TXD3            )
        gpio-474 (ETH_TXD2            )
        gpio-475 (ETH_RGMII_TX_CLK    )
        gpio-476 (SD_DATA1 (SDB_D1)   )
        gpio-477 (SD_DATA0 (SDB_D0)   )
        gpio-478 (SD_CLK              )
        gpio-479 (SD_CMD              )
        gpio-480 (SD_DATA3 (SDB_D3)   )
        gpio-481 (SD_DATA2 (SDB_D2)   )
        gpio-482 (SD_CDN (SD_DET_N)   |cd                  ) in  hi ACTIVE LOW
        gpio-483 (SDC_D0 (EMMC)       )
        gpio-484 (SDC_D1 (EMMC)       )
        gpio-485 (SDC_D2 (EMMC)       )
        gpio-486 (SDC_D3 (EMMC)       )
        gpio-487 (SDC_D4 (EMMC)       )
        gpio-488 (SDC_D5 (EMMC)       )
        gpio-489 (SDC_D6 (EMMC)       )
        gpio-490 (SDC_D7 (EMMC)       )
        gpio-491 (SDC_CLK (EMMC)      )
        gpio-492 (SDC_RSTn (EMMC)     |reset               ) out hi ACTIVE LOW
        gpio-493 (SDC_CMD (EMMC)      )
        gpio-494 (BOOT_SEL            )
        gpio-495 (                    )
        gpio-496 (                    )
        gpio-497 (                    )
        gpio-498 (                    )
        gpio-499 (                    )
        gpio-500 (                    )
        gpio-501 (                    )
        gpio-502 (ETH_RXD1            )
        gpio-503 (ETH_RXD0            )
        gpio-504 (ETH_RX_DV           )
        gpio-505 (RGMII_RX_CLK        )
        gpio-506 (ETH_RXD3            )
        gpio-507 (ETH_RXD2            )
        gpio-508 (ETH_TXEN            )
        gpio-509 (ETH_PHY_REF_CLK_25MO)
        gpio-510 (ETH_MDC             )
        gpio-511 (ETH_MDIO            )
        ```
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

??? tip "代码内容"
    === "C"

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

    === "Python3"

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