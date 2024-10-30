可以通过本项目提供的脚本进行整合包构建和 Docker 镜像构建。

### 构建整合包

为简化整合包建构难度、提升整合包构建效率，本项目使用基础系统镜像 + chroot 软件安装脚本的方式进行脚本构建。

在克隆完本项目之后，需要准备好资源文件夹目录树（如下），修改根据自身储存情况 build/build_img.sh 整合包构建脚本中的变量 SRCPATH （资源文件夹）和 OUTPUTDIR （镜像保存文件夹）。

当前脚本支持 chainedbox、cumebox2、onecloud、vm 的整合包构建，命令示例如下：

```bash
#构建玩客云 One-KVM 整合包
sudo bash build/build_img.sh onecloud
```

资源文件夹目录树:
```bash
mofeng@ubuntu:~/One-KVM$ tree /mnt/sda1/src
/mnt/sda1/src
|-- image
|   |-- chainedbox
|   |   |-- Armbian_24.11.0_rockchip_chainedbox_bookworm_6.1.112_server_2024.10.02.img
|   |   |-- Armbian_24.11.0_rockchip_chainedbox_bookworm_6.1.112_server_2024.10.02_add800m.img
|   |   `-- rk3328-l1pro-1296mhz-fix.dtb
|   |-- cumebox2
|   |   |-- Armbian_24.8.1_Khadas-vim1_bookworm_current_6.6.47_minimal.img
|   |   |-- config.json
|   |   |-- rc.local
|   |   |-- ssd
|   |   `-- v-fix.dtb
|   |-- onecloud
|   |   |-- AmlImg_v0.3.1_linux_amd64
|   |   |-- Armbian_by-SilentWind_24.5.0-trunk_Onecloud_bookworm_legacy_5.9.0-rc7_minimal.burn.img
|   |   `-- rc.local
|   `-- vm
|       `-- Armbian_24.8.1_Uefi-x86_bookworm_current_6.6.47_minimal_add1g.img
`-- tmp

7 directories, 12 files
```

### 构建 Docker 镜像

可根据实际情况修改 Makefile 文件 run-build-release 部分设置好 Docker 镜像保存位置。

One-KVM Docker 镜像构建示例：

```
#构建镜像
sudo make run-build-release
```