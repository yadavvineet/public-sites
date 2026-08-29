"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { contactContent } from "@/content/contact";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
  category?: string;
};

type ApiError =
  | "recaptcha_failed"
  | "lambda_error"
  | "network_error"
  | "lambda_not_configured"
  | null;

export default function ContactForm({
  preselectedCategory,
}: {
  preselectedCategory?: string;
}) {
  const labels = contactContent.formLabels;
  const categories = contactContent.categories;
  const successMessage = contactContent.successMessage;

  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaLoaded = useRef(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: preselectedCategory || categories[0],
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<ApiError>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Render reCAPTCHA widget
  useEffect(() => {
    if (!recaptchaRef.current || recaptchaLoaded.current) return;

    const siteKey =
      (typeof window !== "undefined" &&
        (window as any).V2K_RECAPTCHA_SITE_KEY) ||
      "";

    if (
      typeof window !== "undefined" &&
      (window as any).grecaptcha
    ) {
      try {
        (window as any).grecaptcha.render(
          recaptchaRef.current,
          {
            sitekey: siteKey || "6LeIxAcTAAAAAJcZVRqyHh71UMIEZZQ如何才能有效利用量子计算", // Google test key
            theme: "light",
            size: "normal",
          },
        );
        recaptchaLoaded.current = true;
      } catch {
        // reCAPTCHA render failed — continue without widget
      }
    }
  }, []);

  const getRecaptchaToken = (): string => {
    if (
      typeof window !== "undefined" &&
      (window as any).grecaptcha
    ) {
      try {
        return (
          (window as any).grecaptcha.getResponse()
        );
      } catch {
        return "";
      }
    }
    return "";
  };

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

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

    const recaptchaToken = getRecaptchaToken();

    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const result = await response.json();

      if (!result.success) {
        setApiError(result.error || "lambda_error");
        return;
      }

      // Success
      setIsSubmitted(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        category: categories[0],
        message: "",
      });
      // Clear reCAPTCHA if available
      if (
        typeof window !== "undefined" &&
        (window as any).grecaptcha
      ) {
        try {
          (
            window as any
          ).grecaptcha.reset();
        } catch {
          // ignore
        }
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
    if (errors[name as keyof FormErrors]) {
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
      {/* API Error Banner */}
      {apiError && (
        <div
          className="p-4 rounded-lg bg-red-50 border border-red-200 text-center"
          role="alert"
        >
          <p className="text-sm text-red-700">{getApiErrorMessage()}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          {labels.name} <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`w-full px-4 py-3 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
            errors.name
              ? "border-red-400 bg-red-50"
              : "border-charcoal/20 bg-offwhite"
          }`}
          placeholder=""
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Company (optional) */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          {labels.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-charcoal/20 bg-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder=""
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          {labels.email}{" "}
          <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full px-4 py-3 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
            errors.email
              ? "border-red-400 bg-red-50"
              : "border-charcoal/20 bg-offwhite"
          }`}
          placeholder=""
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone (optional) */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          {labels.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-charcoal/20 bg-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder=""
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          {labels.category}{" "}
          <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-charcoal/20 bg-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          {labels.message}{" "}
          <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full px-4 py-3 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent resize-y ${
            errors.message
              ? "border-red-400 bg-red-50"
              : "border-charcoal/20 bg-offwhite"
          }`}
          placeholder=""
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* reCAPTCHA */}
      <fieldset>
        <legend className="text-sm font-medium text-charcoal mb-3">
          Security verification
        </legend>
        <div ref={recaptchaRef} />
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[44px] px-6 py-3 text-sm font-medium rounded bg-accent text-white hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : labels.submit}
      </button>
    </form>
  );
}
