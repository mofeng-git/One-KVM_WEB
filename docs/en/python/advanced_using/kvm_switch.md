**Hotkey Switching**

Hardware requirement: a KVM switch that supports hotkey control. Example: AIMOS AM-KM202.

![3d6d01ebc3ded3d9c73ccd7380b645f6](../../img/3d6d01ebc3ded3d9c73ccd7380b645f6.png)

Connect the hardware as shown. Use hotkeys (virtual keyboard shortcuts) from the web UI to switch video and USB control, enabling one-to-many control.

![ED52F2D5C9CDC83546E937804F893C5C](../../img/ED52F2D5C9CDC83546E937804F893C5C.png)

Demo video: ![type:video](../../video/kvm_x264.mp4)

**GPIO Switching**

!!! warning
    This method is only tested on OneCloud and is for reference only.

Use OneCloud GPIO to control the KVM switch and enable one-to-many control from One-KVM.

Hardware requirement: a KVM switch that supports lr (audio/IR) control. Connect via an audio cable.

Brief method: strip the audio cable and measure the voltage. Connect the high-level wire to OneCloud GPIO-420. Use the ATX power menu in the web UI to toggle GPIO-420, which triggers the KVM switch and enables one-to-many control.

![img](../../img/1717947165713-65.png)