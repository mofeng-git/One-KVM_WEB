### Driver Preparation

In Synology Control Panel -> Terminal & SNMP -> Terminal, enable SSH, then connect with an SSH client.

![image-20240926215507373](../../img/image-20240926215507373.png)

Follow [Compile additional kernel drivers for Synology NAS](synology_ko.md) to add the required drivers. **If you skip this step, deployment will not work.**

Run `ls /dev | grep -E "video|ttyUSB"`. If you see device entries, the drivers are ready. After that, you can disable SSH in the same panel.

![image-20240926215520107](../../img/image-20240926215520107.png)

### Docker Deployment

!!! warning "Reminder"
    Virtual storage (MSD) and virtual USB devices are only available in OTG mode. **These virtual USB features are not supported when using CH9329 HID.**

Open the Synology Container Manager. In the left sidebar, choose New Project. Set the project name and path, then choose to create `docker-compose.yml`. Paste the content below, click Next, keep Web Portal settings unchanged, then click Finish and wait for the container to start.

After the container starts, access https://NASIP:4430. Default credentials are `admin` / `admin`. For more Docker environment variables, see [Docker deployment](docker_install.md).

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

![image-20240926215530277](../../img/image-20240926215530277.png)

![image-20240926215538229](../../img/image-20240926215538229.png)

![image-20240926215545004](../../img/image-20240926215545004.png)

![image-20240926215551767](../../img/image-20240926215551767.png)

![image-20240926215558542](../../img/image-20240926215558542.png)

![image-20240926215604413](../../img/image-20240926215604413.png)

**Final result**

![image-20240926215616652](../../img/image-20240926215616652.png)