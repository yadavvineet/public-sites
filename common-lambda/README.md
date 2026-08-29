# V2K Media Contact Lambda

AWS Lambda function that receives contact form submissions, validates Google reCAPTCHA tokens, and sends emails via AWS SES.

## What It Does

1. Receives a POST request with contact form data + reCAPTCHA token
2. Validates the reCAPTCHA token against Google's API (server-side)
3. If valid, sends an email to the configured recipient via AWS SES
4. Returns a JSON response indicating success or failure

## Prerequisites

- AWS account with verified SES identity (email or domain)
- AWS credentials with SES SendEmail permission
- Google reCAPTCHA v2 site key and secret key

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| SES_SEND_TO | Yes | Recipient email address (e.g., contact@v2k.media) |
| RECAPTCHA_SECRET_KEY | Yes | Google reCAPTCHA site secret key |
| AWS_REGION | No | AWS region (default: ap-south-1) |

### Lambda Console Setup

1. Go to AWS Lambda console
2. Create a new function:
   - Runtime: Node.js 20.x
   - Handler: dist/handler.handler
   - Memory: 128 MB
   - Timeout: 30 seconds
3. Upload the lambda-package.zip (built via npm run package)
4. Add environment variables as listed above
5. Enable Lambda URL (no API Gateway needed) — set authentication to "NONE"
6. Note the Lambda URL for use in the website's LAMBDA_URL environment variable

### IAM Permissions

The Lambda execution role needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": "*"
    }
  ]
}
```

## Local Development

```bash
cd common-lambda
npm ci
npm run build    # Compile TypeScript
npm run package  # Create lambda-package.zip
```

## Testing

### Via Lambda URL

```bash
curl -X POST "https://xxxxx.execute-api.ap-south-1.amazonaws.com/lambda-url/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91-9876543210",
    "company": "Test Co",
    "category": "General Enquiry",
    "message": "This is a test message.",
    "recaptchaToken": "test-token"
  }'
```

## File Structure

```
common-lambda/
├── src/
│   ├── handler.ts           # Lambda entry point
│   ├── recaptcha-validator.ts # Google reCAPTCHA validation
│   └── email-sender.ts      # AWS SES email sending
├── package.json
├── package.js               # ZIP packaging script
├── tsconfig.json
└── README.md
```

## Dependencies

- @aws-sdk/client-ses — AWS SES client
- @aws-sdk/credential-provider-node — Default credential chain
