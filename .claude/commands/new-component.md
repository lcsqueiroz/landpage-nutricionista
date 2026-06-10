---
description: Cria um novo componente de seção com a estrutura padrão do projeto (JS + CSS Module)
---

Crie um novo componente de seção para o projeto da nutricionista seguindo as convenções abaixo.

## Convenções obrigatórias

**Estrutura de arquivos:**
```
components/<NomeComponente>/
├── <NomeComponente>.js
└── <NomeComponente>.module.css
```

**Tipo (Server vs Client):**
- Padrão: Server Component (sem 'use client')
- Usar 'use client' APENAS se o componente precisar de: useState, useEffect, event handlers, IntersectionObserver

**Template JS (Server Component):**
```js
import styles from './<NomeComponente>.module.css';

export default function <NomeComponente>() {
  return (
    <section className={styles.section} id="<id-da-secao>">
      <div className={styles.container}>
        {/* conteúdo */}
      </div>
    </section>
  );
}
```

**Template CSS Module:**
```css
.section {
  padding: var(--spacing-section) var(--container-padding);
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
}

/* Mobile-first: estilos base para mobile */
/* Tablet */
@media (min-width: 768px) {

}

/* Desktop */
@media (min-width: 1024px) {

}
```

## Mobile-first obrigatório
- Sempre escrever CSS base para mobile (320px+)
- Depois expandir com media queries para tablet (768px+) e desktop (1024px+)
- A maioria dos visitantes vem pelo Instagram → mobile é prioridade absoluta

## Tokens disponíveis (globals.css)
- Cores: `--color-primary`, `--color-accent`, `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`
- Espaçamento: `--spacing-section`, `--container-max`, `--container-padding`, `--gap-cards`
- Tipografia: `--font-heading`, `--font-body`, `--text-xs` até `--text-5xl`
- Bordas/sombras: `--radius-card`, `--shadow-card`, `--shadow-card-hover`
- Animações: `--transition-fast`, `--transition-base`, `--transition-slow`

## Ao finalizar
- Adicionar o componente em `app/page.js`
- Se for uma seção nova, adicionar entrada no header (nav link com âncora)
- Verificar referência em `docs/sections.md`

Aguarda o nome e propósito do componente para começar.
