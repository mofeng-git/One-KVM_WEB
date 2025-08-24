### Driver Preparation

In Synology DSM: Control Panel -> Terminal & SNMP -> Terminal, enable SSH and connect via SSH.

![image-20240926215507373](../img/image-20240926215507373.png)

Follow the guide [Compile extra kernel drivers for Synology NAS](synology_ko.md) to add required drivers. If you skip this step, you cannot proceed.

Use `ls /dev | grep -E "video|ttyUSB"`. If entries are present, you are ready. You can then disable SSH in the same Control Panel page.

![image-20240926215520107](../img/image-20240926215520107.png)

### Docker Deployment

!!! warning "Note"
    Virtual USB devices such as MSD and USB Ethernet are only available in OTG device mode. These features are NOT supported with CH9329 HID.

Open Container Manager, create a new project. After setting the name and path, create a docker-compose.yml and paste the following, then Next. You can skip changing Web Portal settings. Finish and wait for the container to start.

After the container starts, visit https://NASIP:4430. Default credentials are `admin/admin`. For more environment variables, see [Docker deployment](docker_install.md).

```yaml
version: '3.7'
services:
    kvmd:
        image: registry.cn-hangzhou.aliyuncs.com/silentwind/kvmd
        ports:
        - "8080:8080"
        - "4430:4430"
        - "5900:5900"
        - "623:623"
        devices:
        - "/dev/video0:/dev/video0"
        - "/dev/ttyUSB0:/dev/ttyUSB0"
```

![image-20240926215530277](../img/image-20240926215530277.png)

![image-20240926215538229](../img/image-20240926215538229.png)

![image-20240926215545004](../img/image-20240926215545004.png)

![image-20240926215551767](../img/image-20240926215551767.png)

![image-20240926215558542](../img/image-20240926215558542.png)

![image-20240926215604413](../img/image-20240926215604413.png)

**Result**

![image-20240926215616652](../img/image-20240926215616652.png)


