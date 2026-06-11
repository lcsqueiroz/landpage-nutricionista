import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Larissa Genari Sena | Nutricionista Online',
    template: '%s | Larissa Genari — Nutricionista',
  },
  description:
    'Consulta de nutrição 100% online para todo o Brasil. Plano alimentar personalizado, emagrecimento saudável e reeducação alimentar. CRN-3 — Agende pelo WhatsApp.',
  keywords: [
    'nutricionista online',
    'consulta nutricional online',
    'plano alimentar personalizado',
    'emagrecimento saudável',
    'nutrição esportiva',
    'reeducação alimentar',
    'Larissa Genari',
  ],
  authors: [{ name: 'Larissa Genari Sena' }],
  creator: 'Lucas Queiroz Vieira',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000',
  ),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Larissa Genari | Nutricionista',
    title: 'Larissa Genari Sena | Nutricionista Online para todo o Brasil',
    description:
      'Plano alimentar 100% personalizado. Emagreça sem dieta restritiva com acompanhamento contínuo.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Larissa Genari Sena — Nutricionista Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Larissa Genari Sena | Nutricionista Online',
    description:
      'Plano alimentar personalizado. Emagreça sem dieta restritiva.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalBusiness',
      name: 'Larissa Genari Sena — Nutricionista',
      description: 'Consultório de nutrição online para todo o Brasil.',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000',
      telephone: process.env.NEXT_PUBLIC_WA_NUMBER,
      priceRange: 'R$180–R$400',
      medicalSpecialty: 'Dietetics',
      availableService: [
        { '@type': 'MedicalTherapy', name: 'Consulta Nutricional Online' },
        { '@type': 'MedicalTherapy', name: 'Plano Alimentar Personalizado' },
      ],
      sameAs: ['https://instagram.com/nutri.larigenari'],
    },
    {
      '@type': 'Person',
      name: 'Larissa Genari Sena',
      jobTitle: 'Nutricionista',
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'CRN-3 94745',
      },
      sameAs: ['https://instagram.com/nutri.larigenari'],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={roboto.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
