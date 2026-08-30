export async function submitToLambda(
  formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    category: string;
    message: string;
  },
  recaptchaToken: string,
): Promise<{ success: boolean; message: string }> {
  const lambdaUrl = process.env.LAMBDA_URL;
  if (!lambdaUrl) {
    return { success: false, message: "Lambda URL not configured." };
  }

  try {
    const response = await fetch(lambdaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, recaptchaToken }),
      signal: AbortSignal.timeout(15000),
    });

    const data = (await response.json()) as {
      statusCode?: number;
      body?: string;
    };

    const parsedBody =
      typeof data.body === "string" ? JSON.parse(data.body) : data;

    if (response.ok && parsedBody.success !== false) {
      return { success: true, message: "Email sent successfully." };
    }

    return {
      success: false,
      message: parsedBody.message || "Failed to send email.",
    };
  } catch {
    return { success: false, message: "Network error contacting Lambda." };
  }
}
