export function counsellingConfirmEmailHtml({
    firstName,
    studyLevel,
    preferredDays,
    preferredTimeRanges,
}: {
    firstName: string;
    studyLevel: string;
    preferredDays: string[];
    preferredTimeRanges: string[];
}): string {
    const year = new Date().getFullYear();
    const days = preferredDays.join(', ');
    const times = preferredTimeRanges.join(', ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Counselling Request Received</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;box-shadow:0 1px 4px rgba(0,0,0,0.06);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0369a1 0%,#0284c7 100%);padding:32px 40px 28px;">
              <p style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">My Career Pathshala</p>
              <p style="margin:6px 0 0;font-size:13px;color:#bae6fd;">Counselling Request Received</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <p style="margin:0 0 6px;font-size:15px;color:#475569;">Hi <strong>${firstName}</strong>,</p>
              <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.7;">
                We've received your counselling request! Our team will review it and reach out to confirm your session time shortly.
              </p>

              <!-- Summary card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#0369a1;letter-spacing:1.5px;text-transform:uppercase;">Your Request Summary</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#64748b;width:140px;">Study Level</td>
                        <td style="padding:6px 0;font-size:13px;font-weight:600;color:#0f172a;">${studyLevel}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#64748b;">Preferred Days</td>
                        <td style="padding:6px 0;font-size:13px;font-weight:600;color:#0f172a;">${days}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#64748b;">Preferred Times</td>
                        <td style="padding:6px 0;font-size:13px;font-weight:600;color:#0f172a;">${times}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;line-height:1.6;">
                You'll receive another email once your session is confirmed with the exact date, time, and meeting link. You can also track the status from your dashboard.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 36px;text-align:center;">
              <a href="https://mycareerpathshala.com/dashboard/counselling"
                 style="display:inline-block;background:#0284c7;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:12px;">
                View My Counselling
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
