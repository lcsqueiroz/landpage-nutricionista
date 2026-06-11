# Design System

> Tokens centralizados em `app/globals.css` via CSS Custom Properties. Nenhum componente define cor, fonte ou espaçamento diretamente — sempre via variável.

---

## Paleta de Cores

```css
:root {
  /* Primária — Verde saúde, transmite naturalidade e confiança */
  --color-primary:        #2E7D32;
  --color-primary-light:  #4CAF50;
  --color-primary-dark:   #1B5E20;
  --color-primary-subtle: #E8F5E9; /* fundo de badges, highlights suaves */

  /* Acento — Dourado/âmbar para CTAs e destaques */
  --color-accent:         #F9A825;
  --color-accent-hover:   #F57F17;

  /* Neutros */
  --color-bg:             #FAFAF7; /* off-white levemente quente */
  --color-surface:        #FFFFFF;
  --color-border:         #E8E8E4;

  /* Texto */
  --color-text:           #1A1A1A;
  --color-text-muted:     #5A5A5A;
  --color-text-subtle:    #9E9E9E;

  /* Feedback */
  --color-error:          #D32F2F;
  --color-success:        #2E7D32;
}
```

### Uso dos tokens

| Token | Onde usar |
|-------|-----------|
| `--color-primary` | Texto de destaque, ícones, borda de card ativo |
| `--color-primary-light` | Hover de botões secundários, checkmarks |
| `--color-primary-subtle` | Fundo de badges CRN, fundo de seções alternadas |
| `--color-accent` | Botão CTA principal ("Agendar", "Quero este pacote") |
| `--color-accent-hover` | Hover/active do botão CTA |
| `--color-bg` | Background da página |
| `--color-surface` | Cards, modais, header ao rolar |

---

## Tipografia

```css
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;
}
```

**Carregamento via `next/font` em `src/app/layout.js`** — sem requisição externa, zero layout shift.

### Escala tipográfica

```css
:root {
  --text-xs:   0.75rem;   /*  12px */
  --text-sm:   0.875rem;  /*  14px */
  --text-base: 1rem;      /*  16px */
  --text-lg:   1.125rem;  /*  18px */
  --text-xl:   1.25rem;   /*  20px */
  --text-2xl:  1.5rem;    /*  24px */
  --text-3xl:  1.875rem;  /*  30px */
  --text-4xl:  2.25rem;   /*  36px */
  --text-5xl:  3rem;      /*  48px */
}
```

### Uso da hierarquia

| Tag | Font | Size (mobile → desktop) | Weight |
|-----|------|--------------------------|--------|
| `h1` | Heading | `--text-3xl` → `--text-5xl` | 700 |
| `h2` | Heading | `--text-2xl` → `--text-4xl` | 600 |
| `h3` | Heading | `--text-xl` → `--text-2xl` | 600 |
| `p` | Body | `--text-base` → `--text-lg` | 400 |
| `small`, caption | Body | `--text-sm` | 400 |
| Botão CTA | Body | `--text-base` | 600 |

---

## Espaçamento

```css
:root {
  /* Espaçamento de seções — escala fluida com clamp() */
  --spacing-section:    clamp(3rem, 8vw, 6rem);    /* padding-top/bottom de cada seção */
  --spacing-section-sm: clamp(2rem, 5vw, 4rem);    /* seções menores (CTA final) */

  /* Container */
  --container-max:     1200px;
  --container-padding: clamp(1rem, 5vw, 2rem);     /* padding lateral responsivo */

  /* Grid gaps */
  --gap-cards: clamp(1rem, 3vw, 1.5rem);

  /* Componentes */
  --spacing-card-padding: clamp(1.25rem, 3vw, 2rem);
}
```

---

## Bordas e Sombras

```css
:root {
  --radius-sm:   6px;
  --radius-card: 12px;
  --radius-full: 9999px; /* pills, badges */

  --shadow-sm:   0 1px 4px rgba(0, 0, 0, 0.06);
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-modal: 0 24px 64px rgba(0, 0, 0, 0.18);
}
```

---

## Animações e Transições

```css
:root {
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   350ms ease;
  --transition-layout: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Padrões de uso

| Situação | Token |
|----------|-------|
| Hover em botões e links | `--transition-fast` |
| Fade do header ao rolar | `--transition-base` |
| Accordion FAQ (max-height) | `--transition-slow` |
| Entrada de modal (scale + opacity) | `--transition-layout` |

### Entrada do Modal

```css
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.modal {
  animation: modalIn var(--transition-layout) forwards;
}
```

---

## Breakpoints

```css
/* Mobile-first — estilos base escritos para mobile */
/* Tablet  */ @media (min-width: 768px)  { ... }
/* Desktop */ @media (min-width: 1024px) { ... }
/* Wide    */ @media (min-width: 1280px) { ... }
```

---

## Componentes de UI Base

### Botão CTA (primário)

```css
.btnPrimary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: var(--color-accent);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.btnPrimary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}

.btnPrimary:active {
  transform: translateY(0);
}
```

### Botão Secundário (outline)

```css
.btnSecondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-full);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.btnSecondary:hover {
  background: var(--color-primary);
  color: #fff;
}
```

### Card de Pacote

```css
.packageCard {
  background: var(--color-surface);
  border-radius: var(--radius-card);
  padding: var(--spacing-card-padding);
  box-shadow: var(--shadow-card);
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}

.packageCard:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-4px);
}

.packageCard.featured {
  border: 2px solid var(--color-primary);
}
```

---

## Ícones

Usar **Phosphor Icons** (`@phosphor-icons/react`) ou SVGs inline. Não usar icon fonts. Tamanhos padrão:

| Contexto | Tamanho |
|----------|---------|
| Ícones em listas de features | 20px |
| Ícones em steps (Como Funciona) | 32px |
| Ícone WhatsApp em botões | 20px |
| Ícone WhatsApp no sticky bar | 24px |
