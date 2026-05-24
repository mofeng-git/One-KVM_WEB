# One-KVM Rust Overview

## What is One-KVM Rust?

One-KVM Rust is an IP-KVM (keyboard, video, mouse over IP) solution written in Rust. It enables BIOS-level remote control of servers and workstations over the network.

**Project goals**: open, lightweight, and easy to use.

- **Open**: not tied to specific hardware, runs across many environments.
- **Lightweight**: distributed as a single binary with minimal dependencies.
- **Easy**: configure everything in the web UI without manually editing config files.

!!! info "Background"
    One-KVM Rust is a complete rewrite of the original One-KVM (PiKVM-based) Python version. They share little beyond the name.

!!! warning "Early-stage Warning"
    This project is still in an early stage. Many features may be incomplete. Use for testing or evaluation, not production.

## Key Features

<div class="grid cards" markdown>

-   :material-cog-off:{ .lg .middle } __Zero Config Files__

    ---

    Configure A/V and HID devices directly in the web UI, no config files needed

-   :material-usb-flash-drive:{ .lg .middle } __Ventoy USB Mode__

    ---

    Works with virtual Ventoy USB drives for transferring files and booting large images

-   :material-puzzle:{ .lg .middle } __Rich Extensions__

    ---

    Web terminal, RustDesk integration, GOSTC tunneling, EasyTier networking

-   :material-language-rust:{ .lg .middle } __Rust Rewrite__

    ---

    Lightweight, safe, reliable, and high performance

</div>

## Supported Platforms

Docker

## Quick Start

[Docker install guide :material-arrow-right:](getting-started/docker-install.md){ .md-button .md-button--primary }

## Get Help

- **GitHub Issues** - [Report bugs or suggestions](https://github.com/mofeng-git/One-KVM/issues)
- **FAQ** - [Read the FAQ](getting-started/faq.md)