import { validateRecaptcha } from "./recaptcha-validator";
import { sendEmail, ContactFormData } from "./email-sender";

interface LambdaEvent {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  message: string;
  recaptchaToken: string;
}

interface LambdaResponse {
  statusCode: number;
  body: string;
}

export const handler = async (
  event: unknown,
): Promise<LambdaResponse> => {
  const {
    name,
    email,
    phone,
    company,
    category,
    message,
    recaptchaToken,
  } = (event as LambdaEvent) || {};

  // Validate required fields
  if (!name || !email || !message || !recaptchaToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Missing required fields." }),
    };
  }

  // Validate reCAPTCHA
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Server configuration error.",
      }),
    };
  }

  const recaptchaResult = await validateRecaptcha(
    recaptchaToken,
    recaptchaSecret,
  );

  if (!recaptchaResult.valid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "reCAPTCHA validation failed.",
      }),
    };
  }

  // Send email
  try {
    await sendEmail({ name, email, phone, company, category, message });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email.";
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message }),
    };
  }
};
