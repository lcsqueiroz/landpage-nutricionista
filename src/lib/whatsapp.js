const WA_NUMBER = (process.env.NEXT_PUBLIC_WA_NUMBER ?? '').replace(/\D/g, '');

if (!WA_NUMBER && typeof window === 'undefined') {
  console.warn('[whatsapp] NEXT_PUBLIC_WA_NUMBER não definida: os botões de agendamento ficarão sem número.');
}

const buildUrl = (message) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export function buildHeroWhatsAppUrl() {
  return buildUrl('Oi, Larissa! Vim pelo site e gostaria de saber mais sobre o acompanhamento nutricional.');
}

export function buildServiceWhatsAppUrl(serviceTitle) {
  return buildUrl(
    `Oi, Larissa! Vim pelo site e tenho interesse em ${serviceTitle.toLowerCase()}. Pode me contar como funciona?`
  );
}
