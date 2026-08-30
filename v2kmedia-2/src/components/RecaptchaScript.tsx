import { useEffect } from "react";

export default function RecaptchaScript() {
  useEffect(() => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;

    // Already loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).grecaptcha) return;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=onload`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
