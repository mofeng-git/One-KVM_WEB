**Hotkey Switching**

Hardware requirements: A KVM switch that supports hotkey control. The example below uses AIMOS AM-KM202.

![3d6d01ebc3ded3d9c73ccd7380b645f6](../img/3d6d01ebc3ded3d9c73ccd7380b645f6.png)

Connect the hardware as shown. You can switch the video feed and USB control via hotkeys (virtual keyboard shortcuts) on the web page to achieve one-to-many control.

![ED52F2D5C9CDC83546E937804F893C5C](../img/ED52F2D5C9CDC83546E937804F893C5C.png)

Demo video: ![type:video](../video/kvm_x264.mp4)

**GPIO Switching**

!!! warning
    Tested only on OneCloud and provided for reference; not guaranteed to work in all cases.

Use OneCloud GPIO to control the KVM switch and implement one-to-many control in One-KVM.

Hardware requirements: A KVM switch that supports IR/audio jack control. Connect the audio cable.

Quick method: Strip the audio cable and measure the corresponding voltage. Connect the line with a high level to OneCloud GPIO-420. Then trigger a level change on GPIO-420 from the ATX Power Management menu on the web UI to control the KVM switch, thereby enabling one-to-many control from the One-KVM web UI.

![img](../img/1717947165713-65.png)


