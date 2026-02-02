# Kalicharan Mahasivabhattu - Personal Website

A modern, clean personal website built with Next.js, TypeScript, and Tailwind CSS. Designed to be minimal, elegant, and easily maintainable through content files.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (Static Export)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React

## 📦 Features

- **Static Site Generation**: Deployable on GitHub Pages with no server required
- **Content-Driven**: All content managed through JSON and Markdown files
- **Responsive Design**: Mobile-first approach with clean typography
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Zero Dependencies**: No backend, database, or build-time API calls required

## 📁 Project Structure

```
├── src/
│   ├── content/           # Content files
│   │   ├── offerings.json # Services and offerings data
│   │   ├── courses.json   # Courses and workshops data
│   │   └── posts/        # Blog posts in Markdown
│   │       ├── the-clarity-first-approach.md
│   │       ├── building-in-public.md
│   │       └── ai-assisted-learning.md
│   ├── config/           # Configuration files
│   │   └── site.json     # Site-wide configuration
│   ├── app/
│   │   ├── page.tsx      # Main landing page
│   │   ├── layout.tsx    # Root layout
│   │   └── posts/[slug]/page.tsx  # Blog post pages
│   ├── components/ui/     # shadcn/ui components
│   └── lib/
│       └── utils.ts      # Utility functions
└── public/             # Static assets
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ or Bun
- Git

### Getting Started

1. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

2. **Run development server**:
   ```bash
   bun run dev
   # or
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

### Building for Production

```bash
bun run build
# or
npm run build
```

This creates an `out/` directory with static HTML, CSS, and JavaScript files ready for deployment.

## 📝 Content Management

### Site Configuration

Edit `src/config/site.json` to update:
- Site name and tagline
- Contact information and social links
- Section visibility (show/hide sections)
- SEO metadata
- Call-to-action text and links

```json
{
  "name": "Your Name",
  "tagline": "Your positioning",
  "description": "Site description",
  "primaryCTA": {
    "text": "Book a Session",
    "link": "https://calendly.com/your-link"
  },
  "sections": {
    "hero": true,
    "about": true,
    "offerings": true,
    "courses": true,
    "mentorship": true,
    "writing": true,
    "contact": true
  }
}
```

### Managing Offerings

Edit `src/content/offerings.json` to add, remove, or modify services:

```json
{
  "offerings": [
    {
      "id": "1",
      "title": "Service Title",
      "for": "Target audience description",
      "outcome": "What they'll achieve",
      "ctaLink": "https://...",
      "ctaText": "Button text"
    }
  ]
}
```

### Managing Courses

Edit `src/content/courses.json` to manage course listings:

```json
{
  "courses": [
    {
      "id": "1",
      "title": "Course Title",
      "description": "Course description",
      "status": "live",  // or "upcoming"
      "format": "async",  // or "1:1", "cohort"
      "ctaText": "Enroll Now",
      "ctaLink": "#enroll"
    }
  ]
}
```

### Managing Blog Posts

Create new posts in `src/content/posts/*.md` with frontmatter:

```markdown
---
title: "Post Title"
slug: "post-slug"
date: "2024-01-15"
excerpt: "Short description"
---

# Post Content

Your markdown content here...
```

**Important**: Ensure each post has a unique `slug` in frontmatter.

## 🚀 Deploying to GitHub Pages

### Prerequisites

1. Repository on GitHub
2. GitHub Pages enabled in repository settings
3. Custom domain configured (if using mkalicharan.com)

### Setup Steps

#### 1. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

#### 2. Push to GitHub

The `.github/workflows/deploy.yml` file is already set up and will automatically:
- Build the site using Bun
- Create static export in `out/` directory
- Upload to GitHub Pages
- Deploy to `mkalicharan.com`

```bash
# Make your changes
git add .
git commit -m "Update content"
git push origin main
```

#### 3. Automatic Deployment

- **GitHub Actions** will run automatically on push to `main` branch
- Build and deploy takes ~2-5 minutes
- Check **Actions** tab in GitHub to see deployment status
- Visit your site: https://mkalicharan.com

### Troubleshooting

#### "No index file" Error

If GitHub Pages shows "no index file":

1. Check the **Actions** tab - see if workflow failed
2. Verify `.nojekyll` file exists in repository
3. Check that `out/` directory contains `index.html`
4. Try running the build locally:
   ```bash
   bun run build
   ls -la out/
   ```
5. Ensure `.nojekyll` is committed (it should be in your repo)

#### Domain Not Working

For custom domain `mkalicharan.com`:

1. **CNAME file**: Located at `public/CNAME` (already created)
2. **DNS Settings**: Add CNAME record:
   - Type: CNAME
   - Name: @ (or your subdomain)
   - Value: `your-username.github.io`
3. **Wait**: DNS propagation can take 24-48 hours
4. **GitHub Pages Settings**: Ensure custom domain is set correctly

### Manual Deployment (Optional)

If you prefer manual deployment:

```bash
# 1. Build the site
bun run build

# 2. The out/ directory now contains index.html and all static files

# 3. Copy out/ directory contents to your server or host
```

### Custom Domain Setup

1. **CNAME file**: Already created at `public/CNAME` with:
   ```
   mkalicharan.com
   ```

2. **DNS Configuration** (at your domain registrar):
   - Add CNAME record: `mkalicharan.com` → `your-username.github.io`
   - Or add A records to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

3. **Verify**: Visit GitHub Pages settings to confirm domain is listed

## 🎨 Customization

### Colors

Edit `src/app/globals.css` to customize color scheme. Current theme uses Tailwind CSS default colors (slate palette).

### Typography

The site uses Inter font. To change fonts:
1. Update `src/app/layout.tsx` to import a different Google Font
2. Apply the font variable to body

### Sections

To hide a section, set it to `false` in `src/config/site.json`:
```json
{
  "sections": {
    "writing": false  // This will hide the blog section
  }
}
```

## 🔍 SEO

The site includes:
- Semantic HTML structure
- Meta tags for title, description, and keywords
- Open Graph tags for social sharing
- Twitter Card support

Update `src/app/layout.tsx` and `config/site.json` to customize SEO metadata.

## 📱 Responsive Design

The site is mobile-first with breakpoints at:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Test your content changes on different screen sizes to ensure optimal appearance.

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:
1. Clear the cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && bun install`
3. Check for TypeScript errors: `bun run lint`

### Content Not Updating

If content changes aren't reflected:
1. Ensure JSON files are valid JSON (use a JSON validator)
2. Check Markdown frontmatter syntax
3. Clear cache and rebuild

### GitHub Pages Not Deploying

1. Check GitHub Actions logs for errors
2. Ensure repository permissions are correct
3. Verify `out/` directory exists and contains files
4. Check Pages configuration in repository settings

## 📄 License

This project is proprietary and confidential.

## 👤 Contact

For questions or support:
- Email: hello@mkalicharan.com
- Website: https://mkalicharan.com

---

Built with clarity and purpose.
