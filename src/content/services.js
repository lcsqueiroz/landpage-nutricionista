import hortifrutiImg from '@/assets/images/food/hortifruti.jpg';
import tomatesImg from '@/assets/images/food/tomates-linho.jpg';
import saladaImg from '@/assets/images/food/salada-grao-de-bico.jpg';

// Ordem importa: o foco da Larissa é saúde através da comida — clínica primeiro
export const SERVICES = [
  {
    id: 'clinica',
    title: 'Nutrição clínica',
    image: hortifrutiImg,
    description:
      'Diabetes, pressão alta, colesterol, intestino preso ou irritado. Aqui a comida entra como parte do tratamento, junto com o que o seu médico já orientou.',
    topics: ['Diabetes', 'Hipertensão', 'Saúde intestinal'],
  },
  {
    id: 'reeducacao',
    title: 'Reeducação alimentar',
    image: tomatesImg,
    description:
      'Sabe que precisa comer melhor, mas trava no "por onde eu começo?". A gente escolhe uma coisa por vez. Quando ela vira hábito, parte pra próxima.',
    topics: ['Passo a passo', 'Sem proibições'],
  },
  {
    id: 'emagrecimento',
    title: 'Emagrecimento saudável',
    image: saladaImg,
    description:
      'O peso é consequência, não a meta da semana. Sem passar fome e sem abrir mão do pão de que você gosta: a ideia é um jeito de comer que ainda faça sentido daqui a um ano.',
    topics: ['Sem dietas da moda', 'No seu ritmo'],
  },
];
