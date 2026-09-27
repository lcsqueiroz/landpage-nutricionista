import { SITE_URL } from '@/config/site';

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/politica-de-privacidade`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
