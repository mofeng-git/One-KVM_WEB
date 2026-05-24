# DEB 安装

本文介绍如何使用直接在 Debian/Ubuntu 系统上使用 deb 安装 One-KVM。

## 前提条件

- 系统要求：Debian 11+/Ubuntu 22+
- 硬件准备：启用 USB OTG 或插好 CH340+CH9329 HID 线（用于 HID 模拟），插好 USB HDMI 采集卡（或者已有其他视频采集设备）。

!!! tip "Debian 13（x86-64）补充依赖"
    若在 **Debian 13、x86-64** 上运行 One-KVM 时出现：

    `error while loading shared libraries: libmfx.so.1: cannot open shared object file: No such file or directory`

    说明缺少 `libmfx` 动态库。当前 Debian 13 官方源中暂无对应包，需手动安装旧版仓库中的 `libmfx1` deb，例如：

    1. 下载：[libmfx1_22.5.4-1_amd64.deb](http://ftp.cn.debian.org/debian/pool/main/i/intel-mediasdk/libmfx1_22.5.4-1_amd64.deb)
    2. 在 deb 所在目录执行：

    ```bash
    apt install ./libmfx1_22.5.4-1_amd64.deb
    ```

## 安装软件

下载适合你系统架构的 one-kvm deb 包到系统上，然后安装。

```bash
apt update
apt install ./one-kvm_0.x.x_arch.deb

```
### OTG 使用说明

如果你使用需要使用 OTG ，请确保系统开启 OTG 功能并使能了 OTG 端口。

执行 `ls /sys/class/udc` 命令返回为空说明你的设备没有 USB OTG 端口或没有开启设置 USB 端口为 OTG 模式，如果是后者可尝试修改设备树 dtb。

执行 `ls /sys/kernel/config` 命令返回的文件中如果没有 `usb_gadget` 可能是没有加载 `libcomposite` 内核模块，可以手动加载或在 `/etc/modprobe.d/` 目录下新建内核模块自动加载规则文件。手动加载命令为 `modprobe libcomposite`,需要在 IPKVM 程序启动之前加载。

最后一步就是使能 OTG 端口为 `device` 状态。如果设备树 dtb 中 USB OTG端口配置属性 `dr_mode` 为 `peripheral`,则开机后OTG 端口为 `device` 状态。但更常见的情况是设备树 dtb 中 USB OTG 端口配置属性 `dr_mode` 为 `otg`，需要手动使能。这个使能命令因不同 CPU 平台（全志、晶晨、瑞芯微等）而异，具体命令可能需要查看文档或网络上查找对应资料。确定有效后把命令可以放入 `/etc/rc.local` 开机自启脚本里面，便宜开机自动使能 OTG 端口。

实例：晶晨平台 OTG 使能命令

```bash
#查看当前 USB OTG 状态
cat /sys/devices/platform/soc/*/usb_role/*/role
#手动使能 OTG 端口
echo "device" > /sys/devices/platform/soc/*/usb_role/*/role
```

## 访问 Web 界面

打开浏览器访问 `http://<设备IP>:8080`

!!! tip "首次访问"
    首次访问时，系统会引导您完成初始配置，包括创建管理员账户。
