# Estratégia de SEO

> Next.js App Router oferece Server Components por padrão — todo HTML é renderizado no servidor, o que é ideal para SEO.

---

## Por que App Router é melhor para SEO

- Componentes são Server Components por padrão → HTML completo entregue ao crawler
- **Metadata API** nativa: `export const metadata = {}` no `layout.js` e `page.js`
- **Streaming** com Suspense não prejudica indexação (Google executa JS, mas o HTML inicial já contém o conteúdo)
- `generateMetadata()` permite metadados dinâmicos por rota
- Geração estática por padrão (SSG) para rotas sem dados dinâmicos → melhor performance (Core Web Vitals)

---

## Metadata (app/layout.js)

```js
export const metadata = {
  title: {
    default: 'Dra. [Nome] | Nutricionista em [Cidade]',
    template: '%s | Dra. [Nome] Nutricionista',
  },
  description:
    'Consultas de nutrição presenciais e online em [Cidade]. Especialista em emagrecimento, nutrição esportiva e reeducação alimentar. Agende pelo WhatsApp.',
  keywords: [
    'nutricionista [cidade]',
    'consulta nutrição online',
    'emagrecimento saudável',
    'plano alimentar personalizado',
    'nutricionista [bairro]',
  ],
  authors: [{ name: 'Dra. [Nome]' }],
  creator: 'Dra. [Nome]',

  // Open Graph (Facebook, WhatsApp, LinkedIn preview)
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://[dominio].com.br',
    siteName: 'Dra. [Nome] Nutricionista',
    title: 'Dra. [Nome] | Nutricionista em [Cidade]',
    description: 'Consultas presenciais e online. Plano alimentar personalizado para seu objetivo.',
    images: [
      {
        url: '/og-image.jpg', // 1200x630px
        width: 1200,
        height: 630,
        alt: 'Dra. [Nome] — Nutricionista',
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: 'summary_large_image',
    title: 'Dra. [Nome] | Nutricionista em [Cidade]',
    description: 'Consultas presenciais e online. Agende pelo WhatsApp.',
    images: ['/og-image.jpg'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical
  alternates: {
    canonical: 'https://[dominio].com.br',
  },

  // Verificação Google Search Console
  verification: {
    google: '[código-de-verificação]',
  },
};
```

---

## JSON-LD — Structured Data

Inserir no `app/layout.js` via `<script type="application/ld+json">`.

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Dra. [Nome] — Nutricionista",
  "description": "Consultas de nutrição presenciais e online em [Cidade].",
  "url": "https://[dominio].com.br",
  "telephone": "+55-11-99999-9999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Endereço]",
    "addressLocality": "[Cidade]",
    "addressRegion": "[Estado]",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -23.000000,
    "longitude": -46.000000
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "image": "https://[dominio].com.br/foto-profissional.jpg",
  "sameAs": [
    "https://www.instagram.com/[perfil]"
  ]
}
```

---

## robots.txt (public/robots.txt)

```
User-agent: *
Allow: /

Sitemap: https://[dominio].com.br/sitemap.xml
```

---

## sitemap.xml (app/sitemap.js)

```js
export default function sitemap() {
  return [
    {
      url: 'https://[dominio].com.br',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

> Next.js gera o arquivo automaticamente em `/sitemap.xml`.

---

## Checklist de SEO On-Page

- [ ] `<h1>` único por página com palavra-chave principal
- [ ] Hierarquia correta: `h1` → `h2` → `h3`
- [ ] Imagens com `alt` descritivo e palavras-chave naturais
- [ ] Imagens em formato WebP, tamanhos responsivos via `next/image`
- [ ] LCP (Largest Contentful Paint) < 2.5s — foto do Hero com `priority` no `next/image`
- [ ] Fonte carregada via `next/font` (sem layout shift)
- [ ] Link canônico configurado
- [ ] Open Graph image em 1200×630px
- [ ] Página indexável (sem `noindex`)
- [ ] Google Search Console configurado + sitemap enviado
- [ ] Google Meu Negócio criado e vinculado ao site

---

## Core Web Vitals — Boas Práticas

| Métrica | Meta | Como atingir |
|---------|------|--------------|
| LCP | < 2.5s | `priority` no `next/image` do Hero, fonte pré-carregada |
| CLS | < 0.1 | Definir `width` e `height` em todas as imagens |
| INP | < 200ms | Evitar JS excessivo, componentes leves |

---

## Palavras-chave Alvo (exemplos — ajustar para a cidade real)

**Intenção transacional (alta conversão):**
- `nutricionista [cidade]`
- `consulta nutricionista [cidade]`
- `nutricionista online`
- `plano alimentar personalizado`

**Intenção informacional (tráfego de descoberta):**
- `como emagrecer com saúde`
- `dieta para hipertrofia`
- `nutrição para gestantes`
