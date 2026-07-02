Changelog

(If you have new feature requests or bug reports, reach out via GitHub Issues or the QQ group.)

**v0.2.3**

- Fixed CH9329 health-check and switching errors
- Fixed deb package dependencies for Debian 13 installation compatibility
- Corrected the iConfiguration descriptor string
- Added the frp remote access extension
- Added Linux absolute mouse compatibility mode
- Added CH9329 descriptor settings
- Added initial VNC support
- Added initial Computer Use Agent support
- Refined the frontend UI
- Added build acceleration support for China network environments

**v0.2.2**

- Fixed Amlogic video device probing to avoid crashes caused by kernel defects
- Fixed RustDesk mouse/keyboard input issues and improved relay server inference
- Fixed RTSP and RustDesk extension start/stop issues
- Improved the online upgrade experience
- Updated several parameter descriptions
- Added initial Android platform support for rooted devices

**v0.2.1**

- Fixed settings page scrolling and HID relay detection
- Fixed OTG reconcile being triggered accidentally when saving CH9329 configuration
- Fixed the MSD status card i18n key
- Fixed OTG endpoint budget calculation and validation
- Improved menu-based loading and error prompts on the Settings page
- Added Redfish service support
- Added initial Windows runtime support

**v0.2.0**

- Fixed WebRTC connection failures after configuration changes
- Fixed intermittent audio stutter in some scenarios
- Improved RK628D CSI capture adaptation
- Improved parts of the web UI styling
- Added automatic recovery for lost audio/video devices
- Added USB device reset support
- Added clearer error toast messages
- Refactored responses to synchronous requests for a more natural interaction flow
- Removed redundant code and comments

**v0.1.9**

- Fixed image list scrollbar behavior
- Improved RTSP compatibility with VLC media player
- Fixed ATX serial relay shared device not working
- Fixed IPv6 URL concatenation on the settings page
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
