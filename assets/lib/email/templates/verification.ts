import { brandHeader } from '../branding';

export function verificationEmailHtml({ firstName, verifyUrl }: { firstName: string; verifyUrl: string }): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:16px;box-shadow:0 1px 4px rgba(0,0,0,0.06);overflow:hidden;">
          ${brandHeader({ label: 'Email Verification' })}
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <p style="margin:0 0 8px;font-size:15px;color:#475569;">Hi <strong>${firstName}</strong>,</p>
              <p style="margin:0 0 28px;font-size:14px;color:#64748b;line-height:1.6;">
                Click the button below to verify your email address. This link expires in <strong>24 hours</strong>.
              </p>
              <!-- CTA -->
              <div style="text-align:center;margin:0 0 28px;">
                <a href="${verifyUrl}"
                   style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;letter-spacing:-0.2px;">
                  Verify Email Address
                </a>
              </div>
              <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;line-height:1.6;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin:0;font-size:11px;color:#3b82f6;word-break:break-all;">${verifyUrl}</p>
              <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;line-height:1.6;">
                If you did not create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #f1f5f9;padding:20px 40px;background:#fafafa;">
              <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">
                &copy; ${new Date().getFullYear()} My Career Pathshala &nbsp;&middot;&nbsp; This is an automated message, please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
