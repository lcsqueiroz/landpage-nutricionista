export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000';
  return [
    {
      url: base,
      lastModified: '2026-06-11',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
