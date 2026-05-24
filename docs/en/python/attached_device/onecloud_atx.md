### OneCloud GPIO Pin Reference

The OneCloud board exposes multiple GPIO pads for power control and other functions. The Wi-Fi pad numbering starts from the bottom-left and increases counter-clockwise.

![Wi-Fi pad diagram](../../img/oneclou_gpio_list.png)

#### GPIO Pin Mapping

Available GPIO pads:

```
GPIO-430  Pad 19  Default input
GPIO-431  Pad 14  Default input
GPIO-432  Pad 15  Default input
GPIO-433  Pad 27  Default input
GPIO-434  Pad 25  Default input
GPIO-435  Pad 28  Default input
GPIO-436  Pad 26  Default input
GPIO-437  Pad 17  Default input
GPIO-438  Pad 16  Default input
GPIO-440  Pad 12  Default input
GPIO-441  Pad 43  Default input
GPIO-442  Pad 42  Default input
GPIO-444  Pad 44  Default input
GPIO-445  Pad 34  Default input
GPIO-446  Pad 13  Default input
```

#### GPIO Example

Using pad 26 as an example to determine GPIO config:

1. Find pad 26 on the board. The sysfs GPIO number is gpio-436.

    - Note: Linux kernel 6.x and above require a +91 offset, so it becomes gpio-527.

2. Based on the software label "J2 Header Pin 16", the corresponding gpioinfo entry is gpiochip0 line7.

3. Use the following commands in `/etc/kvmd/custom_atx/gpio.sh` to control this GPIO:

```bash
gpioset -m time -s 1 gpiochip0 7=0
gpioset gpiochip0 7=1
```

### Direct GPIO Wiring

!!! warning "Notes"

    - This method may not work for non-standard ATX power management hardware.
    - For Huanan Jingo X99-F8 and K9-ETH boards:

        - GPIO must connect to power switch pin 7 and GND to pin 9 (not the usual 5/7). Incorrect wiring may prevent boot or break the reset button.

This method works for both old and new OneCloud versions, using GPIOs reserved by the IR header for power control:

1. Use one GPIO (3.3V)
2. Solder two wires to the IR header pads:

    - GPIO-420 to power switch positive
    - GND to power switch negative

![Wiring 1](../../img/1717947165712-59.jpeg)
![Wiring 2](../../img/1717947165712-60.jpeg)
![Wiring position](../../img/1717947165712-62.png)

### Optocoupler Isolation

For better safety, you can use an optocoupler isolation board:

![Optocoupler board](../../img/1717947165712-63.png)
![Real wiring](../../img/1717947165713-64.jpeg)