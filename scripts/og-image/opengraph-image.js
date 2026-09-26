import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Gerador da imagem de pré-visualização do link — como usar em docs/scripts.md

export const alt = 'Larissa Genari — Nutricionista';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COLORS = {
  bg: '#f6f3ee', // --color-bg
  glow: '#ece6db', // brilho suave atrás da foto
  heading: '#1b2d21', // --color-heading
  heading2: '#2e4838', // --color-heading-2
  muted: '#4b5c50', // --color-text-muted
  label: '#56685a', // --color-label
  accent: '#a88a58', // --color-accent
  accentLight: '#cbb48a', // --color-accent-light
};

const photoPath = join(process.cwd(), 'src', 'assets', 'larissa-03.jpg');
const font = (name) => join(process.cwd(), 'scripts', 'og-image', 'fonts', name);

export default async function Image() {
  const [photo, cormorant, cormorantItalic, inter] = await Promise.all([
    readFile(photoPath, 'base64'),
    readFile(font('CormorantGaramond-Medium.woff')),
    readFile(font('CormorantGaramond-MediumItalic.woff')),
    readFile(font('Inter-Medium.woff')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 96px',
          background: `radial-gradient(circle at 78% 30%, ${COLORS.glow} 0%, ${COLORS.bg} 60%)`,
        }}
      >
        {/* Texto */}
        <div style={{ display: 'flex', flexDirection: 'column', width: 560 }}>
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: 20,
              letterSpacing: 7,
              color: COLORS.label,
            }}
          >
            LARISSA GENARI
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: 'Cormorant',
              fontSize: 112,
              lineHeight: 1,
              letterSpacing: -2,
              color: COLORS.heading,
            }}
          >
            Nutricionista
          </div>
          <div
            style={{ marginTop: 34, width: 76, height: 2, background: COLORS.accent }}
          />
          <div
            style={{
              marginTop: 30,
              fontFamily: 'Cormorant Italic',
              fontSize: 42,
              lineHeight: 1.25,
              color: COLORS.heading2,
              maxWidth: 520,
            }}
          >
            Transforme sua relação com a alimentação.
          </div>
          <div
            style={{
              marginTop: 40,
              fontFamily: 'Inter',
              fontSize: 20,
              letterSpacing: 1,
              color: COLORS.muted,
            }}
          >
            Atendimento online · CRN-3 94745
          </div>
        </div>

        {/* Foto em arco com contorno dourado deslocado */}
        <div style={{ display: 'flex', position: 'relative', width: 390, height: 520 }}>
          <div
            style={{
              position: 'absolute',
              top: -14,
              left: 22,
              width: 390,
              height: 500,
              border: `1.5px solid ${COLORS.accentLight}`,
              borderRadius: '195px 195px 3px 3px',
            }}
          />
          <div
            style={{
              display: 'flex',
              width: 390,
              height: 520,
              overflow: 'hidden',
              borderRadius: '195px 195px 3px 3px',
              boxShadow: '0 30px 60px -20px rgba(12, 18, 14, 0.45)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse não aceita next/image */}
            <img
              src={`data:image/jpeg;base64,${photo}`}
              width={390}
              height={520}
              style={{
                objectFit: 'cover',
                objectPosition: '45% 50%',
                borderRadius: '195px 195px 3px 3px',
              }}
              alt=""
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cormorant', data: cormorant, style: 'normal', weight: 500 },
        { name: 'Cormorant Italic', data: cormorantItalic, style: 'italic', weight: 500 },
        { name: 'Inter', data: inter, style: 'normal', weight: 500 },
      ],
    }
  );
}
