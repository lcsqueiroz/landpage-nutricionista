export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER;

export const PACKAGES = [
  { id: 'avulso', name: 'Consulta Avulsa' },
  { id: 'mensal', name: 'Pacote Mensal' },
  { id: 'trimestral', name: 'Pacote Trimestral' },
];

export const OBJECTIVES = [
  'Emagrecer com saúde',
  'Ganhar massa muscular',
  'Melhorar a alimentação',
  'Nutrição esportiva',
  'Nutrição na gestação',
  'Outro',
];

export function buildHeroWhatsAppUrl() {
  const message =
    'Olá! Vim através do site e gostaria de saber mais sobre as consultas. Poderia me ajudar?';
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppUrl({ packageId, name, objective }) {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  const message =
    `Olá! Meu nome é ${name} e vim através do site.\n` +
    `Tenho interesse no ${pkg?.name ?? 'pacote'}.\n` +
    `Meu principal objetivo é: ${objective}.\n` +
    `Poderia me passar mais informações?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
