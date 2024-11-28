**WOL**（Wake On LAN），即网络唤醒，在被控机支持的情况下（部分机器可能默认关闭，需要手动开启），可以通过网络唤醒设备开机，实现机器开停自由。更详细的介绍和配置可查阅官方教程。

### 启用WOL网络唤醒

??? tip "Docker 部署 WOL 使用说明"

    在使用 Docker 部署时，需要指定网络类型为 `host`，否则可能无法使用 WOL 功能。如使用命令行可以将 `-p 8080:8080 -p 4430:4430 -p 5900:5900 -p 623:623` 替换为 `--network host`。<br><br>
    在使用多网口设备（如 Openwrt 主路由器） Docker 部署时，需要在配置文件中指定被控机所在 IP 段（如 192.168.100.255 ），否则可能由于多网口优先级不同默认发往 255.255.255.255 （即局域网广播）的 WOL 数据包被路由至错误网卡，导致 WOL 功能没有效果。

两种 WOL 配置方式，选择其一。

获取被控机网卡的MAC地址并记录下来（格式为linux小写），然后编辑 /etc/kvmd/override.yaml 添加如下内容，完成后重启服务 `systemctl restart kvmd` （编辑文件时请注意格式缩进，否则会导致服务启动失败）。

**内置 WOL 配置方式**

如果在这里配置的 WOL，网页操作界面将会在系统菜单下边的工具一栏。

```yaml
    wol:
        mac: 54:ab:3a:02:73:4a
        #ip: 255.255.255.255
        #port: 9
```

**自定义 GPIO 驱动方式**

如果在这里配置的 WOL，网页操作界面将会在自定义菜单下边。



```yaml
    gpio:
        drivers:
            wol_server1:
                type: wol
                mac: 2c:56:dc:db:7c:1e
        scheme:
            wol_server1:
                driver: wol_server1
                pin: 0
                mode: output
                switch: false
        view:
            table:
                - ["#设备名称", "wol_server1|网络唤醒"]
```

![img](./img/1717947165712-57.png)

