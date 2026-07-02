在现实的网络环境中，大多数设备都位于 NAT（网络地址转换） 设备或防火墙之后，这给 WebRTC 的 P2P 直连带来了巨大挑战。STUN 和 TURN 服务器正是为了解决这个问题而诞生的。

它们都是 ICE（Interactive Connectivity Establishment，交互式连接建立） 框架的重要组成部分，各自承担着不同但互补的职责：

- STUN：尝试发现直接 P2P 连接的可能性
- TURN：在直接连接失败时提供中继服务

![STUN 和 TURN 示意图](../../img/image-20251202163700000.png)


### TURN 服务提供商

互联网上有众多的公共 STUN 服务器，但几乎没有公开的 TURN 服务器。

STUN/TURN 服务可以使用 coturn 程序自建。

公共 STUN/TURN 服务配置无需密码，默认折叠隐藏，点击按钮后在浏览器本地展示。

!!! warning "使用须知"
    公共 STUN/TURN 服务免费提供，不承诺可用性、稳定性、延迟或服务质量。请勿滥用、刷流量、攻击、批量占用资源或用于违法违规用途。

<button type="button" class="md-button md-button--primary" data-public-config="webrtc">查看 WebRTC STUN/TURN 公共服务配置</button>

如果你在使用 Cloudflare ，Cloudflare 为每个账户提供了每月 1T 的 TURN 中转流量。不过对于中国大陆地区用户，Cloudflare 提供的 TURN 服务可能存在网络连通性问题或高延迟的表现。

![Cloudflare STUN/TURN](../../img/image-20251202164800000.png)
