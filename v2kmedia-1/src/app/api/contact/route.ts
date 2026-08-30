import { NextRequest, NextResponse } from "next/server";
import { validateRecaptcha } from "../../../lib/recaptcha";
import { submitToLambda } from "../../../lib/contact-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, category, message, recaptchaToken } = body as {
      name: string;
      email: string;
      phone: string;
      company: string;
      category: string;
      message: string;
      recaptchaToken: string;
    };

    // Validate reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      return NextResponse.json(
        { success: false, error: "server_error" },
        { status: 500 },
      );
    }

    const recaptchaValid = await validateRecaptcha(recaptchaToken, recaptchaSecret);
    if (!recaptchaValid) {
      return NextResponse.json(
        { success: false, error: "recaptcha_failed" },
        { status: 400 },
      );
    }

    // Call Lambda URL to send email
    const lambdaUrl = process.env.LAMBDA_URL;
    if (!lambdaUrl) {
      return NextResponse.json(
        { success: false, error: "lambda_not_configured" },
        { status: 500 },
      );
    }

    const lambdaResult = await submitToLambda(
      { name, email, phone, company, category, message },
      recaptchaToken,
    );

    if (!lambdaResult.success) {
      return NextResponse.json(
        { success: false, error: "lambda_error", message: lambdaResult.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "network_error" },
      { status: 500 },
    );
  }
}
