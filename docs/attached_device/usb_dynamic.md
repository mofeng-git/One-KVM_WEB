### 动态 USB 配置

One-KVM 通过模拟多个 USB 设备来实现基本功能：

- 键盘
- 鼠标（绝对定位）
- 鼠标（相对定位）
- 大容量存储
- 以太网/串口（可选）

在某些情况下，被控机的 BIOS/UEFI 可能无法同时识别单个 USB 端口上的所有模拟设备。此时可以使用 `kvmd-otgconf` 命令（需要 root 权限）来动态管理这些设备：

```bash
# 查看当前配置
root@onecloud:~# kvmd-otgconf
+ ecm.usb0  # 以太网
+ hid.usb0  # 键盘
+ hid.usb1  # 绝对定位鼠标
+ hid.usb2  # 相对定位鼠标

# 禁用/启用设备示例
root@onecloud:~# kvmd-otgconf --disable-function ecm.usb0  # 禁用以太网
root@onecloud:~# kvmd-otgconf --enable-function ecm.usb0   # 启用以太网
```

### 网页控制

你可以通过配置将 USB 设备控制集成到网页界面中。使用以下命令生成配置模板：

```yaml
root@onecloud:~# kvmd-otgconf --make-gpio-config
kvmd:
    gpio:
        drivers:
            otgconf:
                type: otgconf
        scheme:
            ecm.usb0:
                driver: otgconf
                mode: output
                pin: ecm.usb0
                pulse: false
            # ... 其他设备配置 ...
        view:
            table:
                - ['#以太网', '#ecm.usb0', ecm.usb0]
                - ['#键盘', '#hid.usb0', hid.usb0]
                - ['#绝对定位鼠标', '#hid.usb1', hid.usb1]
                - ['#相对定位鼠标', '#hid.usb2', hid.usb2]
```

将生成的配置添加到 `/etc/kvmd/override.yaml` 文件中即可在网页界面中控制各个 USB 设备的开关状态。

![USB设备控制界面](../img/PixPin_2024-06-30_20-34-03.png)