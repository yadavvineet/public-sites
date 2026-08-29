export async function validateRecaptcha(
  token: string,
  secretKey: string,
): Promise<{ valid: boolean; score: number }> {
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: "",
      }),
    },
  );

  const data = (await response.json()) as {
    success: boolean;
    score: number;
    "error-codes"?: string[];
  };

  return {
    valid: data.success && data.score >= 0.5,
    score: data.score,
  };
}
