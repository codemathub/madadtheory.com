import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

export async function sendOtpEmail(email: string, otp: string): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY || "";
  const resendClient = apiKey ? new Resend(apiKey) : null;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Mad Ad Theory <onboarding@resend.dev>";
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Mad Ad Theory - Admin Security Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0713; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0713; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #120d1d; border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 36px 40px 24px 40px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
              <div style="font-size: 20px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff;">
                <span style="color: #9d5bf0;">MAD</span> AD THEORY
              </div>
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #a78bfa; margin-top: 4px;">
                Secure Admin Verification
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 40px;">
              <h2 style="font-size: 20px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">
                Your Sign-In Security Code
              </h2>
              <p style="font-size: 14px; line-height: 22px; color: #94a3b8; margin: 0 0 28px 0;">
                Use the one-time passcode below to authenticate into the <strong>Mad Ad Theory Workspace</strong>. This code is confidential and valid for <strong>10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(79, 70, 229, 0.15)); border: 1px solid rgba(124, 58, 237, 0.35); border-radius: 16px; padding: 24px 20px; text-align: center; margin-bottom: 28px;">
                <div style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #c084fc; font-family: monospace;">
                  ${otp}
                </div>
                <div style="font-size: 12px; color: #a5b4fc; margin-top: 8px; font-weight: 600;">
                  Expires in 10 minutes • Single-use only
                </div>
              </div>

              <p style="font-size: 13px; line-height: 20px; color: #64748b; margin: 0;">
                If you did not attempt to sign in to the Mad Ad Theory administrative console, please ignore this email or notify IT immediately.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0d0816; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center; font-size: 12px; color: #64748b;">
              © 2026 Mad Ad Theory / Nerditia. All Rights Reserved.<br>
              Performance Marketing Platform
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  if (!resendClient) {
    if (process.env.NODE_ENV === "production") {
      console.error("[Email Security] RESEND_API_KEY is not configured in production.");
      return { success: false, error: "Email delivery service unavailable." };
    }
    return { success: true, id: `mock-${Date.now()}` };
  }

  try {
    const { data, error } = await resendClient.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Your Mad Ad Theory Admin Security Code: ${otp}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend] Error sending email:", error);
      return { success: false, error: error.message };
    }

    console.log(`[Resend] OTP email sent successfully to ${email} (ID: ${data?.id})`);
    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error("[Resend] Exception sending email:", err);
    return { success: false, error: err.message || "Failed to send email via Resend" };
  }
}

