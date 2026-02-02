import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import siteConfig from '@/config/site.json';

function parseMarkdownFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { content, frontmatter: {} };
  }

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter: Record<string, string> = {};

  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  });

  return { content: body, frontmatter };
}

function getPostBySlug(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  
  try {
    const files = fs.readdirSync(postsDirectory);
    const matchingFile = files.find(file => {
      const filePath = path.join(postsDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter } = parseMarkdownFrontmatter(fileContent);
      return frontmatter.slug === slug;
    });

    if (!matchingFile) {
      return null;
    }

    const filePath = path.join(postsDirectory, matchingFile);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content, frontmatter } = parseMarkdownFrontmatter(fileContent);

    return {
      slug: frontmatter.slug || matchingFile.replace(/\.md$/, ''),
      title: frontmatter.title || matchingFile.replace(/\.md$/, ''),
      date: frontmatter.date || '',
      excerpt: frontmatter.excerpt || '',
      content
    };
  } catch (error) {
    return null;
  }
}

function getAllPostSlugs() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter } = parseMarkdownFrontmatter(fileContent);
      return frontmatter.slug || fileName.replace(/\.md$/, '');
    });
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({
    slug: slug,
  }));
}

function renderMarkdown(content: string) {
  // Simple markdown to HTML conversion
  let html = content;

  // Escape HTML
  html = html.replace(/&/g, '&amp;');
  html = html.replace(/</g, '&lt;');
  html = html.replace(/>/g, '&gt;');

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4 text-foreground text-teal-700">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6 text-foreground text-teal-800">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-6 text-foreground text-teal-900">$1</h1>');

  // Bold and Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-teal-600 hover:text-teal-700 underline decoration-2 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4 rounded-lg overflow-x-auto my-6 text-sm shadow-lg"><code>$2</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded text-sm font-mono border border-teal-200">$1</code>');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-teal-300 pl-4 italic text-slate-600 bg-teal-50/50 py-4 rounded-r-lg my-6">$1</blockquote>');

  // Lists (ordered and unordered)
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal text-foreground">$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li class="ml-6 list-disc text-foreground">$1</li>');

  // Wrap consecutive list items
  html = html.replace(/(<li class="[^"]+">.*<\/li>\n?)+/g, (match) => {
    return `<ul class="space-y-2 my-6">${match}</ul>`;
  });

  // Horizontal rule
  html = html.replace(/^---$/gim, '<hr className="border-t border-slate-200 my-8" />');

  // Paragraphs (wrap non-block elements)
  html = html.split('\n\n').map(paragraph => {
    if (paragraph.trim() === '') return '';
    if (paragraph.startsWith('<') && ['<h1', '<h2', '<h3', '<ul', '<pre', '<blockquote', '<hr'].some(tag => paragraph.startsWith(tag))) {
      return paragraph;
    }
    return `<p class="text-lg text-muted-foreground leading-relaxed mb-6">${paragraph.trim()}</p>`;
  }).join('\n');

  return html;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const config = siteConfig as any;
  const htmlContent = renderMarkdown(post.content);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm" className="hover:bg-teal-50 hover:text-teal-600">
            <a href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-teal-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(/images/writing.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/80 text-sm md:text-base">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
              <span className="w-1 h-1 bg-white/60 rounded-full" />
              <span>{post.excerpt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="flex-1 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-slate prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-em:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground prose-code:text-foreground"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <footer className="mt-16 pt-8 border-t border-slate-200">
            <div className="p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Enjoyed this post?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's connect and continue the conversation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                  <a href={`mailto:${config.socialLinks.email}`}>
                    Email Me
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
                  <a href={config.primaryCTA.link}>
                    {config.primaryCTA.text}
                  </a>
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-auto border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-xl">
              <span className="text-2xl font-bold text-white">
                {config.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
          </div>
          <p className="text-sm text-white/80 mb-2">
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/60">
            Built with clarity and purpose.
          </p>
        </div>
      </footer>
    </main>
  );
}
