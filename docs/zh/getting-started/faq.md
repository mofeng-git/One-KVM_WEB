# 常见问题

!!! info "内容整理中"
    One-KVM Rust 文档正在完善，常见问题条目暂未整理完成。
    若需旧版（PiKVM 适配版）相关问题排查，请参考 [One-KVM Python 文档](../python/index.md) 或到 GitHub Issues 提问。

## DEB 安装与运行

??? question "Debian 13（x86-64）启动时提示缺少 libmfx.so.1？"

    若报错类似：

    `error while loading shared libraries: libmfx.so.1: cannot open shared object file: No such file or directory`

    说明缺少 Intel Media SDK 的 `libmfx` 动态库。Debian 13 默认源中暂无对应包，需手动安装旧版仓库中的 `libmfx1` deb：

    1. 下载：[libmfx1_22.5.4-1_amd64.deb](http://ftp.cn.debian.org/debian/pool/main/i/intel-mediasdk/libmfx1_22.5.4-1_amd64.deb)
    2. 在文件所在目录执行：

    ```bash
    apt install ./libmfx1_22.5.4-1_amd64.deb
    ```

    更完整的说明见 [DEB 安装](deb-install.md)。