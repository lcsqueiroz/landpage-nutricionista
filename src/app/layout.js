import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Fraunces, Roboto } from 'next/font/google';
import { SERVICES } from '@/content/services';
import { INSTAGRAM_URL, PROFESSIONAL, SITE_URL } from '@/config/site';
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/utilities.css';

// Fontes variáveis (sem `weight`): um arquivo cobre todos os pesos dos tokens --weight-*
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Larissa Genari | Nutricionista online e reeducação alimentar',
    template: '%s | Larissa Genari — Nutricionista',
  },
  description:
    'Nutricionista online (CRN-3 94745). Acompanhamento em nutrição clínica, reeducação alimentar e emagrecimento saudável, com um plano que cabe na sua rotina.',
  keywords: [
    'nutricionista',
    'nutricionista online',
    'consulta nutricional',
    'nutrição clínica',
    'plano alimentar personalizado',
    'emagrecimento saudável',
    'reeducação alimentar',
    'Larissa Genari',
  ],
  authors: [{ name: 'Larissa Genari' }],
  creator: 'Lucas Queiroz Vieira',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  // Sem `images`: o Next usa o arquivo estático src/app/opengraph-image.jpg
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Larissa Genari | Nutricionista',
    title: 'Larissa Genari | Nutricionista online e reeducação alimentar',
    description:
      'Comer bem sem virar a sua vida do avesso. Acompanhamento nutricional online, com um plano que cabe na sua rotina.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Larissa Genari | Nutricionista online e reeducação alimentar',
    description:
      'Comer bem sem virar a sua vida do avesso. Acompanhamento nutricional online, com um plano que cabe na sua rotina.',
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
    <html lang="pt-BR" className={`${fraunces.variable} ${roboto.variable}`}>
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
