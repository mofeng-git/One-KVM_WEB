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
| ONE_KVM_DATA_DIR | src/main.rs | `get_data_dir()` prefers this env var as the data dir; if unset it returns `/etc/one-kvm`. | Any path string |
| ONE_KVM_WEBRTC_MDNS_MODE | src/webrtc/mdns.rs | Reads then `trim()` + `to_ascii_lowercase()`; empty string is treated as unset; invalid values fall back to default QueryAndGather. | disabled/off/false/0 -> Disabled; query/query_only/query-only -> QueryOnly; gather/query_and_gather/query-and-gather/on/true/1 -> QueryAndGather |
| ONE_KVM_V4L2M2M_ALLOW_VIDEO0 | libs/hwcodec/cpp/common/platform/linux/linux.cpp | Only affects `/dev/video0` probing: if `/dev/video0` is detected as Amlogic vdec (via `/sys/class/video4linux/video0/name` or modalias containing meson/amlogic/vdec) and this env var is unset or "0", M2M probing is skipped; non-empty and not "0" allows probing. | Non-empty and not "0" enables probing |
