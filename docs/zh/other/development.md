## 项目概述

One-KVM 是使用 Rust 语言开发的轻量级 IP-KVM 解决方案，前端使用 Vue 3 + TypeScript。

### 开发编译

首先编译前端资源。

```bash
cd web 
npm install 
npm run build
```

然后编译后端程序（仅编译当前架构）。

```bash
#回到项目根目录
cargo build
```

如果需要多架构编译（使用 cross 工具，需要提前安装 `cargo install cross`），构建容器镜像或 DEB 包，有以下脚本，可以在 X64 平台上运行。

```bash
mofeng@debian-dev:~/code/One-KVM$ ./build/build-images.sh --help
Usage: ./build/build-images.sh [arch|help]

Commands:
  all     (default) Build all architectures
  x86_64  Build only x86_64
  arm64   Build only arm64
  armv7   Build only ARMv7

Examples:
  ./build/build-images.sh              # Build all
  ./build/build-images.sh x86_64       # Build x86_64 only
mofeng@debian-dev:~/code/One-KVM$ ./build/package-deb.sh --help
Error: Unknown architecture: --help
Available: amd64, arm64, armhf
mofeng@debian-dev:~/code/One-KVM$ ./build/package-docker.sh --help
Usage: ./build/package-docker.sh [OPTIONS]

Package pre-compiled One-KVM binaries into Docker images.

Options:
  --platform PLATFORM   Target platform (linux/amd64, linux/arm64, linux/arm/v7)
                        Use comma to specify multiple: linux/amd64,linux/arm64
                        Default: linux/amd64
  --registry REGISTRY   Container registry (e.g., docker.io/user, ghcr.io/user)
  --image-name NAME     Override image name (default: one-kvm or one-kvm-full)
  --push                Push image to registry
  --load                Load image to local Docker (single platform only)
  --tag TAG             Image tag (default: latest)
  --variant VARIANT     Image variant: minimal or full (default: minimal)
  --full                Shortcut for --variant full
  --build               Also build the binary with cross (optional)
  --help                Show this help

Examples:
  # Build for current platform and load locally
  ./build/package-docker.sh --platform linux/arm64 --load

  # Build full image (includes gostc + easytier)
  ./build/package-docker.sh --variant full --platform linux/arm64 --load

  # Build and push single platform
  ./build/package-docker.sh --platform linux/arm64 --registry docker.io/user --push

  # Build multi-arch and push (creates unified manifest)
  ./build/package-docker.sh --platform linux/amd64,linux/arm64,linux/arm/v7 --registry docker.io/user --push
mofeng@debian-dev:~/code/One-KVM$ 
```

一个使用实例（作者发布使用的命令）：

```bash
#构建所有架构二进制文件
 ./build/build-images.sh

#构建所有架构二进制包
./build/package-deb.sh

###构建所有架构的容器镜像
./build/package-docker.sh --platform linux/amd64,linux/arm64,linux/arm/v7 --registry docker.io/silentwind0 --push
./build/package-docker.sh --platform linux/amd64,linux/arm64,linux/arm/v7 --registry registry.cn-hangzhou.aliyuncs.com/silentwind --push
./build/package-docker.sh --platform linux/amd64,linux/arm64,linux/arm/v7 --registry docker.io/silentwind0 --variant full --push
./build/package-docker.sh --platform linux/amd64,linux/arm64,linux/arm/v7 --registry registry.cn-hangzhou.aliyuncs.com/silentwind --variant full --push
```

### 应用运行时环境变量
| 变量名 | 位置 | 作用/默认 | 取值与解析 |
| --- | --- | --- | --- |
| ONE_KVM_DATA_DIR | src/main.rs | get_data_dir() 中优先使用此环境变量作为数据目录；未设置则返回 /etc/one-kvm | 任意路径字符串 |
| ONE_KVM_WEBRTC_MDNS_MODE | src/webrtc/mdns.rs | 读取后 trim() + to_ascii_lowercase()；空串当作未设置；无效值回退默认 QueryAndGather | disabled/off/false/0→Disabled；query/query_only/query-only→QueryOnly；gather/query_and_gather/query-and-gather/on/true/1→QueryAndGather |
| ONE_KVM_V4L2M2M_ALLOW_VIDEO0 | libs/hwcodec/cpp/common/platform/linux/linux.cpp | 仅影响 /dev/video0 的探测行为：如果 /dev/video0 被识别为 Amlogic vdec（通过 /sys/class/video4linux/video0/name 或 modalias包含 meson / amlogic / vdec 等特征），且该环境变量未设置或为 "0"，则跳过对 /dev/video0 的 M2M 探测；设置为非空且不为 "0" 时允许继续探测 | 非空且不为 "0" 即允许探测 |
