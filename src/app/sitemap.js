export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return [
    {
      url: base,
      lastModified: '2026-06-11',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
