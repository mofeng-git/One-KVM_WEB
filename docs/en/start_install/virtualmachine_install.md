### Getting Started

The One-KVM VM bundle is a preinstalled virtual disk with One-KVM. Create a VM from this disk and pass through the USB devices to use One-KVM. This guide demonstrates VMware; VirtualBox is similar.

Required software: VMware or VirtualBox

Required peripherals: USB HDMI capture card, CH340+CH9329 USB combo cable

Minimum VM: 1 vCPU, 512 MB RAM

### VMware

#### Create a VM

Extract the disk first. In VMware Workstation Pro, File -> New Virtual Machine, choose Custom (Advanced), Next. Keep default compatibility, Next.

![image-20241014075436551](../img/image-20241014075436551.png)

![image-20241014075511403](../img/image-20241014075511403.png)

Choose "I will install the operating system later". Guest OS: Linux. Next. Name the VM and choose a location. Next.

![image-20241014075614989](../img/image-20241014075614989.png)

![image-20241014075706932](../img/image-20241014075706932.png)

![image-20241014080026120](../img/image-20241014080026120.png)

Choose CPU and memory as needed (min 1/512 MB). Network: choose as needed; Bridged is recommended. Keep default I/O controller and virtual disk type.

![image-20241014080059430](../img/image-20241014080059430.png)

![image-20241014080155408](../img/image-20241014080155408.png)

![image-20241014080303259](../img/image-20241014080303259.png)

![image-20241014080511381](../img/image-20241014080511381.png)

![image-20241014080711805](../img/image-20241014080711805.png)

Select "Use an existing virtual disk". Choose the extracted disk. Keep the disk format. Finish (do not start yet).

![image-20241014080750203](../img/image-20241014080750203.png)

![image-20241014081028890](../img/image-20241014081028890.png)

![image-20241014081122613](../img/image-20241014081122613.png)

#### Edit settings

In the VM home, Edit virtual machine settings. Set USB Controller -> USB compatibility to USB 3.1. In Options -> Advanced, set Firmware type to UEFI. Optionally enable "Disable side-channel mitigations for Hyper-V hosts" to reduce overhead.

![image-20241014081526077](../img/image-20241014081526077.png)

![image-20241014081825770](../img/image-20241014081825770.png)

#### Start the VM

Plug the USB HDMI capture card and CH340+CH9329 combo cable into the host. Start the VM and pass these two USB devices through to the VM.

![image-20241014082835074](../img/image-20241014082835074.png)


![image-20241014083337552](../img/image-20241014083332223.png)

#### Usage

Visit the VM IP in a browser. On first visit, trust the self-signed certificate. Default credentials: admin/admin.

![image-20241014083457986](../img/image-20241014083457986.png)

![image-20241014083933600](../img/image-20241014083933600.png)

![image-20241014084205934](../img/image-20241014084205934.png)

#### Others

If the VM in bridged mode gets no IP, the auto-bridging may have chosen the wrong NIC. Fix it in the Virtual Network Editor.

![image-20241014082706949](../img/image-20241014082706949.png)


