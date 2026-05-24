# EasyTier Mesh Networking

EasyTier provides P2P VPN networking so you can place One-KVM devices on the same virtual LAN. `easytier-core` must be installed (Extensions page shows "Available"), and you should prepare a network name and secret.

## Configuration

| Item | Description | Example |
| --- | --- | --- |
| Network name | Required, identifies the mesh | `one-kvm` |
| Network secret | Optional but recommended | `your-secret` |
| Peer nodes | Optional, bootstrap peers (multiple) | `tcp://1.2.3.4:11010` |
| Virtual IP | Optional, auto-assigned if empty | `10.0.0.2/24` |

![easytier_mesh-2026-01-28-00-41-29](../../zh/feature_usage/images/easytier_mesh-2026-01-28-00-41-29.png)

## Setup Steps

1. Open Settings -> Extensions -> Remote Access -> EasyTier
2. Fill in network name, secret, and peers (optional)
3. Leave virtual IP empty for auto assignment, or include CIDR if set manually
4. Click **Save**, then **Start**

![easytier_mesh-2026-01-28-00-44-18](../../zh/feature_usage/images/easytier_mesh-2026-01-28-00-44-18.png)

![easytier_mesh-2026-01-28-00-44-48](../../zh/feature_usage/images/easytier_mesh-2026-01-28-00-44-48.png)
