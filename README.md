# ProjectOne Productions

> Creating meaningful impact through innovative storytelling and community engagement

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

ProjectOne Productions is a modern, production-ready website built with Next.js 16, featuring comprehensive community engagement tools and storytelling capabilities.

## Features

- **Responsive Design** - Mobile-first design that works seamlessly on all devices
- **High Performance** - Optimized for Core Web Vitals and fast page loads
- **SEO Optimized** - Full metadata, sitemap, and SEO best practices
- **Accessibility** - WCAG 2.1 AA compliant
- **Security** - Industry-standard security headers and protections
- **TypeScript** - Full TypeScript support for type safety
- **Modern Stack** - Built with Next.js, React 19, Tailwind CSS, and shadcn/ui

## Getting Started

### Prerequisites

- Node.js 20.0.0 or higher
- npm 10+ or yarn 4+

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd project
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
```bash
cp .env.example .env.local
```

4. Run development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint --fix` - Fix ESLint issues

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   └── [features]/     # Feature components
├── public/             # Static assets
│   ├── robots.txt      # SEO robots directive
│   └── sitemap.xml     # SEO sitemap
├── lib/                # Utility functions
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Technology Stack

- **Framework**: Next.js 16
- **Runtime**: React 19.2
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner
- **Deployment**: Vercel (recommended)

## Configuration

### Environment Variables

See `.env.example` for all available options:

```env
NEXT_PUBLIC_APP_URL=https://projectone.productions
NODE_ENV=production
```

### Customization

- **Colors**: Edit CSS variables in `app/globals.css`
- **Fonts**: Update font imports in `app/layout.tsx`
- **Content**: Modify component files in `components/`

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guide.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically on push

## Performance

- **Page Load**: < 2 seconds
- **Core Web Vitals**: All green
- **SEO Score**: 95+
- **Lighthouse**: 90+

## Security

- X-Content-Type-Options header
- X-Frame-Options (SAMEORIGIN)
- X-XSS-Protection enabled
- Referrer-Policy configured
- Permissions-Policy restrictive
- HTTPS enforced
- No sensitive data in client bundle

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- High contrast options

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Performance Optimization

- Image optimization with Next.js Image
- Code splitting and lazy loading
- CSS minification and purging
- JavaScript minification
- Static generation where possible
- ISR (Incremental Static Regeneration)
- Caching strategies implemented

## SEO

- Meta tags and Open Graph
- XML sitemap
- robots.txt
- Structured data markup
- Mobile-friendly design
- Fast page load times
- Clean URL structure

## Development

### Code Style

- ESLint configured for code quality
- Prettier recommended for formatting
- TypeScript strict mode enabled
- Consistent naming conventions

### Testing

Run linting:
```bash
npm run lint
```

### Build Verification

Test production build locally:
```bash
npm run build
npm start
```

## Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Check documentation in DEPLOYMENT.md
- Review Next.js docs: https://nextjs.org/docs
- Check shadcn/ui docs: https://ui.shadcn.com

## Changelog

### v1.0.0
- Initial production release
- Full Next.js 16 implementation
- Complete component library
- Security and SEO optimizations

---

**Made with ❤️ for ProjectOne Productions**
