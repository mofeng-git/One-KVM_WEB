# OneCloud Kit Guide

!!! warning "Note"
    This page documents an early One-KVM kit sold by the author and is archived. Content is no longer updated.

### Hardware

![ae7bc732-0dc7-42a0-84fa-56f11c33d453](../img/ae7bc732-0dc7-42a0-84fa-56f11c33d453.png)

![image-20240609231232943](../img/image-20240609231232943.png)

### Connections

Insert the USB HDMI capture card into the USB port near the Ethernet jack. Connect HDMI to the capture card, and the dual-headed USB cable to the USB port next to HDMI. Plug in Ethernet and power.

On the target machine, connect HDMI and the dual-headed USB cable to the corresponding ports.

!!! warning "Reminder"
    Reversing USB connections will break PiKVM remote control features.

!!! tip
    Some low-power targets may draw power via the dual-headed USB cable and enter a bad state before external power is applied. If so, cut the red 5V wire inside the dual-headed USB cable.

!!! tip
    Initial WEB/VNC: admin/admin. root is set by users; if unset, try 1234.<br>ssh: 22<br>web: 80, 443<br>vnc: 5900<br>janus ws (default off): 5009

!!! tip
    Troubleshooting:<br>No Signal — check cabling;<br>Black screen or color bars — verify HDMI input;<br+    BIOS abnormal — enable CSM in BIOS;<br>Mouse offset/range — switch to relative mode in the top-right menu;<br>Intermittent black screen after refresh — try Firefox;<br>If unresolved, reboot OneCloud; if still broken, open an issue or ask in the group.


### MSD

Mass Storage Drive allows remote uploads and image mounting. CD-ROM images are limited to 2.2G by Linux; FLASH has no limit.

!!! warning
    Do not use Disconnect when the dual-headed USB cable is unplugged from the target or the target is powered off, or the kernel will continually log errors and MSD will remain unavailable until OTG recovers.


### ATX Power

To use ATX power control, connect the power switch cable (dark wire to pin 9 GND, light wire to power pin; color pairs like black/white, brown/red, orange/yellow represent negative/positive). Extension cables are not color-coded.

![img](../img/1717946862304-33.png)

![img](../img/1717946858221-30.jpeg)


