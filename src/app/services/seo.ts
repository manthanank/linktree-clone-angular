import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Profile } from '../models/profile.interface';
import { SEOData } from '../models/seo.interface';

@Injectable({
  providedIn: 'root',
})
export class Seo {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly baseUrl = 'https://linktree-clone-angular.vercel.app';

  /**
   * Updates all SEO meta tags
   */
  updateSEOTags(seoData: SEOData): void {
    // Update page title
    this.title.setTitle(seoData.title);

    // Update basic meta tags
    this.meta.updateTag({ name: 'description', content: seoData.description });
    if (seoData.keywords) {
      this.meta.updateTag({ name: 'keywords', content: seoData.keywords });
    }
    if (seoData.author) {
      this.meta.updateTag({ name: 'author', content: seoData.author });
    }

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:type', content: seoData.type || 'profile' });
    this.meta.updateTag({ property: 'og:url', content: seoData.url || this.baseUrl });
    if (seoData.image) {
      this.meta.updateTag({ property: 'og:image', content: seoData.image });
      this.meta.updateTag({ property: 'og:image:alt', content: seoData.title });
    }

    // Update Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seoData.title });
    this.meta.updateTag({ name: 'twitter:description', content: seoData.description });
    if (seoData.image) {
      this.meta.updateTag({ name: 'twitter:image', content: seoData.image });
      this.meta.updateTag({ name: 'twitter:image:alt', content: seoData.title });
    }

    // Update canonical URL
    this.updateCanonicalUrl(seoData.url || this.baseUrl);
  }
  /**
   * Updates SEO tags based on profile data
   */
  updateProfileSEO(profile: Profile): void {
    const title = `${profile.name} - ${profile.desc} | Link Hub`;
    const description =
      profile.bio ||
      `Connect with ${profile.name}, a ${profile.desc}. Find all social media profiles, projects, and professional links in one place.`;
    const imageUrl = `${this.baseUrl}/${profile.iconurl}`;

    // Create comprehensive keywords from profile data
    const keywordArray = [
      profile.name,
      profile.desc,
      'Angular Developer',
      'Web Developer',
      'Portfolio',
      'Social Links',
    ];

    if (profile.skills) {
      keywordArray.push(...profile.skills);
    }

    if (profile.location) {
      keywordArray.push(profile.location);
    }

    keywordArray.push(...profile.links.map((link) => link.name));

    const keywords = keywordArray.join(', ');

    this.updateSEOTags({
      title,
      description,
      keywords,
      image: imageUrl,
      url: this.baseUrl,
      type: 'profile',
      author: profile.name,
    });

    // Update structured data
    this.updateStructuredData(profile);
  }

  /**
   * Updates canonical URL
   */
  private updateCanonicalUrl(url: string): void {
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;
  }
  /**
   * Updates structured data (JSON-LD) for better SEO
   */
  private updateStructuredData(profile: Profile): void {
    const baseKnowledge = [
      'Angular',
      'JavaScript',
      'TypeScript',
      'Web Development',
      'Frontend Development',
      'Software Engineering',
      'React',
      'Node.js',
      'HTML',
      'CSS',
      'SCSS',
      'Git',
      'GitHub',
    ];

    // Combine base knowledge with profile skills
    const knowledgeAreas = profile.skills
      ? [...new Set([...baseKnowledge, ...profile.skills])]
      : baseKnowledge;
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.desc,
      description:
        profile.bio || `${profile.desc} specializing in web development and modern technologies`,
      url: 'https://manthanank.github.io/',
      email: 'manthan.ank46@gmail.com',
      image: `${this.baseUrl}/${profile.iconurl}`,
      sameAs: profile.links.map((link) => link.url),
      knowsAbout: knowledgeAreas,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'professional',
        email: 'manthan.ank46@gmail.com',
      },
      ...(profile.location && {
        address: {
          '@type': 'PostalAddress',
          addressCountry: profile.location.includes('India') ? 'IN' : undefined,
          addressLocality: profile.location,
        },
      }),
    };

    // Remove existing structured data script
    const existingScript = document.querySelector(
      'script[type="application/ld+json"][data-dynamic="true"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  /**
   * Adds breadcrumb structured data
   */
  addBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>): void {
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbData);
    document.head.appendChild(script);
  }
}
