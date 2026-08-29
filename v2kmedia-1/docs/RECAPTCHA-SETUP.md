# Google reCAPTCHA Setup Guide

Step-by-step instructions for configuring Google reCAPTCHA v2 for the V2K Media contact form.

## What is reCAPTCHA?

Google reCAPTCHA protects your website from spam and abuse. The v2 "Checkbox" variant shows a simple "I'm not a robot" checkbox that users click. In the background, Google analyzes user behavior to determine if they're human.

## Step 1: Create reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **Create** (if you don't have any keys yet)
3. Select **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
4. Fill in:
   - **Label**: `V2K Media Website`
   - **Domains**: Add your domains:
     - `v2k.media`
     - `www.v2k.media` (if using a custom domain)
     - `localhost` (for local development)
   - **Accept the terms**
5. Click **Submit**
6. Copy:
   - **Site Key** (starts with `6L...`) — used in the browser
   - **Secret Key** (starts with `6L...`) — used server-side

## Step 2: Configure Website

### Local Development

Add to `.env.local`:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LyourSiteKeyHere
RECAPTCHA_SECRET_KEY=6LyourSecretKeyHere
```

### GitHub Actions

Add to repository secrets: **Settings → Secrets and variables → Actions**

| Secret Name | Value |
|-------------|-------|
| `RECAPTCHA_SITE_KEY` | Your site key (e.g., `6Lxxxxxx`) |
| `RECAPTCHA_SECRET_KEY` | Your secret key (e.g., `6Lxxxxxx`) |

### Production

The GitHub Actions workflow reads these from repository secrets and injects them into the build.

## Step 3: How It Works

### Client-Side Flow

1. The contact page loads the reCAPTCHA script from Google
2. A checkbox widget is rendered below the message field
3. When the user clicks "Send Enquiry", the widget returns a one-time token
4. The token is sent to the API endpoint with the form data

### Server-Side Flow (API Route)

1. The API route receives the token
2. It POSTs the token + your secret key to Google's siteverify API
3. Google returns `success: true/false` and a `score` (0.0–1.0)
4. If `success` is true and `score >= 0.5`, the request proceeds
5. Otherwise, the form submission is rejected

### Lambda-Side Flow (Defense in Depth)

1. The Lambda function also validates the token (even if the API route passed)
2. If the token is invalid, the Lambda returns an error without sending the email
3. This ensures that even if someone bypasses client-side validation, the email will not be sent.

## Step 4: Testing

### With Google's Test Keys

Google provides test keys that always pass:

- **Site Key**: `6LeIxAcTAAAAAJcZVRqyHh71UMIEZZQ如何才能有效利用量子计算`
- **Secret Key**: `6LeIxAcTAAAAAGG-VCISStgnz3XqURWn9mUEG1SA`

Use these during development. Replace with your real keys before deploying.

### Manual Test

1. Open the contact page in your browser
2. Complete the reCAPTCHA checkbox (it should show a green checkmark)
3. Fill out the form and submit
4. Check the browser console — you should see the reCAPTCHA token being sent

## Troubleshooting

| Issue | Solution |
|-------|----------|
| reCAPTCHA widget not showing | Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set correctly |
| "Invalid site key" error | Verify the site key matches your domain |
| "Missing or wrong domain" | Add your domain to the reCAPTCHA admin console |
| Form submits without reCAPTCHA | Ensure the reCAPTCHA script is loaded (check Network tab) |
| Score too low | Google's bot detection is conservative — ensure the domain is properly configured |
