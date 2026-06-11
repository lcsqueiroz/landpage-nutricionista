'use client';

import { useState } from 'react';
import PackageCard from '@/components/PackageCard/PackageCard';
import LeadModal from '@/components/LeadModal/LeadModal';
import styles from './PackagesGrid.module.css';

/* Conteúdo dos pacotes  */
const PACKAGES = [
  {
    id: 'avulso',
    name: 'Consulta Avulsa',
    description: 'Ideal para dar o primeiro passo.',
    price: 'R$ 180',
    priceSuffix: '/consulta',
    badge: null,
    featured: false,
    features: [
      'Análise nutricional completa',
      'Plano alimentar individualizado',
      'Suporte por WhatsApp por 7 dias',
      'Orientações de reeducação alimentar',
    ],
  },
  {
    id: 'mensal',
    name: 'Pacote Mensal',
    description: 'Acompanhamento completo e personalizado.',
    price: 'R$ 220',
    priceSuffix: '/mês',
    badge: 'Mais popular',
    featured: true,
    features: [
      '2 consultas mensais',
      'Plano alimentar + retorno adaptativo',
      'Suporte contínuo por WhatsApp',
      'Ajustes de plano conforme evolução',
      'Orientações de reeducação alimentar',
    ],
  },
  {
    id: 'trimestral',
    name: 'Pacote Trimestral',
    description: 'Máximo resultado a longo prazo.',
    price: 'R$ 400',
    priceSuffix: '/trimestre',
    badge: null,
    featured: false,
    features: [
      '3 consultas mensais',
      'Plano alimentar personalizado',
      'Suporte contínuo por WhatsApp',
      'Avaliação de bioimpedância',
      'Acompanhamento semanal',
      'Relatório de evolução mensal',
    ],
  },
];

export default function PackagesGrid() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <div className={styles.grid}>
        {PACKAGES.map((pkg, i) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onSelect={setSelectedId}
            index={i}
          />
        ))}
      </div>

      {selectedId && (
        <LeadModal packageId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
}
