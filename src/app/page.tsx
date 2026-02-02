import siteConfig from '@/config/site.json';
import offeringsData from '@/content/offerings.json';
import coursesData from '@/content/courses.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import fs from 'fs';
import path from 'path';

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

function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { content, frontmatter } = parseMarkdownFrontmatter(fileContent);
      
      return {
        slug: frontmatter.slug || fileName.replace(/\.md$/, ''),
        title: frontmatter.title || fileName.replace(/\.md$/, ''),
        date: frontmatter.date || '',
        excerpt: frontmatter.excerpt || '',
        content
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export default function Home() {
  const config = siteConfig as any;
  const offerings = offeringsData.offerings;
  const courses = coursesData.courses;
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      {config.sections.hero && (
        <section className="relative py-20 md:py-40 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-2xl">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {config.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
              {config.name}
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 mb-8 font-medium">
              {config.tagline}
            </p>
            <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              {config.description}
            </p>
            <Button asChild size="lg" className="text-base bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl transition-all">
              <a href={config.primaryCTA.link}>
                {config.primaryCTA.text}
              </a>
            </Button>
          </div>
        </section>
      )}

      {/* About Section */}
      {config.sections.about && (
        <section id="about" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-background to-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
                  About <span className="text-teal-600">Kalicharan</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I believe in <span className="text-teal-600 font-semibold">clarity over complexity</span>. In a world of endless options and constant noise, 
                    I help people cut through the confusion and find their path forward.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    As a technologist with years of experience building products and leading teams, 
                    I've learned that the best solutions come from understanding the problem deeply, 
                    not rushing to the first solution.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    My mentoring approach is grounded in practical experience and a genuine desire to help others grow. 
                    Whether you're navigating a career transition, building your first product, or seeking to integrate 
                    AI into your workflow, I bring clarity, structure, and actionable guidance to the conversation.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    No jargon, no fluff—just <span className="font-semibold text-foreground">honest, helpful conversations that move you forward</span>.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/mentorship.jpg" 
                    alt="Kali Charan mentoring" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-100 rounded-full -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-100 rounded-full -z-10" />
              </div>
            </div>
          </div>
        </section>
      )}

      <Separator />

      {/* Offerings Section */}
      {config.sections.offerings && (
        <section id="offerings" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                My <span className="text-teal-600">Offerings</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ways I can help you move forward
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {offerings.map((offering: any, index: number) => (
                <Card key={offering.id} className="border-slate-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 mb-4 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl text-foreground">{offering.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-teal-700 mb-1">For:</p>
                      <p className="text-sm text-foreground">{offering.for}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-teal-700 mb-1">You'll get:</p>
                      <p className="text-sm text-foreground">{offering.outcome}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                      <a href={offering.ctaLink}>{offering.ctaText}</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Separator />

      {/* Courses Section */}
      {config.sections.courses && (
        <section id="courses" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-background to-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                <span className="text-teal-600">Courses</span> & Workshops
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn at your own pace or join a cohort
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((course: any, index: number) => (
                <Card key={course.id} className="border-slate-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="/images/learning.jpg" 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <Badge 
                      className={`absolute top-4 right-4 ${course.status === 'live' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-slate-500 hover:bg-slate-600'}`}
                    >
                      {course.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-foreground">{course.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                      {course.format}
                    </Badge>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                      <a href={course.ctaLink}>{course.ctaText}</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Separator />

      {/* Mentorship Section */}
      {config.sections.mentorship && (
        <section id="mentorship" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-teal-50 via-cyan-50 to-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Career Advice & <span className="text-teal-600">Mentorship</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-12">
                  Focused 1:1 sessions to help you move forward with clarity
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-sm font-bold">1</span>
                      Who It Helps
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Early-career professionals</li>
                      <li>• Mid-career transitions</li>
                      <li>• Aspiring leaders</li>
                      <li>• Solo founders</li>
                      <li>• Anyone feeling stuck</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-sm font-bold">2</span>
                      How It Works
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Book a 60-minute session</li>
                      <li>• Share context beforehand</li>
                      <li>• Focused, actionable discussion</li>
                      <li>• Clear next steps</li>
                      <li>• Follow-up resources</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-sm font-bold">3</span>
                      What You Get
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Clarity on your situation</li>
                      <li>• Fresh perspectives</li>
                      <li>• Actionable recommendations</li>
                      <li>• Honest feedback</li>
                      <li>• Ongoing support options</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/strategy.jpg" 
                    alt="Strategy session" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all">
                <a href={config.primaryCTA.link}>
                  Book Your Session
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Writing Section */}
      {config.sections.writing && (
        <section id="writing" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="sticky top-8">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                    <img 
                      src="/images/writing.jpg" 
                      alt="Writing workspace" 
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                    <span className="text-teal-600">Writing</span> & Insights
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Thoughts on career, learning, and building.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {posts.map((post, index: number) => (
                  <Card key={post.slug} className="border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <CardTitle className="text-xl text-foreground group-hover:text-teal-600 transition-colors">
                          <a 
                            href={`/posts/${post.slug}`}
                            className="hover:text-teal-600 transition-colors"
                          >
                            {post.title}
                          </a>
                        </CardTitle>
                        <span className="text-sm text-muted-foreground shrink-0 whitespace-nowrap">
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <CardDescription className="text-base text-muted-foreground">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                        <a href={`/posts/${post.slug}`}>Read more →</a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Separator />

      {/* Contact Section */}
      {config.sections.contact && (
        <section id="contact" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-teal-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's <span className="text-teal-300">Connect</span>
            </h2>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
              Have a question or want to explore working together? I'd love to hear from you.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-teal-50 transition-colors shadow-xl">
                <a href={`mailto:${config.socialLinks.email}`} className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 transition-colors">
                <a href={config.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>

              {config.socialLinks.github && (
                <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 transition-colors">
                  <a href={config.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                </Button>
              )}

              {config.socialLinks.twitter && (
                <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 transition-colors">
                  <a href={config.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </a>
                </Button>
              )}
            </div>

            <p className="text-white/70">
              Or book a 1:1 session directly: <a href={config.primaryCTA.link} className="text-teal-300 hover:text-teal-200 underline font-medium">{config.primaryCTA.text}</a>
            </p>
          </div>
        </section>
      )}

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
