# Deployment Guide

Instructions for deploying the V2K Media static site to AWS S3 or nginx.

## Prerequisites

- Node.js 20 or later
- Built site (run `npm run build` or use the GitHub Actions workflow)
- AWS account (for S3) or a server (for nginx)

## Option 1: AWS S3 Deployment

### Step 1: Create S3 Bucket

1. Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Click **Create bucket**
3. Bucket name: `v2k-media-site` (must be globally unique)
4. Region: `ap-south-1` (Mumbai) or your preferred region
5. Click **Create bucket**

### Step 2: Enable Static Website Hosting

1. Select your bucket
2. Go to **Properties** → **Static website hosting**
3. Click **Edit**
4. Enable: **Yes, use this bucket to host a website**
5. Index document: `index.html`
6. Error document: `404.html` (or leave blank)
7. Click **Save changes**

### Step 3: Set Bucket Policy

1. Go to **Permissions** → **Bucket policy**
2. Click **Edit** → **Policy editor**
3. Add:

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

4. Click **Save changes**

### Step 4: Upload Files

#### Via AWS CLI

```bash
aws s3 sync out/ s3://v2k-media-site/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable"
```

#### Via GitHub Actions

1. Add secrets to your repository:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_S3_BUCKET` (e.g., `v2k-media-site`)
2. Trigger the **Site Deploy** workflow: **Actions → Site Deploy → Run workflow**
3. Select `s3` as the deploy target

### Step 5: Access Your Site

The S3 website endpoint will be:
```
http://v2k-media-site.s3-website-ap-south-1.amazonaws.com
```

> **Note**: This is a HTTP endpoint. For HTTPS, use CloudFront (see below).

### Optional: CloudFront CDN

For HTTPS and better performance:

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. **Create distribution** → **Origin**: S3 bucket (website endpoint)
3. **Alternate domain names**: `v2k.media`, `www.v2k.media`
4. **SSL certificate**: Request or import a certificate in ACM
5. **Route 53**: Create an A record (Alias) pointing to the CloudFront distribution

## Option 2: Nginx Deployment

### Step 1: Prepare the Server

Ensure your server has:
- Ubuntu 20.04 or later (or your preferred Linux distro)
- Nginx installed (`sudo apt install nginx`)
- SSH access with a deploy user

### Step 2: Configure Nginx

Create `/etc/nginx/sites-available/v2kmedia`:

```nginx
server {
    listen 80;
    server_name v2k.media www.v2k.media;

    root /usr/share/nginx/html;
    index index.html;

    # Serve static files with long cache
    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/v2kmedia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 3: Deploy Files

#### Manual Deployment

```bash
# Copy the built site to the nginx root
sudo cp -r out/* /usr/share/nginx/html/
sudo systemctl reload nginx
```

#### Via GitHub Actions

1. Add secrets to your repository:
   - `NGINX_HOST` (e.g., `1.2.3.4` or `v2k.media`)
   - `NGINX_USER` (e.g., `deploy`)
   - `SSH_PRIVATE_KEY` (SSH private key for the deploy user)
2. Trigger the **Site Deploy** workflow with `nginx` as the deploy target

### Step 4: HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d v2k.media -d www.v2k.media
```

## Build-Time Color Swatches

You can build the site with different color palettes:

```bash
# Default (deep-blue)
npm run build

# Teal accent
SELECTED_SWATCH=teal npm run build

# Emerald accent
SELECTED_SWATCH=emerald npm run build

# Amber accent
SELECTED_SWATCH=amber npm run build
```

The selected swatch's accent colors are baked into the static HTML/CSS at build time. No runtime JavaScript is needed to change colors.

## Post-Deployment Checklist

- [ ] Site loads correctly at the deployment URL
- [ ] All pages render (`/`, `/about`, `/contact`)
- [ ] Contact form submits successfully (if Lambda is configured)
- [ ] reCAPTCHA widget displays (if configured)
- [ ] HTTPS is working (if using CloudFront or nginx with certbot)
- [ ] Custom domain DNS points to the deployment
- [ ] robots.txt and sitemap.xml are accessible
- [ ] All color swatches build without errors
