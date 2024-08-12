### CH9329 HID

**硬件**

可以使用 ch340+ch9329 一体的串口转 USB HID 线，市价大约20元。

![image-20240812203814747](./img/image-20240812203814747.png)

**示例**

到 /etc/kvmd/override.yaml 或 /etc/kvmd/main.yaml 替换添加如下配置内容：

```
kvmd:
    hid:
        type: ch9329
        device: /dev/ttyUSB0
        speed: 9600
        read_timeout: 0.3
```

