### frp 端口映射

```
#frp 一键安装脚本
wget https://raw.githubusercontent.com/stilleshan/frpc/master/frpc_linux_install.sh && chmod +x frpc_linux_install.sh && ./frpc_linux_install.sh

nano /usr/local/frp/frpc.toml
# 修改 frpc.toml 填入你 frp 服务商提供的配置文件
sudo systemctl restart frpc
# 重启 frpc 服务即可生效
```

![image-20240630104629256](./img/image-20240630104629256.png)

