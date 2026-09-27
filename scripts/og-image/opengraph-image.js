import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Gerador da imagem de pré-visualização do link — como usar em docs/scripts.md

export const alt = 'Larissa Genari — Nutricionista';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Espelha os tokens de src/styles/tokens.css (o ImageResponse não lê variáveis CSS)
const COLORS = {
  bg: '#ffffff', // --color-bg
  heading: '#1b2d21', // --color-heading
  heading2: '#2e4838', // --color-heading-2
  muted: '#404e44', // --color-text-muted
  label: '#3c4e41', // --color-label
  accent: '#c25a50', // --color-accent (polpa da melancia)
};

// Foto original (não a versão redesenhada por IA): a capa circula em cache de WhatsApp/Facebook e não depende do parecer do CRN
const photoPath = join(process.cwd(), 'src', 'assets', 'images', 'larissa', 'original-03.jpg');
const font = (name) => join(process.cwd(), 'scripts', 'og-image', 'fonts', name);

export default async function Image() {
  const [photo, fraunces, frauncesItalic, roboto] = await Promise.all([
    readFile(photoPath, 'base64'),
    readFile(font('Fraunces-Medium.woff')),
    readFile(font('Fraunces-Italic.woff')),
    readFile(font('Roboto-Medium.woff')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: COLORS.bg,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse não aceita next/image */}
        <img
          src={`data:image/jpeg;base64,${photo}`}
          width={560}
          height={630}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            objectFit: 'cover',
            objectPosition: '45% 30%',
          }}
          alt=""
        />
        {/* Emenda da foto com o fundo branco, longe do rosto */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 400,
            width: 160,
            height: 630,
            background: `linear-gradient(90deg, ${COLORS.bg} 0%, rgba(255, 255, 255, 0) 100%)`,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', width: 620, paddingLeft: 88 }}>
          <div
            style={{
              fontFamily: 'Roboto',
              fontSize: 19,
              letterSpacing: 6,
              color: COLORS.label,
            }}
          >
            LARISSA GENARI
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: 'Fraunces',
              fontSize: 100,
              lineHeight: 1,
              letterSpacing: -2,
              color: COLORS.heading,
            }}
          >
            Nutricionista
          </div>
          <div
            style={{
              marginTop: 30,
              fontFamily: 'Fraunces Italic',
              fontSize: 40,
              lineHeight: 1.25,
              color: COLORS.heading2,
              maxWidth: 480,
            }}
          >
            Comer bem sem virar a sua vida do avesso.
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 40,
              fontFamily: 'Roboto',
              fontSize: 20,
              letterSpacing: 1,
              color: COLORS.muted,
            }}
          >
            {/* Ponto coral: a polpa da melancia, o acento de 10% */}
            <div
              style={{
                width: 10,
                height: 10,
                marginRight: 14,
                borderRadius: 5,
                background: COLORS.accent,
              }}
            />
            Atendimento online · CRN-3 94745
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces, style: 'normal', weight: 500 },
        { name: 'Fraunces Italic', data: frauncesItalic, style: 'italic', weight: 400 },
        { name: 'Roboto', data: roboto, style: 'normal', weight: 500 },
      ],
    }
  );
}
