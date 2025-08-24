# HDMI Loop-out

This feature uses the device's own display interface to output the video captured by the USB capture card.

### Usage

The latest package One-KVM_Armbian_by-SilentWind_for-Onecloud_24.6.18 has this feature pre-installed. Older versions do not (you can install it manually; see the guide below). The `kvmd-display` service is disabled by default to avoid impacting other services. If needed, enable it manually:

```bash
# Uncomment the “#forever: true” option and apply
sudo nano /etc/kvmd/override.yaml
sudo systemctl restart kvmd
# Start kvmd-display
sudo systemctl start display
# Enable kvmd-display at boot
sudo systemctl enable kvmd-display
```

![image-20240622155709995](../img/image-20240622155709995.png)

![frame-1](../img/frame-1.png)

### Installation

```bash
# This feature is not installed by default; run kvmd_display_install.sh to enable it
git clone --depth=1 https://github.com/mofeng-git/One-KVM.git
cd One-KVM 
sudo bash kvmd_display_install.sh

# Stop the kvmd-display service
sudo systemctl stop kvmd-display
sudo systemctl disable kvmd-display
```


