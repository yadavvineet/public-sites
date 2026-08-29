# Lambda Setup Guide

Step-by-step instructions for configuring the V2K Media contact Lambda function.

## Prerequisites

- AWS account with billing activated
- SES verified identity (email or domain)
- IAM user or role with SES permissions

## Step 1: Verify SES Identity

1. Go to [AWS SES Console](https://console.aws.amazon.com/ses/)
2. In the left sidebar, click **Identities**
3. Click **Create identity**
4. Enter your email address (e.g., `contact@v2k.media`) or your domain
5. Click **Create identity**
6. **For email verification**: Check the inbox of the email address and click the confirmation link
7. **For domain verification**: Add the CNAME records provided by SES to your DNS

> **Note**: In the SES sandbox (new accounts), you can only send emails to verified addresses. To send to arbitrary addresses, request production access.

## Step 2: Create IAM Policy

1. Go to [IAM Console](https://console.aws.amazon.com/iam/)
2. Click **Policies** → **Create policy**
3. Switch to the **JSON** tab:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

4. Click **Next**
5. Name: `V2KMediaSESSendEmail`
6. Description: `Allows sending emails via SES for V2K Media contact form`
7. Click **Create policy**

## Step 3: Create Lambda Function

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/)
2. Click **Create function**
3. Select **Author from scratch**:
   - **Function name**: `v2k-contact-lambda`
   - **Runtime**: Node.js 20.x
   - **Architecture**: x86_64
   - **Permissions**: Use an existing role (create a new role with the SES policy, or use a role with basic Lambda permissions and attach the SES policy)
4. Click **Create function**
5. Upload your `lambda-package.zip`:
   - In the function code section, click **Upload from** → `.zip file`
   - Select `lambda-package.zip` (built via `npm run package`)
6. Verify the handler: `dist/handler.handler`

## Step 4: Configure Environment Variables

1. In the function configuration, scroll to **Environment variables**
2. Add:

| Key | Value |
|-----|-------|
| `SES_SEND_TO` | `contact@v2k.media` (your verified SES identity) |
| `RECAPTCHA_SECRET_KEY` | Your Google reCAPTCHA v2 secret key |
| `AWS_REGION` | `ap-south-1` (or your region) |

## Step 5: Enable Lambda URL

1. Go to **Configuration** → **Lambda URL**
2. Click **Create function URL**
3. **Auth type**: NONE (the API route handles authentication)
4. **Allow cross-origin**: Leave as default (the API route handles CORS)
5. Click **Save**
6. Copy the **Function URL** (e.g., `https://xxxxx.execute-api.ap-south-1.amazonaws.com/lambda-url/`)
7. Add this URL to your website's `LAMBDA_URL` environment variable

## Step 6: Test the Function

### Via Lambda Console

1. In the function, click **Test** → **Test event** → **Create new event**
2. Event name: `ContactFormTest`
3. Event JSON:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+91-9876543210",
  "company": "Test Company",
  "category": "General Enquiry",
  "message": "This is a test message from the contact form.",
  "recaptchaToken": "test-token"
}
```

4. Click **Test**

### Via Lambda URL

```bash
curl -X POST "https://xxxxx.execute-api.ap-south-1.amazonaws.com/lambda-url/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91-9876543210",
    "company": "Test Company",
    "category": "General Enquiry",
    "message": "This is a test message.",
    "recaptchaToken": "test-token"
  }'
```

Expected response: `{"success":true}`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "SES_SEND_TO not configured" | Check environment variables in Lambda console |
| "reCAPTCHA validation failed" | Verify RECAPTCHA_SECRET_KEY is correct |
| "AccessDenied" on SES | Attach the SES SendEmail policy to the Lambda execution role |
| "ExpiredToken" | Check that AWS credentials are valid |
| Sandbox restriction | Request production access in SES console |
