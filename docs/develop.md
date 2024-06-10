这里记录了一些有用的东西。

### 玩客云 UBoot 备份

```bash
#跳过 MBR 分区表，备份玩客云 UBoot 内容并压缩
gzip -dc Boot_SkipUSBBurning.gz | dd of=/dev/mmcblk1 bs=512 seek=1 count=32767
#恢复备份的 UBoot 内容
dd if=/dev/mmcblk1 bs=512 skip=1 count=32767  | gzip > Boot_SkipUSBBurning.gz
```

