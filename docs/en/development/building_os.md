You can build integrated images and Docker images using the scripts provided by this project.

### Build integrated images

To simplify the build process and improve efficiency, this project uses a base system image plus chroot installation scripts to build images.

After cloning the project, prepare the resource directory tree (below), then modify variables `SRCPATH` (resource folder) and `OUTPUTDIR` (image output folder) in `build/build_img.sh` according to your storage layout.

The current script supports building integrated images for chainedbox, cumebox2, onecloud, and vm. Example:

```bash
# Build the One-KVM integrated image for OneCloud
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

### Build Docker image

Modify the `run-build-release` section in the Makefile to set the Docker image output location as needed.

One-KVM Docker image build example:

```
# Build image
sudo make run-build-release
```


