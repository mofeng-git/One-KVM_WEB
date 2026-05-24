### Introduction

Synology NAS is Linux-based but customized for NAS usage, and may lack kernel modules needed for other applications. This guide explains how to compile kernel modules for Synology.

First, identify the modules you need. For running One-KVM in Docker, you need USB capture card and USB serial support (UVC and CH340). Synology lacks these drivers by default, so you must compile them. The screenshot below shows the expected result, with drivers loaded and device paths present.

![image-20240926215520107](../../img/image-20240926215520107.png)

### Notes

Synology open source download site: [Synology Archive Download Site - Index of /download](https://archive.synology.cn/download)

You can download most Synology source code there. To compile kernel modules, you only need the Synology toolchain and kernel source. Download the files that match your NAS model and DSM version.

Enable SSH and run `uname -a` to get kernel info: `Linux MofengNAS 4.4.302+ #72803 SMP Mon Aug 19 19:59:09 CST 2024 x86_64 GNU/Linux synology_apollolake_218+`. In Control Panel -> Info Center you can see DSM version (e.g., `DSM 7.2.2-72803`). This info is required later.

![image-20240926215723271](../../img/image-20240926215723271.png)

Download the Linux kernel source and toolchain based on your model and DSM version. Kernel sources are under `ToolChain/Synology NAS GPL Source/DSM version`, toolchains under `ToolChain/toolchain/DSM version`. The screenshots and commands below match the author's NAS; adjust them for your model.

![image-20240926215728335](../../img/image-20240926215728335.png)

![image-20240926215733078](../../img/image-20240926215733078.png)

```bash
# Download files
wget https://global.synologydownload.com/download/ToolChain/Synology%20NAS%20GPL%20Source/7.2-64570/apollolake/linux-4.4.x.txz
wget https://global.synologydownload.com/download/ToolChain/toolchain/7.2-72746/Intel%20x86%20Linux%204.4.180%20%28Apollolake%29/apollolake-gcc1220_glibc236_x86_64-GPL.txz

# Extract files
tar xJvf apollolake-gcc1220_glibc236_x86_64-GPL.txz
tar xJvf linux-4.4.x.txz
```

### Build

**Enable module options**

We recommend compiling modules on Ubuntu. Building directly on Synology is difficult due to missing dependencies. This guide uses WSL2.

Enter the kernel source directory `linux-4.4.x`, copy the model-specific config from `synoconfigs` (required), then enable options as needed. In the menu, press `/` to search options and view dependencies.

```bash
cd linux-4.4.x/
ls synoconfigs
cp synoconfigs/apollolake .config
make menuconfig
```

![image-20240926215741546](../../img/image-20240926215741546.png)

![image-20240926215746435](../../img/image-20240926215746435.png)

![image-20240926215750459](../../img/image-20240926215750459.png)

Enable the required dependencies shown in the images, then save and exit.

![image-20240926215755153](../../img/image-20240926215755153.png)

![image-20240926215801175](../../img/image-20240926215801175.png)

![image-20240926215809771](../../img/image-20240926215809771.png)

**Compile**

**Note**: You cannot compile modules yet. There is a pitfall: the driver `vermagic` must match the kernel. The default compiled driver is missing a `+` sign and will fail to load, as shown below. After compiling, you can validate with `sudo insmod <file>.ko` and `sudo dmesg`.

![image-20240926215814960](../../img/image-20240926215814960.png)

Edit the `Makefile` header to match your Synology kernel version so the driver `vermagic` is correct.

![image-20240926215820916](../../img/image-20240926215820916.png)

Now compile. Use the Synology `gcc` toolchain, not the system `gcc`. Install any missing dependencies if needed.

```bash
# Prepare (direct compile will fail)
make clean
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- prepare
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- scripts

# Compile .ko files
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- -C . M=drivers/media/v4l2-core modules
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- -C . M=drivers/media/usb/uvc modules
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- -C . M=drivers/usb/serial modules
```

After compiling, you can find the following files. Verify them, then copy them to `/lib/modules` on the Synology NAS and run `sudo depmod -a` to refresh. Manually load the drivers or reboot. You should then see the USB devices recognized.

```bash
videodev.ko
videobuf2-core.ko
v4l2-common.ko
videobuf2-v4l2.ko
videobuf2-memops.ko
videobuf2-vmalloc.ko
uvcvideo.ko
ch341.ko
```

![image-20240926215829154](../../img/image-20240926215829154.png)

### References

[Build Synology NAS dev environment and compile drivers - VirCloud](https://vircloud.net/exp/dsm-driver.html)