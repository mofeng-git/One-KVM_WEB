In real-world networks, most devices sit behind NAT (Network Address Translation) or firewalls, which makes WebRTC P2P connections challenging. STUN and TURN servers were created to address this.

They are both key parts of the ICE (Interactive Connectivity Establishment) framework, each with distinct but complementary roles:

- STUN: attempts to discover direct P2P connectivity
- TURN: provides relay services when direct connections fail

![STUN vs TURN](../../img/image-20251202163700000.png)

### TURN Providers

There are many public STUN servers, but almost no public TURN servers.

You can deploy your own STUN/TURN service using coturn.

If you use Cloudflare, each account includes 1 TB of TURN relay traffic per month. For users in mainland China, Cloudflare TURN may have connectivity issues or higher latency.

![Cloudflare STUN/TURN](../../img/image-20251202164800000.png)