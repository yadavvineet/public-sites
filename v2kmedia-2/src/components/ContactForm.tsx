import { useState, useCallback, useRef, useEffect } from "react";
import { contactContent } from "../config/content";
import RecaptchaScript from "./RecaptchaScript";
import type { ContactFormState, ContactFormErrors, ApiErrorType } from "../types";

const LAMBDA_URL = import.meta.env.VITE_LAMBDA_URL || "";

interface ContactFormProps {
  preselectedCategory?: string;
}

export default function ContactForm({ preselectedCategory }: ContactFormProps) {
  const labels = contactContent.formLabels;
  const categories = contactContent.categories;
  const successMessage = contactContent.successMessage;

  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaRendered = useRef(false);

  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: preselectedCategory && categories.includes(preselectedCategory)
      ? preselectedCategory
      : categories[0],
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [apiError, setApiError] = useState<ApiErrorType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Render reCAPTCHA widget after script loads
  useEffect(() => {
    if (!recaptchaRef.current || recaptchaRendered.current) return;

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;

    const checkGrecaptcha = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const grecaptcha = (window as any).grecaptcha;
      if (grecaptcha && grecaptcha.render) {
        clearInterval(checkGrecaptcha);
        try {
          grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            theme: "light",
            size: "normal",
          });
          recaptchaRendered.current = true;
        } catch {
          // reCAPTCHA render failed
        }
      }
    }, 100);

    return () => clearInterval(checkGrecaptcha);
  }, []);

  const getRecaptchaToken = (): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const grecaptcha = (window as any).grecaptcha;
    if (grecaptcha) {
      try {
        return grecaptcha.getResponse();
      } catch {
        return "";
      }
    }
    return "";
  };

  const validate = useCallback((): boolean => {
    const newErrors: ContactFormErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Please enter a message (at least 10 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (!LAMBDA_URL) {
      setApiError("lambda_not_configured");
      return;
    }

    const recaptchaToken = getRecaptchaToken();

    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch(LAMBDA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
        signal: AbortSignal.timeout(15000),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        setApiError("lambda_error");
        return;
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        category: categories[0],
        message: "",
      });

      // Clear reCAPTCHA
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const grecaptcha = (window as any).grecaptcha;
      if (grecaptcha && grecaptcha.reset) {
        try { grecaptcha.reset(); } catch { /* ignore */ }
      }
    } catch {
      setApiError("network_error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const getApiErrorMessage = (): string => {
    switch (apiError) {
      case "recaptcha_failed":
        return "Security verification failed. Please refresh and try again.";
      case "lambda_error":
        return "There was an error sending your message. Please try again or email us directly.";
      case "network_error":
        return "Network error. Please check your connection and try again.";
      case "lambda_not_configured":
        return "The contact service is currently unavailable. Please email us directly.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 rounded-lg bg-green-50 border border-green-200 text-center">
        <p className="text-charcoal font-medium">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {apiError && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-center" role="alert">
          <p className="text-sm text-red-700">{getApiErrorMessage()}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
          {labels.name} <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="name" name="name" type="text" required value={formData.name}
          onChange={handleChange} aria-required="true" aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`w-full px-4 py-3 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
            errors.name ? "border-red-400 bg-red-50" : "border-charcoal/20 bg-offwhite"
          }`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">{errors.name}</p>
        )}
      </div>

      {/* Company (optional) */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-charcoal mb-2">
          {labels.company}
        </label>
        <input
          id="company" name="company" type="text" value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-charcoal/20 bg-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
          {labels.email} <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="email" name="email" type="email" required value={formData.email}
          onChange={handleChange} aria-required="true" aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full px-4 py-3 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
            errors.email ? "border-red-400 bg-red-50" : "border-charcoal/20 bg-offwhite"
          }`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">{errors.email}</p>
        )}
      </div>

      {/* Phone (optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
          {labels.phone}
        </label>
        <input
          id="phone" name="phone" type="tel" value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-charcoal/20 bg-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-charcoal mb-2">
          {labels.category} <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <select
          id="category" name="category" value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-charcoal/20 bg-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
          {labels.message} <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="message" name="message" required rows={5} value={formData.message}
          onChange={handleChange} aria-required="true" aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full px-4 py-3 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent resize-y ${
            errors.message ? "border-red-400 bg-red-50" : "border-charcoal/20 bg-offwhite"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">{errors.message}</p>
        )}
      </div>

      {/* reCAPTCHA */}
      <fieldset>
        <legend className="text-sm font-medium text-charcoal mb-3">
          Security verification
        </legend>
        <RecaptchaScript />
        <div ref={recaptchaRef} />
      </fieldset>

      <button
        type="submit" disabled={isSubmitting}
        className="w-full min-h-[44px] px-6 py-3 text-sm font-medium rounded bg-accent text-white hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : labels.submit}
      </button>
    </form>
  );
}
