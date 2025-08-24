# Enable 2FA

Two-Factor Authentication (2FA) is an extra layer of security for logging into websites or apps. When 2FA is enabled, you must log in with your username and password, and also provide a Time-based One-Time Password (TOTP).

First, log into the One-KVM terminal, switch to the root account, and run `kvmd-totp init` to generate a TOTP secret.

```bash
# View PiKVM 2FA command help
kvmd-totp -h

# Generate a 2FA secret and enable 2FA
kvmd-totp init

# Show existing secrets
kvmd-totp show

# Delete all secrets and disable 2FA
kvmd-totp del
```

![image-20240610104228226](../img/image-20240610104228226.png)

For Android devices, you can use your preferred 2FA app such as [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2). As features are quite similar across apps, here we use the Authing Token app as an example. First scan the QR code or manually enter the secret to add it, then when logging into the PiKVM web UI, enter the additional 6-digit one-time password.

![image-20240610105349638](../img/image-20240610105349638.png)


