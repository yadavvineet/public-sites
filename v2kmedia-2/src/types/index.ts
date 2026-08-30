export interface Capability {
  title: string;
  description: string;
  icon: "digital" | "print" | "custom" | "gifting";
}

export interface WhyV2KItem {
  title: string;
  description: string;
}

export interface ContactFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
  category?: string;
}

export type ApiErrorType =
  | "recaptcha_failed"
  | "lambda_error"
  | "network_error"
  | "lambda_not_configured"
  | null;

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  message: string;
  recaptchaToken: string;
}
