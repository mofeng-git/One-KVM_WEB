### 鼠标模式

One-KVM 支持两种鼠标定位模式：绝对定位和相对定位。

#### 绝对定位模式

!!! note "默认模式"
    绝对定位模式（Absolute Mode）是默认设置，它：

    - 直接传输精确的光标坐标 (X,Y)
    - 类似触摸屏和数位板的工作方式
    - 对用户和软件来说最方便
    - 部分 BIOS/UEFI 可能不支持

#### 相对定位模式

!!! info "相对模式"
    相对定位模式（Relative Mode）：

    - 只传输相对于当前位置的偏移量 (dX,dY)
    - 类似普通鼠标的工作方式
    - 点击视频窗口时浏览器会独占鼠标
    - 按 ESC 键可释放鼠标控制

#### 配置方法

**双模式支持（推荐）**

在 `/etc/kvmd/override.yaml` 中添加：
```yaml
kvmd:
    hid:
        mouse_alt:
            device: /dev/kvmd-hid-mouse-alt
```

配置后可在系统菜单中随时切换鼠标模式。

**仅使用相对模式**

在 `/etc/kvmd/override.yaml` 中添加：
```yaml
kvmd:
    hid:
        mouse:
            absolute: false
```

如果 BIOS/UEFI 仍无法识别鼠标，可以禁用水平滚动以提高兼容性：
```yaml
kvmd:
    hid:
        mouse:
            absolute: false
            horizontal_wheel: false
```

!!! warning "注意事项"

    - 相对模式会产生大量事件，可能影响网络传输
    - 建议启用"压缩鼠标移动"功能（System -> Squash mouse moves）
    - 相对模式暂不支持 VNC 和移动端浏览器
    - 修改配置后需要重启 kvmd 服务：`systemctl restart kvmd`

虚拟鼠标使用相对模式时会产生大量事件，这些事件在网络上的传输速度可能很慢，或者使得 BIOS/UEFI 驱动程序感知速度很慢。为解决这一问题，程序使用矢量和对鼠标事件进行了优化。要激活这些优化，可以在菜单 "系统"->"Squash mouse moves"（压制鼠标移动）中启用该模式。如果遇到鼠标加速问题，可以尝试禁用。这是目前比较好的折中方案。

![PixPin_2024-06-30_19-40-12](../img/PixPin_2024-06-30_19-40-12.png)

#### Windows 98 兼容性

!!! tip "Windows 98 修复"
    由于旧版驱动问题，Windows 98 下绝对定位模式可能只能在屏幕左上角四分之一区域移动。
    
    解决方案：
    ```yaml
    kvmd:
        hid:
            mouse:
                absolute_win98_fix: true
            mouse_alt:
                device: /dev/kvmd-hid-mouse-alt
    ```
    配置后，系统菜单会出现 Abs-Win98 选项。

此外， VNC 服务目前还不支持虚拟鼠标的相对模式，原因是推荐的客户端都不支持 QEMU 指针运动变化扩展，此外移动浏览器也不支持虚拟鼠标的相对模式。