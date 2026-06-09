import { brandHeader } from '../branding';

export function welcomeEmailHtml({ firstName }: { firstName: string }): string {
    const year = new Date().getFullYear();
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to My Career Pathshala</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;box-shadow:0 1px 4px rgba(0,0,0,0.06);overflow:hidden;">

          ${brandHeader({ label: 'Welcome aboard' })}

          <!-- Hero greeting -->
          <tr>
            <td style="padding:40px 40px 0;text-align:center;">
              <p style="margin:0 0 8px;font-size:28px;">🎓</p>
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0f172a;">Welcome, ${firstName}!</h1>
              <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
                We're thrilled to have you on board. My Career Pathshala is here to guide you every step of the way — from choosing the right university to getting your admission confirmed.
              </p>
            </td>
          </tr>

          <!-- What you can do -->
          <tr>
            <td style="padding:28px 40px;">
              <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:1px;">What you can do</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 12px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;vertical-align:top;padding-top:2px;">🌍</td>
                        <td>
                          <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Explore universities & courses</p>
                          <p style="margin:2px 0 0;font-size:12px;color:#94a3b8;">Browse thousands of programs across the globe</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 12px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;vertical-align:top;padding-top:2px;">📋</td>
                        <td>
                          <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Track your applications</p>
                          <p style="margin:2px 0 0;font-size:12px;color:#94a3b8;">Manage and monitor every application in one place</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;vertical-align:top;padding-top:2px;">💬</td>
                        <td>
                          <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Book a counselling session</p>
                          <p style="margin:2px 0 0;font-size:12px;color:#94a3b8;">Get expert guidance tailored to your goals</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 36px;text-align:center;">
              <a href="https://mycareerpathshala.com/dashboard"
                 style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;letter-spacing:-0.2px;">
                Go to My Dashboard
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #f1f5f9;padding:20px 40px;background:#fafafa;">
              <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">
                &copy; ${year} My Career Pathshala &nbsp;&middot;&nbsp; This is an automated message, please do not reply.
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
