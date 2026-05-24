You can use the scripts in this project to build integrated images and Docker images.

### Build integrated images

To simplify and speed up builds, this project uses a base system image plus chroot install scripts.

After cloning the repo, prepare the resource directory tree (see below). Update `SRCPATH` (resource dir) and `OUTPUTDIR` (image output dir) in `build/build_img.sh` based on your storage layout.

The script currently supports chainedbox, cumebox2, onecloud, and vm builds. Example:

```bash
# Build OneCloud integrated image
sudo bash build/build_img.sh onecloud
```

Resource directory tree:
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

### Build Docker images

Edit the `run-build-release` section in the Makefile to set the Docker image output location.

Example:

```
# Build image
sudo make run-build-release
```