# Setup & Deployment Guide

Complete step-by-step instructions to get ProjectOne Productions production-ready and deployed.

## Initial Setup

### 1. Repository Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd project

# Install dependencies
npm ci

# Verify installation
npm run lint
npm run build
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your production values
nano .env.local
```

Required variables:
- `NEXT_PUBLIC_APP_URL`: Your production domain (e.g., `https://projectone.productions`)
- `NODE_ENV`: Set to `production`

### 3. Local Testing

```bash
# Development server
npm run dev
# Visit http://localhost:3000

# Build & start production locally
npm run build
npm start
# Visit http://localhost:3000
```

Verify:
- Homepage loads without errors
- All navigation links work
- Forms submit correctly
- No console errors
- Responsive on mobile

## Deployment to Vercel

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository

### Step-by-Step

#### 1. Connect Repository

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Find and select your GitHub repository
4. Click "Import"

#### 2. Configure Project

Vercel will auto-detect Next.js. Verify:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm ci`

#### 3. Add Environment Variables

1. In Vercel dashboard, go to Settings → Environment Variables
2. Add each variable:

| Key | Value | Scope |
|-----|-------|-------|
| `NEXT_PUBLIC_APP_URL` | Your domain | Production |
| `NODE_ENV` | `production` | Production |

#### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete (typically 2-5 minutes)
3. Once complete, visit the preview URL

#### 5. Connect Custom Domain

1. Go to Settings → Domains
2. Add your domain (e.g., `projectone.productions`)
3. Update your domain's DNS records according to Vercel's instructions

Common DNS providers:
- **Cloudflare**: Update CNAME records
- **Route53** (AWS): Add alias records
- **Namecheap**: Update CNAME records
- **GoDaddy**: Update CNAME records

#### 6. Enable Production Deployment

1. Set production branch (default: `main`)
2. Enable automatic deployments
3. Configure preview deployments for PRs

### Verification Checklist

- [ ] Homepage loads on production domain
- [ ] All pages accessible
- [ ] Forms working
- [ ] No 404 errors
- [ ] Performance acceptable
- [ ] SSL certificate active
- [ ] SEO meta tags visible
- [ ] Analytics tracking

## Alternative: Self-Hosted on Linux

### Prerequisites
- Linux server (Ubuntu 20.04 LTS recommended)
- Node.js 20+
- Nginx or Apache
- SSL certificate (Let's Encrypt)
- Domain name

### Installation

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

#### 2. Clone & Install

```bash
# Create app directory
sudo mkdir -p /var/www/projectone
cd /var/www/projectone

# Clone repository
git clone <your-repo-url> .

# Install dependencies
npm ci
```

#### 3. Build Application

```bash
# Set environment
export NODE_ENV=production
export NEXT_PUBLIC_APP_URL=https://projectone.productions

# Build
npm run build
```

#### 4. Start with PM2

```bash
# Start application
pm2 start npm --name "projectone" -- start

# Save PM2 configuration
pm2 save

# Enable startup on reboot
pm2 startup
```

#### 5. Configure Nginx

Create `/etc/nginx/sites-available/projectone`:

```nginx
server {
    listen 80;
    server_name projectone.productions;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name projectone.productions;

    # SSL certificates (from Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/projectone.productions/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/projectone.productions/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location /_next/static/ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 6. Enable Site & Install SSL

```bash
# Enable Nginx site
sudo ln -s /etc/nginx/sites-available/projectone /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Install SSL (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d projectone.productions

# Auto-renew SSL
sudo systemctl enable certbot.timer
```

#### 7. Verify

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs projectone

# Test site
curl https://projectone.productions
```

## Monitoring & Maintenance

### Health Checks

Set up monitoring to ensure uptime:

```bash
# Simple health check script
curl -f https://projectone.productions/api/health || alert
```

### Log Monitoring

```bash
# Vercel
# Dashboard → Deployments → Logs

# PM2
pm2 logs projectone
pm2 save logs  # To file

# Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Updates

Keep your application secure:

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Rebuild and restart
npm run build
pm2 restart projectone  # or redeploy on Vercel
```

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm ci
npm run build
```

### Slow Performance

1. Check Core Web Vitals in Lighthouse
2. Review image optimization
3. Check database queries (if applicable)
4. Analyze bundle size: `npm run build -- --analyze`

### SSL Issues

```bash
# Check certificate
openssl s_client -connect projectone.productions:443

# Renew certificate
sudo certbot renew --force-renewal
```

## Support

- **Vercel**: https://vercel.com/support
- **Next.js**: https://nextjs.org/docs
- **Let's Encrypt**: https://letsencrypt.org/support
- **Nginx**: https://nginx.org/en/docs

---

**Questions?** Review DEPLOYMENT.md for additional details.
