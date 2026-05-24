# FAQ

!!! info "Work in progress"
    The One-KVM Rust docs are still being built out, so FAQ entries are not ready yet.
    For PiKVM-based troubleshooting, see the [One-KVM Python docs](../python/index.md) or ask on GitHub Issues.

## DEB install & runtime

??? question "Debian 13 (x86-64): missing libmfx.so.1 at startup?"

    If you see an error like:

    `error while loading shared libraries: libmfx.so.1: cannot open shared object file: No such file or directory`

    the Intel Media SDK `libmfx` library is missing. It is not in the Debian 13 default repositories; install the legacy `libmfx1` package manually:

    1. Download: [libmfx1_22.5.4-1_amd64.deb](http://ftp.cn.debian.org/debian/pool/main/i/intel-mediasdk/libmfx1_22.5.4-1_amd64.deb)
    2. From the directory that contains the file, run:

    ```bash
    apt install ./libmfx1_22.5.4-1_amd64.deb
    ```

    See also [DEB install](deb-install.md).