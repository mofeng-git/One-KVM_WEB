# HDMI Loop-out

This feature outputs the USB capture card feed via the device's display interface.

### Usage

The latest package One-KVM_Armbian_by-SilentWind_for-Onecloud_24.6.18 includes this feature. Earlier versions do not (see installation below for manual setup). The `kvmd-display` service is disabled by default to avoid impacting other services. Enable it with:

```bash
# Uncomment "#forever: true" and apply
sudo nano /etc/kvmd/override.yaml
sudo systemctl restart kvmd
# Start kvmd-display
sudo systemctl start display
# Enable kvmd-display on boot
sudo systemctl enable kvmd-display
```

![image-20240622155709995](../../img/image-20240622155709995.png)

![frame-1](../../img/frame-1.png)

### Installation

```bash
# This feature is not installed by default. Run kvmd_display_install.sh to install it.
git clone --depth=1 https://github.com/mofeng-git/One-KVM.git
cd One-KVM
sudo bash kvmd_display_install.sh

# Stop kvmd-display
sudo systemctl stop kvmd-display
sudo systemctl disable kvmd-display
```