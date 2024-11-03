
s905l3a One-KVM 通用包在中兴 B863AV3.2M 和 CM311-1a-CH 通过测试，理论上支持 E900V22C/D, CM311-1a-YST, M401A, M411A, UNT403A, UNT413A, ZTE-B863AV3.2-M, CM311-1a-CH, IP112H, B863AV3.1-M2 平台。

`armbian-install` 安装可选型号：
```
--------------------------------------------------------------------------------------
ID    SOC        MODEL                               DTB                                               
--------------------------------------------------------------------------------------
301   s905x2     X96-Max-4GB,Tx5-Max                 meson-g12a-x96-max.dtb                            
302   s905x2     X96-Max-2GB,A95X-F2                 meson-g12a-x96-max-rmii.dtb                       
303   s905x2     MECOOL-KM3-4G                       meson-g12a-sei510.dtb                             
304   s905l3a    E900V22C-D,CM311-1a-CH,IP112H       meson-g12a-s905l3a-e900v22c.dtb                   
305   s905l3a    CM311-1a-YST                        meson-g12a-s905l3a-cm311.dtb                      
306   s905l3a    M401A,UNT403A,B863AV3.2-M           meson-g12a-s905l3a-m401a.dtb                      
0     Other      Customize                           Enter-custom-dtb-name                             
--------------------------------------------------------------------------------------
```

大致流程：

- 通电开机进入 android tv，ROOT 后安装 apk 切换到外部（U 盘/TF 卡）引导

- 将整合包写入 U 盘/TF 卡上，盒子重启开机后进入 U 盘/TF 卡上的 armbian 系统

- 用 `armbian-install` 命令选择对应型号把 One-KVM 的固件 img 写入 emmc

安装示例：
![install](./img/PixPin_2024-10-16_22-49-59.png)