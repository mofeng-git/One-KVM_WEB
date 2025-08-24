### Preface

Synology DSM is Linux-based but customized for NAS usage and may lack certain kernel modules needed for other applications. This article explains how to compile kernel modules for Synology.

First, identify which modules you need. To deploy One-KVM in Docker on NAS, we need UVC (USB video) and CH340 (USB serial) drivers so DSM can recognize the USB capture card and USB serial adapter. The image below shows the final result: the driver stack loads and device nodes appear.

![image-20240926215520107](../img/image-20240926215520107.png)

### Info

Synology open-source archive: [Synology Archive Download Site - Index of /download](https://archive.synology.cn/download)

You can download most sources here (kudos to Synology). To compile modules, you only need the toolchain and kernel source. Download the versions matching your model and DSM version.

Enable SSH and run `uname -a` to get kernel info: `Linux MofengNAS 4.4.302+ #72803 SMP Mon Aug 19 19:59:09 CST 2024 x86_64 GNU/Linux synology_apollolake_218+`. In DSM Control Panel -> Info Center, note the DSM version, e.g., `DSM 7.2.2-72803`. This is important.

![image-20240926215723271](../img/image-20240926215723271.png)

Then download the matching Linux kernel source and toolchain. Kernel sources are under `ToolChain/Synology NAS GPL Source/<DSM version>`, toolchains under `ToolChain/toolchain/<DSM version>`. The following screenshots and commands are for the author's NAS; adjust for your system.

![image-20240926215728335](../img/image-20240926215728335.png)

![image-20240926215733078](../img/image-20240926215733078.png)

```bash
# Download
wget https://global.synologydownload.com/download/ToolChain/Synology%20NAS%20GPL%20Source/7.2-64570/apollolake/linux-4.4.x.txz
wget https://global.synologydownload.com/download/ToolChain/toolchain/7.2-72746/Intel%20x86%20Linux%204.4.180%20%28Apollolake%29/apollolake-gcc1220_glibc236_x86_64-GPL.txz

# Extract
tar xJvf apollolake-gcc1220_glibc236_x86_64-GPL.txz
tar xJvf linux-4.4.x.txz
```

### Build

**Enable module options**

Use Ubuntu to build modules; compiling directly on DSM is cumbersome due to dependencies. Here we use WSL2.

In `linux-4.4.x`, copy the config for your model from `synoconfigs` (do not skip), then enable options in menuconfig. Use `/` to search dependencies.

```bash
cd linux-4.4.x/
ls synoconfigs
cp synoconfigs/apollolake .config
make menuconfig
```

![image-20240926215741546](../img/image-20240926215741546.png)

![image-20240926215746435](../img/image-20240926215746435.png)

![image-20240926215750459](../img/image-20240926215750459.png)

Enable the required options, save and exit.

![image-20240926215755153](../img/image-20240926215755153.png)

![image-20240926215801175](../img/image-20240926215801175.png)

![image-20240926215809771](../img/image-20240926215809771.png)

**Compile**

Important: the module `vermagic` must match the kernel. By default, the compiled module misses a trailing `+`, causing insmod to fail, as shown below. Later, verify modules with `sudo insmod <file>.ko` and `sudo dmesg`.

![image-20240926215814960](../img/image-20240926215814960.png)

Edit the top of the kernel `Makefile` to match the Synology kernel version so that `vermagic` matches.

![image-20240926215820916](../img/image-20240926215820916.png)

Now build using Synology's gcc toolchain (not the system gcc). Install missing deps as needed.

```bash
# Prep; building directly will fail
make clean
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- prepare
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- scripts

# Build ko modules
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- -C . M=drivers/media/v4l2-core modules
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- -C . M=drivers/media/usb/uvc modules
make -j4 CROSS_COMPILE=../x86_64-pc-linux-gnu/bin/x86_64-pc-linux-gnu- -C . M=drivers/usb/serial modules
```

You will get the following files. Copy them to `/lib/modules` on the NAS, run `sudo depmod -a`, and load drivers or reboot. The USB devices should be recognized.

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

![image-20240926215829154](../img/image-20240926215829154.png)

### References

[Set up a Synology DSM dev environment and compile drivers](https://vircloud.net/exp/dsm-driver.html)


