export async function validateRecaptcha(
  token: string,
  siteSecret: string,
): Promise<boolean> {
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: siteSecret,
        response: token,
        remoteip: "",
      }),
    },
  );

  const data = (await response.json()) as {
    success: boolean;
    score: number;
    action?: string;
  };

  return data.success && data.score >= 0.5;
}

export function getRecaptchaSiteKey(): string {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
}
