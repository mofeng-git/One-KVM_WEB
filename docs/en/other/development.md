## Project Overview

One-KVM is a lightweight IP-KVM solution written in Rust, with a Vue 3 + TypeScript front end.

### Tech Stack

**Back end:**

- Rust (stable)
- Axum (web framework)
- Tokio (async runtime)
- SQLite (configuration storage)
- webrtc-rs (WebRTC support)

**Front end:**

- Vue 3
- TypeScript
- Tailwind CSS
- shadcn-vue
- Vite

### Runtime environment variables

| Variable | Location | Behavior / Default | Values / Parsing |
| --- | --- | --- | --- |
| ONE_KVM_DATA_DIR | src/main.rs | Default data directory. CLI `-d/--data-dir` has higher priority; if unset, Linux uses `/etc/one-kvm` and Windows uses `one-kvm` under the executable directory. | Any path string |
| RUST_LOG | src/main.rs | tracing log filter. When set, it overrides the default filter generated from `--log-level` and `-v/-vv/-vvv`. | For example `one_kvm=debug,tower_http=debug,webrtc_sctp=warn` |
| ONE_KVM_FFMPEG_LOG | libs/hwcodec/src/ffmpeg.rs | FFmpeg log level. If unset or invalid, defaults to `error`. | Numeric level, or `quiet` / `panic` / `fatal` / `error` / `warn` / `warning` / `info` / `verbose` / `debug` / `trace` |
| ONE_KVM_WEBRTC_MDNS_MODE | src/webrtc/mdns.rs | WebRTC mDNS mode. Reads then `trim()` + lowercase conversion; empty or invalid values fall back to the default `QueryOnly`. | `disabled` / `off` / `false` / `0` -> Disabled; `query` / `query_only` / `query-only` -> QueryOnly; `gather` / `query_and_gather` / `query-and-gather` / `on` / `true` / `1` -> QueryAndGather |
| ONE_KVM_FRONTEND_DIR | src/web/static_files.rs | Overrides embedded `web/dist` assets with an external frontend static directory. Empty, inaccessible, or path-traversal results fall back to embedded assets. | Accessible frontend build directory |
| ONE_KVM_UPDATE_BASE_URL | src/update/mod.rs | Base URL for online-upgrade manifests and artifacts; if unset or empty, uses `https://update.one-kvm.cn`. | URL string |
| ONE_KVM_UPDATE_CURRENT_VERSION | src/update/mod.rs | Overrides the current version used by the online-upgrade comparison; mainly for tests or custom packaging. | Non-empty version string |
| OPENAI_API_KEY | src/computer_use/manager.rs | OpenAI API key for Computer Use Agent. The environment variable has higher priority than the key saved in the web UI. | Non-empty API key |
| ONE_KVM_OPENAI_BASE_URL | src/computer_use/manager.rs | Overrides the OpenAI endpoint for Computer Use Agent. The environment variable has higher priority than the web UI configuration. | OpenAI Responses or Chat Completions compatible endpoint URL |
| ONE_KVM_V4L2M2M_ALLOW | libs/hwcodec/cpp/common/platform/linux/linux.cpp | Amlogic platforms skip V4L2 M2M probing by default to avoid hangs caused by some kernel defects; setting this variable allows probing. | Non-empty and not `0` enables probing |
| RUSTDESK_HWCODEC_NVENC_GPU | libs/hwcodec/src/ffmpeg_ram/encode.rs | Selects the NVENC GPU index; if unset or invalid, uses `-1`. | Integer |
| ONE_KVM_TTYD_PATH | src/extensions/software_windows.rs | Overrides the ttyd executable path on Windows; used only by the ttyd extension. | Non-empty path |

### Docker entrypoint environment variables

| Variable | Location | Behavior / Default | Values / Parsing |
| --- | --- | --- | --- |
| DATA_DIR | build/init.sh | Container data directory passed to `one-kvm -d`; higher priority than `ONE_KVM_DATA_DIR`, defaults to `/etc/one-kvm`. | Any path string |
| ONE_KVM_DATA_DIR | build/init.sh | Backward-compatible container data directory variable; used only when `DATA_DIR` is unset. | Any path string |
| ENABLE_HTTPS | build/init.sh | Adds `--enable-https`; default is `false`. | Only `true` enables it |
| BIND_ADDRESS | build/init.sh | Adds `-a` and overrides the bind address. | IP address string |
| HTTP_PORT | build/init.sh | Adds `-p` and overrides the HTTP port. | Port number |
| HTTPS_PORT | build/init.sh | Adds `--https-port` and overrides the HTTPS port. | Port number |
| VERBOSE | build/init.sh | Maps to CLI verbosity flags. | `1` -> `-v`; `2` -> `-vv`; `3` -> `-vvv` |
| LIBVA_DRIVER_NAME | build/init.sh | Manually selects the VA-API driver; when set, auto-detection is skipped. | For example `iHD` or `i965` |
| LIBVA_DEVICE | build/init.sh | Selects the DRM render node used for VA-API probing; if unset, scans `/dev/dri/renderD*`. | Device path |

### Build environment variables

| Variable | Location | Behavior / Default | Values / Parsing |
| --- | --- | --- | --- |
| CHINAMIRRO | build/build-images.sh, build/cross/Dockerfile.x86_64, build/cross/Dockerfile.arm64, build/cross/Dockerfile.armv7 | Enables build acceleration for China network environments using mirrors and a GitHub proxy. | `1` enables it; some scripts also accept `true` / `yes` / `on` |
| GH_PROXY | build/build-images.sh, build/cross/Dockerfile.x86_64, build/cross/Dockerfile.arm64, build/cross/Dockerfile.armv7 | GitHub resource proxy prefix used in China-network builds; common default is `https://gh-proxy.com/`. | URL prefix |
| DEBIAN_IMAGE | build/build-images.sh | Replaces the Dockerfile base Debian image in China-network builds; default `docker.1ms.run/library/debian:11`. | Image name |
| ONE_KVM_LIBS_PATH | libs/hwcodec/build.rs | Overrides the local library search path for desktop/server FFmpeg and related libraries. | Library directory |
| FFMPEG_STATIC | libs/hwcodec/build.rs | Desktop/server FFmpeg link mode; if unset, dynamic linking is used. | `1` means static linking |
