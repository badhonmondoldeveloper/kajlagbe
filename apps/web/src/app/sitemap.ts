import { MetadataRoute } from 'next';
import { CATEGORIES } from '../data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kajlagbe-sigma.vercel.app';

  // Base static routes
  const routes = [
    '',
    '/services',
    '/providers',
    '/jobs',
    '/post-job',
    '/about',
    '/contact',
    '/pricing',
    '/how-it-works',
    '/for-providers',
    '/for-businesses',
    '/help',
    '/safety',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Service Category routes
  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/services/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...categoryRoutes];
}
