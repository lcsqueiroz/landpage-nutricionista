'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const ChevronIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const faqs = [
  {
    q: 'Já tentei dieta antes e não funcionou. Por que seria diferente?',
    a: 'Dietas genéricas falham porque ignoram a sua individualidade. Aqui não existe cardápio padrão — crio um plano baseado na sua rotina real, seus alimentos favoritos e seus objetivos. O segredo não é força de vontade, é estratégia personalizada.',
  },
  {
    q: 'O valor é alto. Como sei que vale o investimento?',
    a: 'Uma consulta avulsa custa menos que um jantar fora. E o retorno — mais energia, menos gastos com remédios, melhor qualidade de vida — é para sempre. Além disso: satisfação garantida. Se não ficar satisfeita na primeira consulta, devolvo 100% do valor.',
  },
  {
    q: 'As consultas são presenciais ou online?',
    a: 'Atendo exclusivamente online, pelo Google Meet ou WhatsApp Video. Assim você pode ser atendida de onde estiver, sem deslocamento e com total comodidade.',
  },
  {
    q: 'Em quanto tempo vejo resultados?',
    a: 'Os primeiros resultados de bem-estar e energia aparecem já nas primeiras 2 semanas. Resultados físicos mais expressivos são esperados a partir do primeiro mês de acompanhamento contínuo.',
  },
  {
    q: 'O plano alimentar é personalizado para mim?',
    a: 'Sim, 100%. Antes de criar seu plano faço uma anamnese completa considerando seu histórico, rotina, preferências alimentares e objetivos. Não existe um plano padrão — cada paciente é único.',
  },
  {
    q: 'Atendo por convênio?',
    a: 'Não atendo por convênio. Os valores são particulares e podem ser pagos por Pix, cartão de crédito (parcelado) ou boleto bancário.',
  },
  {
    q: 'Como funciona o acompanhamento entre as consultas?',
    a: 'Dependendo do pacote, você tem suporte por WhatsApp para dúvidas e ajustes do plano. Você nunca fica sozinha no processo — estou disponível para orientações ao longo do mês.',
  },
  {
    q: 'Qual a diferença entre os pacotes?',
    a: 'A diferença está na frequência de consultas e intensidade do acompanhamento. O Pacote Trimestral inclui mais consultas, avaliação de bioimpedância e relatórios de evolução mensais — ideal para resultados mais expressivos a longo prazo.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className={styles.section}
      aria-labelledby="faq-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel} aria-hidden="true">
            Dúvidas frequentes
          </span>
          <h2 id="faq-heading" className={styles.heading}>
            Perguntas <em className={styles.headingAccent}>frequentes</em>
          </h2>
        </div>

        <dl className={styles.list} data-anim="fade-up">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`${styles.item} ${isOpen ? styles.open : ''}`}
              >
                <dt>
                  <button
                    type="button"
                    className={styles.question}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    >
                      <ChevronIcon />
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${i}`}
                  className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                >
                  <p className={styles.answerText}>{faq.a}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
