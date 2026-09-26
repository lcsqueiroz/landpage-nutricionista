import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Cormorant_Garamond, Roboto } from 'next/font/google';
import { SERVICES } from '@/lib/services';
import { INSTAGRAM_URL, PROFESSIONAL, SITE_URL } from '@/lib/site';
import './globals.css';

// Fontes variáveis (sem `weight`): os pesos fixos da Cormorant quebram no Turbopack
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Larissa Genari | Nutricionista',
    template: '%s | Larissa Genari — Nutricionista',
  },
  description:
    'Nutricionista. Cuidado com a saúde através da alimentação: nutrição clínica, reeducação alimentar, emagrecimento saudável e nutrição esportiva. Atendimento online. CRN-3 94745.',
  keywords: [
    'nutricionista',
    'consulta nutricional',
    'nutrição clínica',
    'plano alimentar personalizado',
    'emagrecimento saudável',
    'nutrição esportiva',
    'reeducação alimentar',
    'Larissa Genari',
  ],
  authors: [{ name: 'Larissa Genari' }],
  creator: 'Lucas Queiroz Vieira',
  metadataBase: new URL(SITE_URL),
  // A imagem de pré-visualização vem de src/app/opengraph-image.js
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Larissa Genari | Nutricionista',
    title: 'Larissa Genari | Nutricionista',
    description:
      'Transforme sua relação com a alimentação. Saúde que começa no prato, com um plano feito para a sua rotina.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Larissa Genari | Nutricionista',
    description:
      'Transforme sua relação com a alimentação. Saúde que começa no prato, com um plano feito para a sua rotina.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalBusiness',
      name: 'Larissa Genari — Nutricionista',
      description: 'Cuidado com a saúde através da alimentação. Atendimento online.',
      url: SITE_URL,
      medicalSpecialty: 'Dietetics',
      availableService: SERVICES.map((s) => ({ '@type': 'MedicalTherapy', name: s.title })),
      sameAs: [INSTAGRAM_URL],
    },
    {
      '@type': 'Person',
      name: PROFESSIONAL.name,
      jobTitle: PROFESSIONAL.title,
      url: SITE_URL,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: PROFESSIONAL.crn,
      },
      sameAs: [INSTAGRAM_URL],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${roboto.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
