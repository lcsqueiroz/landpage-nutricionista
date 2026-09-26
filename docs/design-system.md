# Design system

Todos os tokens ficam em `src/app/globals.css` (`:root`). Componentes nunca usam valores soltos.

## Princípios

- **Paleta "porcelana + verde profundo + champanhe":** dois neutros, um tom escuro de peso e um acento metálico usado com parcimônia (itálicos de destaque, fios finos).
- **Cantos quase retos** (2–3px); círculos só em ícones e marcadores; o arco da foto do Hero é forma, não canto.
- **Tipografia editorial:** Cormorant Garamond (títulos) + Roboto (texto), com hierarquia de peso por tokens.
- **Pouco efeito, bem feito:** marcas registradas são o arco da foto, a lista de serviços em acordeão e o WebGL do Hero.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#2c3a31` | verde floresta |
| `--color-primary-dark` | `#131b16` | fundos escuros, botões |
| `--color-accent` / `-light` | `#a88a58` / `#cbb48a` | champanhe (itálicos, fios) |
| `--color-bg` | `#f6f3ee` | porcelana (base) |
| `--color-surface` | `#fcfbf8` | cards |
| `--color-surface-2` | `#ebe6dd` | linho (apoio) |
| `--color-surface-sage` | `#edefe8` | sálvia névoa (fundo de Serviços) |

Fundos das seções alternam tons quentes e esverdeados da mesma família, para separar sem quebrar a harmonia: Hero porcelana → Sobre branco quebrado → Serviços sálvia névoa → Como funciona linho → Instagram porcelana → CTA verde-escuro.
| `--color-footer` | `#0c120e` | rodapé |
| `--color-melon-flesh` / `-rind` | `#c25a50` / `#6e8a5e` | melancia da logo |

### Hierarquia de texto (verdes sutis, contraste AAA)

Todo texto passa **WCAG AAA** (≥ 7:1; ≥ 4,5:1 em texto grande) em `--color-bg`, `--color-surface` e `--color-surface-2`. Ao criar ou mudar cor, conferir o contraste no fundo mais escuro onde ela aparece.

| Token | Valor | Uso | Contraste* |
|---|---|---|---|
| `--color-heading` | `#1b2d21` | h1, h2 | 11,7:1 |
| `--color-heading-2` | `#2e4838` | subtítulos, cards, itálicos | 8:1 |
| `--color-text` | `#22312a` | menu, links, destaque | 11:1 |
| `--color-text-muted` | `#404e44` | parágrafos | 7,1:1 |
| `--color-label` | `#3c4e41` | rótulos pequenos | 7,2:1 |
| `--color-text-subtle` | `#454d46` | datas, observações | 7:1 |
| `--color-accent-text` | `#4f4028` | bronze em texto pequeno ("Nutricionista" da logo) | 8:1 |
| `--color-on-dark-muted` | `rgba(244, 240, 232, 0.72)` | texto secundário em fundo escuro | 8,4:1** |

\* no fundo claro mais escuro (`--color-surface-2`). \*\* sobre `--color-primary-dark`.

O champanhe (`--color-accent`, `--color-accent-light`) fica para fios, ícones e fundos, nunca para texto sobre fundo claro. Texto sobre a foto do hero depende do esmaecido (`.arch::after`) e do véu do header (`.header::after`): não enfraquecer esses gradientes.

## Tipografia

`--font-heading` (Cormorant Garamond), `--font-body` (Roboto); escala `--text-xs` … `--text-4xl`, `--text-h2`, `--text-eyebrow`.

### Hierarquia de peso

Nunca usar `font-weight` numérico nos componentes; sempre um destes tokens.

| Token | Valor | Fonte | Uso |
|---|---|---|---|
| `--weight-heading` | 500 | serifada | h1, h2, títulos grandes (menu, citação, cards de serviço) |
| `--weight-heading-2` | 600 | serifada | títulos pequenos ≤ 2rem (formação, etapas, legendas) |
| `--weight-heading-soft` | 400 | serifada | itálicos de apoio, assinatura, numerais decorativos |
| `--weight-text` | 300 | sem serifa | parágrafos |
| `--weight-label` | 500 | sem serifa | rótulos em caixa-alta, navegação, `<strong>` |
| `--weight-action` | 600 | sem serifa | botões, links de ação, marcadores |

## Espaço, raio, sombra, movimento

- `--spacing-section`, `--container-max` (1280px), `--container-padding`, `--gap-cards`, `--spacing-card`
- `--radius-sm` (2px), `--radius-md`/`--radius-card` (3px), `--radius-arch`, `--radius-full` (só círculos)
- `--shadow-card`, `--shadow-card-hover`, `--shadow-photo`, `--shadow-float`
- `--ease-out`, `--ease-in-out`, `--transition-fast|base|slow|layout`

## Utilitários globais

- `.btn` / `.btnLight` — botão com preenchimento champanhe no hover/toque
- `.eyebrow` — rótulo pequeno em caixa alta (usar pouco)
- `.maskLine` — linhas de título que sobem de dentro de uma máscara
- `[data-anim]` — reveal ao entrar na tela (`fade-up`, `blur-in`, `scale-in`, `lines`)

## Logo

Vetorizada a partir do arquivo da cliente (`docs/brand/`), em quatro camadas aplicadas como máscara (`public/logo/`). Cores por tom: `dark` (fundos claros) e `light` (fundos escuros). Tamanho por `--logo-h`.
