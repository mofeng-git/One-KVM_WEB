# Enable 2FA

Two-factor authentication (2FA) adds an extra layer of protection when logging in. After enabling 2FA, you must log in with your username and password and provide a time-based one-time password (TOTP).

Log in to the One-KVM terminal, switch to the root account, and run `kvmd-totp init` to generate a TOTP secret.

```bash
# View PiKVM 2FA command help
kvmd-totp -h

# Generate 2FA secret and enable 2FA
kvmd-totp init

# Show existing secrets
kvmd-totp show

# Delete all secrets and disable 2FA
kvmd-totp del
```

![image-20240610104228226](../../img/image-20240610104228226.png)

On Android, use any 2FA app you like (e.g., [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)). The workflow is similar. This example uses Authing Token: scan the QR code or enter the secret manually, then when logging into the One-KVM web UI, enter the 6-digit one-time code.

![image-20240610105349638](../../img/image-20240610105349638.png)