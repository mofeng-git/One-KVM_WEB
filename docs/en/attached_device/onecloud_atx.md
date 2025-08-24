### OneCloud GPIO Pinout

The OneCloud board exposes multiple GPIO headers for functions such as power control. The numbering for the Wi-Fi pad starts at the bottom-left corner and increases counterclockwise.

![Wi-Fi pad diagram](../img/oneclou_gpio_list.png)

#### GPIO mapping

Below is the mapping between available GPIOs and pads:

```
GPIO-430  Pad 19  default: input
GPIO-431  Pad 14  default: input
GPIO-432  Pad 15  default: input
GPIO-433  Pad 27  default: input
GPIO-434  Pad 25  default: input
GPIO-435  Pad 28  default: input
GPIO-436  Pad 26  default: input
GPIO-437  Pad 17  default: input
GPIO-438  Pad 16  default: input
GPIO-440  Pad 12  default: input
GPIO-441  Pad 43  default: input
GPIO-442  Pad 42  default: input
GPIO-444  Pad 44  default: input
GPIO-445  Pad 34  default: input
GPIO-446  Pad 13  default: input
```

#### Example

Using pad 26 as an example to determine the corresponding GPIO configuration:

1. From the physical position, pad 26 corresponds to sysfs gpio-436

    - Note: on Linux kernel >= 6.x, add an offset of 91, so it becomes gpio-527

2. The software label "J2 Header Pin 16" maps to gpiochip0 line 7 in gpioinfo

3. Control this GPIO in `/etc/kvmd/custom_atx/gpio.sh` with:

```bash
gpioset -m time -s 1 gpiochip0 7=0
gpioset gpiochip0 7=1
```

### Direct GPIO wiring

!!! warning "Notes"

    - May not be suitable for non-standard ATX power devices
    - For Huanan X99-F8 and K9-ETH boards:
        - Connect GPIO to power-on jumper pin 7, and GND to pin 9 (not the usual 5/7). Incorrect wiring may prevent the board from powering on or break the RST button

This solution applies to both old and new OneCloud boards, using the GPIO reserved for the IR interface to physically control power on/off:

1. Requires only one GPIO group (3.3V level)
2. Solder two wires to the IR module reserved interface:

    - GPIO-420 → power-on jumper positive
    - GND → power-on jumper negative

![Wiring 1](../img/1717947165712-59.jpeg)
![Wiring 2](../img/1717947165712-60.jpeg)
![Wiring position](../img/1717947165712-62.png)

### Optocoupler isolation

For improved safety, you can use an optocoupler isolation board:

![Optocoupler board](../img/1717947165712-63.png)
![Real wiring](../img/1717947165713-64.jpeg)


