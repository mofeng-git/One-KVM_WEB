In real-world networks, most devices sit behind NAT (Network Address Translation) or firewalls, which makes WebRTC P2P connections challenging. STUN and TURN servers were created to address this.

They are both key parts of the ICE (Interactive Connectivity Establishment) framework, each with distinct but complementary roles:

- STUN: attempts to discover direct P2P connectivity
- TURN: provides relay services when direct connections fail

![STUN vs TURN](../../img/image-20251202163700000.png)

### TURN Providers

There are many public STUN servers, but almost no public TURN servers.

You can deploy your own STUN/TURN service using coturn.

The public STUN/TURN service config does not require a password. It is hidden by default and displayed locally in your browser after you click the button.

!!! warning "Usage Notice"
    The public STUN/TURN services are provided for free with no guarantee of availability, stability, latency, or service quality. Do not abuse them, generate excessive traffic, attack services, occupy resources in bulk, or use them for illegal activity.

<button type="button" class="md-button md-button--primary" data-public-config="webrtc">View WebRTC STUN/TURN public service config</button>

If you use Cloudflare, each account includes 1 TB of TURN relay traffic per month. For users in mainland China, Cloudflare TURN may have connectivity issues or higher latency.

![Cloudflare STUN/TURN](../../img/image-20251202164800000.png)
