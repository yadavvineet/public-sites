# Configuration Setup Guide

This guide covers setup for all systems used by the V2K Media website: Lambda, Google reCAPTCHA, GitHub Actions, and color swatches.

## 1. Google reCAPTCHA Setup

### Getting Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Select **reCAPTCHA v2** → **I'm not a robot" Checkbox**
3. Add your domain(s) (e.g., `v2k.media`, `localhost`)
4. Click **Create**
5. Copy:
   - **Site Key** (public — used in the browser)
   - **Secret Key** (private — used server-side)

### Configuration

| Variable | Where | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Website `.env.local` or GitHub Actions secrets | Visible in browser, used to render the widget |
| `RECAPTCHA_SECRET_KEY` | Website `.env.local` or GitHub Actions secrets | Server-side only, used to validate tokens |

### Testing

1. Open the contact page in a browser
2. Complete the reCAPTCHA checkbox
3. Submit the form — check the browser console for the token

## 2. Lambda Setup

### AWS SES Identity

Before sending emails, verify your identity in SES:

1. Go to AWS SES console
2. **Identities** → **Create identity**
3. Enter your email (e.g., `contact@v2k.media`) or domain
4. Verify via the confirmation email or DNS CNAME record

### Lambda Function

1. Go to AWS Lambda console
2. **Create function** → **Author from scratch**
3. Settings:
   - Name: `v2k-contact-lambda`
   - Runtime: **Node.js 20.x**
   - Architecture: **x86_64**
4. Upload `lambda-package.zip` (built via GitHub Actions or locally)
5. Handler: `dist/handler.handler`
6. Memory: 128 MB, Timeout: 30 seconds
7. **Add environment variables**:
   - `SES_SEND_TO` = `contact@v2k.media` (or your verified identity)
   - `RECAPTCHA_SECRET_KEY` = your Google reCAPTCHA secret key
   - `AWS_REGION` = `ap-south-1` (or your region)
8. **Enable Lambda URL**:
   - Configuration → **Configuration** → **Lambda URL**
   - Auth: **NONE** (the API route handles auth)
   - Click **Save**
9. Copy the Lambda URL for use in the website

### IAM Permissions

Create a custom IAM policy:

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

Attach this policy to the Lambda execution role.

## 3. GitHub Actions Configuration

### Required Secrets

Configure these in your repository: **Settings → Secrets and variables → Actions**

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key for S3 upload |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key for S3 upload |
| `AWS_S3_BUCKET` | S3 bucket name (e.g., `v2k-media-site`) |
| `AWS_REGION` | AWS region (e.g., `ap-south-1`) |
| `RECAPTCHA_SITE_KEY` | Google reCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA secret key |
| `NGINX_HOST` | (Optional) Server hostname for nginx deployment |
| `NGINX_USER` | (Optional) SSH user for nginx deployment |
| `SSH_PRIVATE_KEY` | (Optional) SSH private key for nginx deployment |

### Running Workflows

1. Go to **Actions** tab in your repository
2. Select **Site Deploy** → **Run workflow**
3. Choose:
   - **Color swatch**: deep-blue, teal, emerald, or amber
   - **Deploy target**: s3 or nginx
4. Click **Run workflow**

## 4. Color Swatch Configuration

### Available Swatches

| ID | Accent | Accent Hover |
|----|--------|-------------|
| `deep-blue` | `#1e40af` | `#1a3a9e` |
| `teal` | `#0d9488` | `#0f766e` |
| `emerald` | `#059669` | `#047857` |
| `amber` | `#d97706` | `#b45309` |

### Adding a Custom Swatch

1. Create a new JSON file in `src/styles/swatches/`:

```json
{
  "name": "Your Color",
  "id": "your-color",
  "colors": {
    "charcoal": "#1c1c1e",
    "offwhite": "#fafafa",
    "accent": "#your-hex",
    "accent-hover": "#your-hover-hex",
    "muted": "#6b7280",
    "surface": "#f3f4f6",
    "bg-dark": "#111827"
  }
}
```

2. Add an import and entry to `src/styles/swatches/index.ts`:

```ts
import yourColor from "./your-color.json";
// ...
export const swatches = { deepBlue, teal, emerald, amber, yourColor } as const;
```

3. Add `"your-color"` to the `options` array in `.github/workflows/site-deploy.yml`

### Build-Time Behavior

The selected swatch's accent colors are injected into `globals.css` **at build time** via `scripts/build-swatches.ts`. The static output contains the baked-in colors — no JavaScript is needed at runtime.

## 5. S3 Deployment

### Bucket Setup

1. Create an S3 bucket (e.g., `v2k-media-site`)
2. Enable **Static website hosting**:
   - Error document: `404.html` (or let Next.js handle it)
3. Set bucket policy for public read:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::v2k-media-site/*"
    }
  ]
}
```

4. Disable "Block all public access" (required for static hosting)

### Custom Domain (Optional)

For a custom domain (e.g., `www.v2k.media`):

1. Create a CloudFront distribution
2. Origin: S3 bucket (website endpoint)
3. Alternate domain names: `www.v2k.media`
4. Create a Route 53 A record (Alias) pointing to CloudFront

## 6. Nginx Deployment

### Server Configuration

```nginx
server {
    listen 80;
    server_name v2k.media www.v2k.media;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets for 1 year
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Deploy Files

```bash
# Copy the contents of out/ to the nginx root
sudo cp -r out/* /usr/share/nginx/html/
sudo systemctl reload nginx
```
