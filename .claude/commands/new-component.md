---
description: Cria um novo componente de seção com a estrutura padrão do projeto (JS + CSS Module)
---

Crie um novo componente de seção seguindo as convenções abaixo.

## Estrutura

```
src/components/sections/<Nome>/     (ou layout/, ui/, behavior/, conforme o papel)
├── <Nome>.js
└── <Nome>.module.css
```

Server Component por padrão; `'use client'` só com estado, efeitos, eventos ou APIs do navegador. Conteúdo editável vai para `src/content/`; constantes em `src/config/site.js`. Importe com o alias: `@/components/sections/<Nome>/<Nome>`.

## Template JS

```js
import styles from './<Nome>.module.css';

export default function <Nome>() {
  return (
    <section id="<id>" className={styles.section} aria-labelledby="<id>-heading">
      <div className={styles.container}>
        <h2 id="<id>-heading" className={styles.heading} data-anim="lines">
          <span className="maskLine">
            <span>Título</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
```

## Template CSS

```css
.section {
  padding: var(--spacing-section) var(--container-padding);
  background: var(--color-bg);
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: 500;
  line-height: 1;
  color: var(--color-heading);
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {
}
```

## Regras

- Só tokens de `src/styles/tokens.css` (ver `docs/design-system.md`); cantos quase retos.
- Comentários de uma linha só.
- Animação só via `data-anim` (fade curto, ver `docs/animations.md`), com `prefers-reduced-motion`; nada ligado à rolagem.
- Sem fios finos de 1px; hover/estado ativo de botões e links em rosa (`--color-accent-light` / `--color-accent-hover`).
- Fundo segundo a hierarquia das seções (`--color-bg`, `--color-section-soft`, `--color-section-strong`, escuro); detalhes em `--color-surface-2`.

## Ao finalizar

- Adicionar em `src/app/page.js` e, se fizer sentido, no menu (`Header.js`) e no rodapé (`Footer.js`).
- Atualizar `docs/project-structure.md`.
- Rodar `npm run check`.
