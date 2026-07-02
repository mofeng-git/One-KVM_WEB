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
| ONE_KVM_DATA_DIR | src/main.rs | 默认数据目录。命令行 `-d/--data-dir` 优先级更高；未设置时 Linux 使用 `/etc/one-kvm`，Windows 使用程序目录下的 `one-kvm`。 | 任意路径字符串 |
| RUST_LOG | src/main.rs | tracing 日志过滤器。设置后会覆盖 `--log-level` 和 `-v/-vv/-vvv` 生成的默认过滤器。 | 例如 `one_kvm=debug,tower_http=debug,webrtc_sctp=warn` |
| ONE_KVM_FFMPEG_LOG | libs/hwcodec/src/ffmpeg.rs | FFmpeg 日志等级，未设置或无效时使用 `error`。 | 数字等级，或 `quiet` / `panic` / `fatal` / `error` / `warn` / `warning` / `info` / `verbose` / `debug` / `trace` |
| ONE_KVM_WEBRTC_MDNS_MODE | src/webrtc/mdns.rs | WebRTC mDNS 模式。读取后执行 `trim()` 和小写转换；空串或无效值按默认 `QueryOnly` 处理。 | `disabled` / `off` / `false` / `0` -> Disabled；`query` / `query_only` / `query-only` -> QueryOnly；`gather` / `query_and_gather` / `query-and-gather` / `on` / `true` / `1` -> QueryAndGather |
| ONE_KVM_FRONTEND_DIR | src/web/static_files.rs | 使用外部前端静态资源目录覆盖内嵌 `web/dist`。路径为空、不可访问或越界时回退到内嵌资源。 | 可访问的前端构建目录 |
| ONE_KVM_UPDATE_BASE_URL | src/update/mod.rs | 在线升级清单与制品的基础地址；未设置或空串时使用 `https://update.one-kvm.cn`。 | URL 字符串 |
| ONE_KVM_UPDATE_CURRENT_VERSION | src/update/mod.rs | 覆盖在线升级模块用于比较的当前版本；主要用于测试或特殊打包场景。 | 非空版本号字符串 |
| OPENAI_API_KEY | src/computer_use/manager.rs | Computer Use Agent 的 OpenAI API Key。环境变量优先级高于网页配置保存的 Key。 | 非空 API Key |
| ONE_KVM_OPENAI_BASE_URL | src/computer_use/manager.rs | 覆盖 Computer Use Agent 的 OpenAI 接口地址；环境变量优先级高于网页配置。 | OpenAI Responses 或 Chat Completions 兼容接口 URL |
| ONE_KVM_V4L2M2M_ALLOW | libs/hwcodec/cpp/common/platform/linux/linux.cpp | 晶晨平台默认跳过 V4L2 M2M 探测，避免部分内核缺陷导致程序卡死；设置后允许继续探测。 | 非空且不为 `0` 即允许探测 |
| RUSTDESK_HWCODEC_NVENC_GPU | libs/hwcodec/src/ffmpeg_ram/encode.rs | 指定 NVENC GPU 编号；未设置或解析失败时使用 `-1`。 | 整数 |
| ONE_KVM_TTYD_PATH | src/extensions/software_windows.rs | Windows 下覆盖 ttyd 可执行文件路径；仅 ttyd 扩展使用。 | 非空路径 |

### Docker 入口脚本环境变量

| 变量名 | 位置 | 作用/默认 | 取值与解析 |
| --- | --- | --- | --- |
| DATA_DIR | build/init.sh | 容器数据目录，传给 `one-kvm -d`；优先级高于 `ONE_KVM_DATA_DIR`，未设置时使用 `/etc/one-kvm`。 | 任意路径字符串 |
| ONE_KVM_DATA_DIR | build/init.sh | 容器数据目录兼容变量；仅在 `DATA_DIR` 未设置时使用。 | 任意路径字符串 |
| ENABLE_HTTPS | build/init.sh | 为启动参数追加 `--enable-https`；默认 `false`。 | 仅 `true` 启用 |
| BIND_ADDRESS | build/init.sh | 为启动参数追加 `-a`，覆盖监听地址。 | IP 地址字符串 |
| HTTP_PORT | build/init.sh | 为启动参数追加 `-p`，覆盖 HTTP 端口。 | 端口号 |
| HTTPS_PORT | build/init.sh | 为启动参数追加 `--https-port`，覆盖 HTTPS 端口。 | 端口号 |
| VERBOSE | build/init.sh | 映射为命令行详细日志参数。 | `1` -> `-v`；`2` -> `-vv`；`3` -> `-vvv` |
| LIBVA_DRIVER_NAME | build/init.sh | 手动指定 VA-API 驱动；设置后跳过自动探测。 | 例如 `iHD`、`i965` |
| LIBVA_DEVICE | build/init.sh | 指定用于 VA-API 探测的 DRM render 节点；未设置时扫描 `/dev/dri/renderD*`。 | 设备路径 |

### 构建环境变量

| 变量名 | 位置 | 作用/默认 | 取值与解析 |
| --- | --- | --- | --- |
| CHINAMIRRO | build/build-images.sh、build/cross/Dockerfile.x86_64、build/cross/Dockerfile.arm64、build/cross/Dockerfile.armv7 | 启用中国网络环境构建加速，使用镜像源和 GitHub 代理。 | `1` 启用；部分脚本也接受 `true` / `yes` / `on` |
| GH_PROXY | build/build-images.sh、build/cross/Dockerfile.x86_64、build/cross/Dockerfile.arm64、build/cross/Dockerfile.armv7 | 中国网络环境下拉取 GitHub 资源的代理前缀；默认常见值为 `https://gh-proxy.com/`。 | URL 前缀 |
| DEBIAN_IMAGE | build/build-images.sh | 中国网络环境下替换 Dockerfile 基础 Debian 镜像；默认 `docker.1ms.run/library/debian:11`。 | 镜像名 |
| ONE_KVM_LIBS_PATH | libs/hwcodec/build.rs | 覆盖桌面/服务器端 FFmpeg 等本地库搜索路径。 | 库目录 |
| FFMPEG_STATIC | libs/hwcodec/build.rs | 桌面/服务器端 FFmpeg 链接方式；未设置时按动态库处理。 | `1` 表示静态链接 |
