# Design system

Todos os tokens ficam em `src/styles/tokens.css` (`:root`). Componentes nunca usam valores soltos.

## Princípios

- **Paleta 60-30-10:** 60% neutros limpos (branco e cinza-esverdeado leve), 30% verde profundo (texto, seções escuras, botões), 10% coral da melancia da logo (acento: itálicos em fundo escuro, assinatura, hover dos botões, marcadores). O coral é o complementar do verde; nunca em texto pequeno sobre fundo claro.
- **Cantos quase retos** (2–3px); círculos só em ícones e marcadores.
- **Tipografia:** Fraunces (serifa contemporânea e encorpada, eixos `opsz` e `SOFT`) nos títulos + Roboto nos textos, com hierarquia de peso por tokens.
- **Esqueleto comum das seções:** cabeçalho com título à esquerda e texto de apoio à direita (empilhados no mobile), conteúdo em grade dentro do container. Foto ou vai de ponta a ponta (Hero, Manifesto, faixa do Como funciona) ou fica contida na grade; nunca sangrando de um lado só.
- **Interação sempre em rosa:** todo hover/estado ativo de botão e link usa o acento — preenchimento `--color-accent-light` com texto `--color-primary-dark` (botões, "+" dos serviços aberto/hover, seta "Quero saber mais", botão do Instagram, ícone do botão flutuante); texto de link vira `--color-accent-hover` sobre fundo claro e `--color-accent-light` sobre fundo escuro.
- **Textura de frutas:** ícones de frutas em contorno (`public/patterns/frutas.svg`) usados como máscara, na cor `--color-primary` com `--pattern-opacity` (7%) no fundo do Sobre e ~5% nos cartões dos Serviços (deslocada por cartão via `--i`). Para ajustar a intensidade, mude só `--pattern-opacity`.
- **Sem fios finos:** nada de bordas ou divisórias de 1px. Separar por tom de fundo, espaço e formas preenchidas (cartões, chips, círculos cheios).
- **Comida de verdade na tela:** fotos de comida em faixa de ponta a ponta (`Manifesto`), nas miniaturas dos serviços e como textura do CTA final. Texto sobre foto sempre com véu (`--veil-food`, `--veil-dark-photo`).
- **Quase sem efeito:** só fades curtos (ver `docs/animations.md`). Marcas registradas são a foto de ponta a ponta do Hero, a faixa de comida do Manifesto e os cartões de serviço com miniatura.

## A paleta é uma melancia cortada

A melancia é a fruta-marca da Larissa (está na logo). As cores do site não são aleatórias: cada uma é uma parte da fruta, e a proporção segue o 60-30-10.

| Parte da melancia | No site | Tokens |
|---|---|---|
| Faixa clara da casca | fundos das seções (60%) | `--color-bg`, `--color-surface-2`, `--color-section-soft`, `--color-section-strong` |
| Casca verde-escura | CTA, rodapé, texto, verde da foto do Hero (30%) | `--color-primary-dark`, `--color-heading`, `--color-text` |
| Polpa rosa | acento: hovers, "rotina?" do CTA, marcadores das etapas, botão flutuante (10%) | `--color-accent`, `--color-accent-light`, `--color-accent-pale` |
| Sementes | botões escuros, títulos em verde quase preto | `--color-primary-dark` |

Ao criar algo novo: o rosa é a polpa e deve continuar pouco; se começar a aparecer em áreas grandes, a "melancia" desequilibra.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#2c3a31` | verde floresta |
| `--color-primary-dark` | `#131b16` | fundos escuros, botões |
| `--color-accent` / `-light` | `#c25a50` / `#eba59b` | coral da melancia (10%): marcadores, foco; `-light` em itálicos/assinatura sobre escuro e no hover dos botões |
| `--color-bg` | `#ffffff` | branco (base) |
| `--color-surface` | `#ffffff` | cartões sobre seções tingidas ou escuras |
| `--color-surface-2` | `#f1f4ef` | cinza-esverdeado leve (seções alternadas, chips) |
| `--color-sand` | `#e6ebe3` | fundo enquanto a foto carrega |
| `--color-logo-role` / `-on-dark` | `#4f4028` / `#cbb48a` | "Nutricionista" da logo (independente do acento) |

Sequência de fundos: Hierarquia de fundos (neutros frios, sem bege): Hero, Serviços e Como funciona em branco (nível 1); Instagram em `--color-section-soft` `#f3f5f2` (nível 2); Sobre em `--color-section-strong` `#eff2ed` (nível 3, cartões brancos); CTA e rodapé em verde-floresta. As faixas de foto (Manifesto, topo do Como funciona) fazem a transição.

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
| `--color-logo-role` | `#4f4028` | bronze em texto pequeno ("Nutricionista" da logo) | 8:1 |
| `--color-on-dark-muted` | `rgba(244, 240, 232, 0.72)` | texto secundário em fundo escuro | 8,4:1** |

\* no fundo claro mais escuro (`--color-surface-2`). \*\* sobre `--color-primary-dark`.

O coral (`--color-accent`, `--color-accent-light`) fica para detalhes, hovers e itálicos em fundo escuro, nunca para texto pequeno sobre fundo claro (lá, use `--color-accent-hover`). O header é uma faixa sólida branca desde o topo (sem transparência sobre a foto), para o contraste não depender da imagem. No Hero, o texto fica sobre o esmaecido da foto (`.visual::after`: vertical no mobile, `--veil-hero-wide` no desktop): não enfraquecer esses gradientes.

## Tipografia

`--font-heading` (Fraunces), `--font-body` (Roboto); escala `--text-xs` … `--text-4xl`, `--text-h2`, `--text-eyebrow`.

### Hierarquia de peso

Nunca usar `font-weight` numérico nos componentes; sempre um destes tokens.

| Token | Valor | Fonte | Uso |
|---|---|---|---|
| `--weight-heading` | 460 | serifada | h1, h2, títulos grandes (menu, citação, cards de serviço) |
| `--weight-heading-2` | 540 | serifada | títulos pequenos ≤ 2rem (formação, etapas, legendas) |
| `--weight-heading-soft` | 380 | serifada | itálicos de apoio, assinatura, frase do Manifesto |
| `--weight-text` | 400 | sem serifa | parágrafos |
| `--weight-label` | 500 | sem serifa | rótulos em caixa-alta, navegação, `<strong>` |
| `--weight-action` | 600 | sem serifa | botões, links de ação, marcadores |

## Espaço, raio, sombra, movimento

- `--spacing-section`, `--spacing-section-sm`, `--container-max` (1280px), `--container-padding`, `--gap-cards`
- `--radius-sm` (2px), `--radius-card` (3px); círculos usam `border-radius: 50%` direto
- `--shadow-float` (botão flutuante)
- Véus sobre foto: `--veil-photo` (tom quente do Hero), `--veil-hero-wide` (emenda da foto do Hero no desktop), `--veil-food` (Manifesto), `--veil-dark-photo` (CTA final)
- `--ease-out`, `--transition-base|slow|layout`

## Utilitários globais

- `.btn` / `.btnLight` — botão com preenchimento rosa (`--color-accent-light`) no hover/toque
- `.eyebrow` — rótulo pequeno em caixa alta (usar pouco)
- `.maskLine` — agrupa linhas de título (sem máscara; o título inteiro faz o fade)
- `[data-anim]` — reveal ao entrar na tela (`fade-up`, `blur-in`, `scale-in`, `lines`)

## Logo

Vetorizada a partir do arquivo da cliente (`docs/brand/`), em quatro camadas aplicadas como máscara (`public/logo/`). Cores por tom: `dark` (fundos claros) e `light` (fundos escuros). Tamanho por `--logo-h`.
