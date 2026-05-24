Changelog

(If you have new feature requests or bug reports, reach out via GitHub Issues or the QQ group.)

**v0.1.9**

- Fixed image list scrollbar behavior (#238)
- Improved RTSP compatibility with VLC media player (#237)
- Fixed ATX serial relay shared device not working (#233)
- Fixed IPv6 URL concatenation on the settings page (#241)
- Improved CSI capture adaptation
- Improved audio capture
- Improved mobile UI
- Added web UI support for SSL certificate configuration
- Added CLI password change
- Miscellaneous fixes and polish

**v0.1.8**

- Added support for Rockchip native HDMI IN capture devices

**v0.1.7**

- Added keyboard LED state support for OTG HID and CH9329 HID
- Improved OTG HID and CH9329 HID connection status display
- Auto-load the `libcomposite` kernel module on startup
- Improved WebRTC session keep-alive and recovery when switching between Console and Settings
- On startup, detect and drop invalid first three MJPEG frames to reduce encoding failures
- Refined login page styling
- Improved OTG mode selection logic on the Settings page

**v0.1.6**

- Added hardware encoding support for FNOS (Feiniu NAS)
- Added ARM FNOS support
- Added a hardware encoding capability test page
- Fixed duplicate software encoder counter errors
- Fixed mouse position offset when video is fullscreen on the Console
- Fixed power status display in the frontend

**v0.1.5**

- Added support for USB serial relay protocols
- Migrated video capture to the `v4l2r` library, with initial support for CSI video input and
  V4L2 M2M hardware encoding acceleration
- Added RTSP video stream support and automatic encoder locking
- Added cross-device synchronization for WOL history
- Added online upgrade support in the web UI
- Added OTG environment self-check in the web UI
- Improved WebRTC connection speed and status display during connection setup
- Improved HID health checks and refined the placement and content of HID status information in the
  frontend
- Improved the display priority of USB serial devices
- Improved device platform display on the About page
- Fixed the RustDesk extension not using the relay server entered by the user
- Fixed key mapping issues in the on-screen keyboard
- Removed `ttyd` user credential support

**v0.1.4**

- Default to skipping Amlogic `/dev/video0` `vdec` probing unless the relevant environment variable
  is set, fixing hangs caused by a kernel bug

**v0.1.3**

- Fixed RustDesk extension frontend validation to auto-complete ports
- Centralized session invalidation handling in routing to avoid login page refresh loops
- Fixed Allwinner OTG low-endpoint handling
- Fixed unauthorized access to some resources and removed redundant Admin checks
- Fixed `/dev/videoX` non-video devices returning empty V4L2 data and hanging the main process
- Initial fix for mobile UI layout issues
- Fixed USB HID endpoint errors where mouse writes could block and stall server A/V threads
- Added auto-redirect when revisiting the guide page after setup finishes
- RustDesk extension now supports relative mouse mode and reports the device ID as Windows
- Added IPv4/IPv6 dual-stack access
- Introduced a unified config store and migrated Console/Settings read-write with current config
  auto-display

**v0.1.2**

- Reworked the audio/video architecture to improve RKMPP MJPEG -> H.264/H.265 encoding performance
  and fix dropped-frame mosaic artifacts
- Removed multi-user logic, kept single-user mode only, and added configurable single-session web
  access
- Removed the rollback behavior that provided a poor user experience and slightly adjusted frontend
  menu placement
- Added dynamic OTG USB device adjustment
- Fixed mDNS issues and made WebRTC video switching smoother

**v0.1.1**

- Fixed log storms caused by missing audio devices
- Optimized input format passthrough, improved MJPEG decoding, and added the RKMPP decode path
- Removed the built-in public server to keep the software independent and private
- Improved video switching logic for smoother switching; MJPEG is no longer grayed out
- Fixed MSD path issues, added web UI configuration for the MSD directory, and auto-hid MSD
  settings for the CH9329 backend
- Bundled `libx264`/`libx265` and switched the build environment to Debian 11 to improve
  compatibility
- Improved the build pipeline and added `.deb` package builds

**v0.1.0**

- Initial release
