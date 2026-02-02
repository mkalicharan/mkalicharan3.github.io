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

This creates a `out/` directory with static HTML, CSS, and JavaScript files ready for deployment.

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

**Important**: Ensure each post has a unique `slug` in the frontmatter.

## 🚀 Deploying to GitHub Pages

### Option 1: GitHub Actions (Recommended)

1. **Create `.github/workflows/deploy.yml`**:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Setup Bun
           uses: oven-sh/setup-bun@v2

         - name: Install dependencies
           run: bun install

         - name: Build
           run: bun run build

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./out

         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

2. **Configure GitHub Pages**:
   - Go to Repository Settings → Pages
   - Source: GitHub Actions
   - Save

3. **Push to trigger deployment**:
   ```bash
   git add .
   git commit -m "Deploy site"
   git push origin main
   ```

### Option 2: Manual Deployment

1. **Build the site**:
   ```bash
   bun run build
   ```

2. **Push to `gh-pages` branch**:
   ```bash
   git subtree push --prefix out origin gh-pages
   ```

3. **Configure GitHub Pages**:
   - Go to Repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Save

### Custom Domain Setup

1. **Create `CNAME` file** in `public/` directory:
   ```
   mkalicharan.com
   ```

2. **Configure DNS**:
   - Add CNAME record pointing to `your-username.github.io`
   - Or add A records for GitHub Pages IP addresses

3. **Wait for propagation** (can take up to 24 hours)

## 🎨 Customization

### Colors

Edit `src/app/globals.css` to customize the color scheme. Current theme uses Tailwind CSS default colors (slate palette).

### Typography

The site uses Inter font. To change fonts:
1. Update `src/app/layout.tsx` to import a different Google Font
2. Apply the font variable to the body

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
3. Verify the `out/` directory exists and contains files
4. Check Pages configuration in repository settings

## 📄 License

This project is proprietary and confidential.

## 👤 Contact

For questions or support:
- Email: hello@mkalicharan.com
- Website: https://mkalicharan.com

---

Built with clarity and purpose.
