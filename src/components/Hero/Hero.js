import { buildHeroWhatsAppUrl } from '@/lib/whatsapp';
import styles from './Hero.module.css';

const WhatsAppIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const LeafIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-11 2 3-1 7-3 9-5-2 1-6 2-9 3C8 4 5 5 3 7c2-1 5-2 7-2s3 1 3 1c-3 1-5 3-5 5 2-2 5-3 7-3s2 1 2 1z" />
  </svg>
);

const PackagesIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

export default function Hero() {
  const whatsappUrl = buildHeroWhatsAppUrl();

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.heroInner}>
          {/* Coluna de conteúdo */}
          <div className={styles.heroContent}>
            <span className={styles.badge}>
              <LeafIcon />
              Nutrição personalizada · Online
            </span>

            <h1 id="hero-heading" className={styles.heading}>
              Transforme sua relação{' '}
              <em className={styles.headingAccent}>com a alimentação</em>
            </h1>

            <p className={styles.sub}>
              Plano alimentar 100% personalizado para o seu estilo de vida.
              Atendimento online com acompanhamento contínuo para todo o Brasil.
            </p>

            <div className={styles.ctaRow}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
                aria-label="Agendar consulta pelo WhatsApp"
              >
                <WhatsAppIcon />
                Agendar consulta
              </a>
              <a href="#pacotes" className={styles.ctaSecondary}>
                <PackagesIcon />
                Ver pacotes
              </a>
            </div>

            <p className={styles.ctaMicrocopy}>
              Sem compromisso · Resposta em até 2h · Atendimento online
            </p>

            <div className={styles.trustBar} aria-label="Credenciais">
              <div className={styles.trustStat}>
                <strong className={styles.trustNum}>Atenção</strong>
                <span className={styles.trustLabel}>
                  exclusiva a cada paciente
                </span>
              </div>
              <div className={styles.trustDivider} aria-hidden="true" />
              <div className={styles.trustStat}>
                <strong className={styles.trustNum}>Plano</strong>
                <span className={styles.trustLabel}>
                  individual e detalhado
                </span>
              </div>
              <div className={styles.trustDivider} aria-hidden="true" />
              <div className={styles.trustStat}>
                <strong className={styles.trustNum}>100%</strong>
                <span className={styles.trustLabel}>
                  online · todo o Brasil
                </span>
              </div>
            </div>
          </div>

          {/* Coluna visual */}
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.imageFrame}>
              <div className={styles.imageBezel}>
                <div className={styles.mockup}>
                  {/* Browser chrome */}
                  <div className={styles.mockupChrome}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <div className={styles.chromeBar}>
                      <span className={styles.chromeUrl}>
                        nutriplan.app/plano-semanal
                      </span>
                    </div>
                  </div>

                  {/* Spreadsheet body */}
                  <div className={styles.sheet}>
                    <div className={styles.sheetTopbar}>
                      <span className={styles.sheetTitle}>
                        Plano Alimentar — Semana 3
                      </span>
                      <span className={styles.sheetMeta}>
                        Meta: 2.000 kcal · Jun 2025
                      </span>
                    </div>

                    <div className={`${styles.row} ${styles.rowHead}`}>
                      <div className={`${styles.cell} ${styles.cellWide}`}>
                        Refeição
                      </div>
                      <div className={styles.cell}>Calorias</div>
                      <div className={styles.cell}>Proteína</div>
                      <div className={styles.cell}>Carbs</div>
                      <div className={styles.cell}>Gordura</div>
                    </div>

                    <div className={`${styles.row} ${styles.aRow1}`}>
                      <div
                        className={`${styles.cell} ${styles.cellWide} ${styles.cellMeal}`}
                      >
                        ☀️ Café da manhã
                      </div>
                      <div
                        className={`${styles.cell} ${styles.cellVal} ${styles.flash1}`}
                      >
                        380 kcal
                      </div>
                      <div className={`${styles.cell} ${styles.cellProt}`}>
                        22 g
                      </div>
                      <div className={styles.cell}>45 g</div>
                      <div className={styles.cell}>12 g</div>
                    </div>

                    <div className={`${styles.row} ${styles.aRow2}`}>
                      <div
                        className={`${styles.cell} ${styles.cellWide} ${styles.cellMeal}`}
                      >
                        🍎 Lanche manhã
                      </div>
                      <div
                        className={`${styles.cell} ${styles.cellVal} ${styles.flash2}`}
                      >
                        180 kcal
                      </div>
                      <div className={`${styles.cell} ${styles.cellProt}`}>
                        8 g
                      </div>
                      <div className={styles.cell}>28 g</div>
                      <div className={styles.cell}>5 g</div>
                    </div>

                    <div className={`${styles.row} ${styles.aRow3}`}>
                      <div
                        className={`${styles.cell} ${styles.cellWide} ${styles.cellMeal}`}
                      >
                        🥗 Almoço
                      </div>
                      <div
                        className={`${styles.cell} ${styles.cellVal} ${styles.flash3}`}
                      >
                        650 kcal
                      </div>
                      <div className={`${styles.cell} ${styles.cellProt}`}>
                        42 g
                      </div>
                      <div className={styles.cell}>72 g</div>
                      <div className={styles.cell}>18 g</div>
                    </div>

                    <div className={`${styles.row} ${styles.aRow4}`}>
                      <div
                        className={`${styles.cell} ${styles.cellWide} ${styles.cellMeal}`}
                      >
                        🥜 Lanche tarde
                      </div>
                      <div
                        className={`${styles.cell} ${styles.cellVal} ${styles.flash4}`}
                      >
                        220 kcal
                      </div>
                      <div className={`${styles.cell} ${styles.cellProt}`}>
                        12 g
                      </div>
                      <div className={styles.cell}>30 g</div>
                      <div className={styles.cell}>7 g</div>
                    </div>

                    <div className={`${styles.row} ${styles.aRow5}`}>
                      <div
                        className={`${styles.cell} ${styles.cellWide} ${styles.cellMeal}`}
                      >
                        🍽️ Jantar
                      </div>
                      <div
                        className={`${styles.cell} ${styles.cellVal} ${styles.flash5}`}
                      >
                        520 kcal
                      </div>
                      <div className={`${styles.cell} ${styles.cellProt}`}>
                        38 g
                      </div>
                      <div className={styles.cell}>58 g</div>
                      <div className={styles.cell}>15 g</div>
                    </div>

                    <div
                      className={`${styles.row} ${styles.rowTotal} ${styles.aTotal}`}
                    >
                      <div className={`${styles.cell} ${styles.cellWide}`}>
                        Total do dia
                      </div>
                      <div className={`${styles.cell} ${styles.cellValBold}`}>
                        1.950 kcal
                      </div>
                      <div className={`${styles.cell} ${styles.cellProtBold}`}>
                        122 g
                      </div>
                      <div className={styles.cell}>233 g</div>
                      <div className={styles.cell}>57 g</div>
                    </div>

                    <div className={`${styles.progress} ${styles.aProgress}`}>
                      <div className={styles.progressRow}>
                        <span className={styles.progressLabel}>Calorias</span>
                        <div className={styles.progressTrack}>
                          <div
                            className={`${styles.progressFill} ${styles.fillCal}`}
                          />
                        </div>
                        <span className={styles.progressPct}>78%</span>
                      </div>
                      <div className={styles.progressRow}>
                        <span className={styles.progressLabel}>Proteína</span>
                        <div className={styles.progressTrack}>
                          <div
                            className={`${styles.progressFill} ${styles.fillProt}`}
                          />
                        </div>
                        <span className={styles.progressPct}>87%</span>
                      </div>
                      <div className={styles.progressRow}>
                        <span className={styles.progressLabel}>Hidratação</span>
                        <div className={styles.progressTrack}>
                          <div
                            className={`${styles.progressFill} ${styles.fillHydro}`}
                          />
                        </div>
                        <span className={styles.progressPct}>65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
