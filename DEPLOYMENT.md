# Deployment Guide

This guide covers production deployment of ProjectOne Productions website.

## Prerequisites

- Node.js 20+
- npm or yarn
- GitHub account with repository access
- Vercel account (for hosting)

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the optimal choice as it's built by Next.js creators.

#### Setup

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_APP_URL`: Your production domain

#### Automatic Deployment

Once connected, deployments happen automatically:
- Pushes to `main` → Preview deployment
- Pushes to `production` → Production deployment
- Pull requests → Preview URLs for testing

### Option 2: Self-Hosted

#### Requirements
- Linux server (Ubuntu 20.04+ recommended)
- Node.js 20+
- PM2 or similar process manager
- Nginx or Apache for reverse proxy
- SSL certificate (Let's Encrypt recommended)

#### Steps

1. Clone repository
```bash
git clone <your-repo-url>
cd project
```

2. Install dependencies
```bash
npm ci
```

3. Build application
```bash
npm run build
```

4. Create PM2 ecosystem config (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'projectone',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_APP_URL: 'https://projectone.productions',
    },
  }],
};
```

5. Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

## Environment Variables

Set these in your hosting platform:

- `NEXT_PUBLIC_APP_URL` - Your production domain URL
- `NODE_ENV` - Set to `production`

## Pre-Deployment Checklist

- [ ] All tests pass (`npm run test`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] All environment variables are set
- [ ] SEO metadata is configured
- [ ] Analytics are configured (if used)
- [ ] Security headers are in place
- [ ] SSL certificate is valid
- [ ] Database migrations are applied (if applicable)
- [ ] Backup of current production is available

## Monitoring

### Health Check

Regular health checks ensure uptime:
```bash
curl https://projectone.productions
```

### Logs

Check application logs for errors:
- Vercel: Dashboard → Deployments → Logs
- Self-hosted: `pm2 logs projectone`

### Performance

Monitor using:
- Google PageSpeed Insights
- Vercel Analytics
- Web Vitals

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Click the previous successful deployment
3. Click "Promote to Production"

### Self-Hosted
1. Identify last stable commit
2. Revert: `git revert <commit-hash>`
3. Rebuild: `npm run build`
4. Restart: `pm2 restart projectone`

## Security Best Practices

- Keep dependencies updated: `npm update`
- Rotate security credentials regularly
- Monitor security advisories: `npm audit`
- Maintain backups of all data
- Use HTTPS everywhere
- Implement rate limiting
- Validate all user inputs

## Support

For deployment issues:
1. Check logs
2. Verify environment variables
3. Ensure all dependencies installed
4. Test build locally
5. Contact hosting provider support
