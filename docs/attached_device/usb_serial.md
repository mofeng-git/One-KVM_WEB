### USB 串口功能

USB 串口功能允许被控主机通过虚拟串口访问 One-KVM，或用于其他需要串行连接的场景。

!!! info "USB 设备限制说明"
    每个模拟的 USB 设备都会消耗有限的硬件资源（称为端点）。

#### 配置步骤

1. 编辑 `/etc/kvmd/override.yaml` 添加串口配置：
    ```yaml
    otg:
        devices:
            serial:
                enabled: true
    ```

2. 添加串口终端设备：
    ```bash
    sudo echo ttyGS0 >> /etc/securetty
    ```

3. 配置串口服务：
    ```bash
    # 创建配置目录
    sudo mkdir -p /etc/systemd/system/getty@ttyGS0.service.d

    # 编辑配置文件
    sudo nano /etc/systemd/system/getty@ttyGS0.service.d/override.conf
    ```

    添加以下内容：
    ```ini
    [Service]
    TTYReset=no
    TTYVHangup=no
    TTYVTDisallocate=no
    ```

4. 启用服务并重启：
    ```bash
    sudo systemctl enable getty@ttyGS0.service
    sudo reboot
    ```

#### 使用说明

重启后，被控主机可以通过虚拟串口访问 One-KVM。串口设备名称可能为：

- `/dev/ttyAMA0`
- `/dev/ttyACM0`

使用示例：
```bash
sudo screen /dev/ttyACM0 115200
```

![串口连接示例](../img/PixPin_2024-06-30_22-29-20.png)

