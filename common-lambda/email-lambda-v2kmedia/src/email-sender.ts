import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  message: string;
}

export async function sendEmail(data: ContactFormData): Promise<void> {
  const region = process.env.AWS_REGION || "ap-south-1";
  const sendTo = process.env.SES_SEND_TO;

  if (!sendTo) {
    throw new Error("SES_SEND_TO environment variable is not set.");
  }

  const client = new SESClient({ region });

  const subject = `[V2K Media Enquiry] ${data.category} — from ${data.name}`;

  const htmlBody = `
    <html>
    <body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1c1c1e;">New Enquiry from V2K Media Website</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px 0;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${escapeHtml(data.company) || "—"}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${escapeHtml(data.phone) || "—"}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Category:</td><td style="padding: 8px 0;">${escapeHtml(data.category)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Message:</td></tr>
        <tr><td colspan="2" style="padding: 8px 0; border-top: 1px solid #e5e7eb;">${escapeHtml(data.message)}</td></tr>
      </table>
      <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">Received from v2k.media contact form.</p>
    </body>
    </html>
  `;

  const textBody = [
    `New Enquiry from V2K Media Website`,
    ``,
    `Name: ${data.name}`,
    `Company: ${data.company || "—"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Category: ${data.category}`,
    ``,
    `Message:`,
    data.message,
  ].join("\n");

  const command = new SendEmailCommand({
    Source: sendTo,
    Destination: { ToAddresses: [sendTo] },
    Message: {
      Subject: { Charset: "UTF-8", Data: subject },
      Body: {
        Text: { Charset: "UTF-8", Data: textBody },
        Html: { Charset: "UTF-8", Data: htmlBody },
      },
    },
  });

  await client.send(command);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
