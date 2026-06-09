import { brandHeader } from '../branding';

export function applicationConfirmEmailHtml({
    firstName,
    universityName,
    courseName,
}: {
    firstName: string;
    universityName: string;
    courseName: string | null;
}): string {
    const year = new Date().getFullYear();
    const program = courseName ?? 'MBBS Program';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Application Submitted</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;box-shadow:0 1px 4px rgba(0,0,0,0.06);overflow:hidden;">

          ${brandHeader({ label: 'Application Submitted' })}

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <p style="margin:0 0 6px;font-size:15px;color:#475569;">Hi <strong>${firstName}</strong>,</p>
              <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.7;">
                Your application has been submitted successfully! Our admissions team will review it and keep you updated on every step.
              </p>

              <!-- Application card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#1d4ed8;letter-spacing:1.5px;text-transform:uppercase;">Application Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#64748b;width:120px;">University</td>
                        <td style="padding:6px 0;font-size:13px;font-weight:600;color:#0f172a;">${universityName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#64748b;">Program</td>
                        <td style="padding:6px 0;font-size:13px;font-weight:600;color:#0f172a;">${program}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#64748b;">Status</td>
                        <td style="padding:6px 0;">
                          <span style="display:inline-block;background:#2563eb;color:#fff;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:3px 10px;border-radius:999px;">Submitted</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;line-height:1.6;">
                We'll email you whenever the status changes — under review, offer received, or accepted. You can also track progress live on your dashboard.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 36px;text-align:center;">
              <a href="https://mycareerpathshala.com/dashboard/applications"
                 style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:12px;">
                Track My Application
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
