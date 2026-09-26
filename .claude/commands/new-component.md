---
description: Cria um novo componente de seção com a estrutura padrão do projeto (JS + CSS Module)
---

Crie um novo componente de seção seguindo as convenções abaixo.

## Estrutura

```
src/components/<Nome>/
├── <Nome>.js
└── <Nome>.module.css
```

Server Component por padrão; `'use client'` só com estado, efeitos, eventos ou APIs do navegador. Conteúdo editável vai para `src/lib/`.

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

- Só tokens de `globals.css` (ver `docs/design-system.md`); cantos quase retos.
- Comentários de uma linha só.
- Animações via `data-anim` / `data-progress` (ver `docs/animations.md`), com `prefers-reduced-motion`.
- Alterne o fundo com as seções vizinhas (`--color-bg`, `--color-surface`, `--color-surface-2`, escuro).

## Ao finalizar

- Adicionar em `src/app/page.js` e, se fizer sentido, no menu (`Header.js`) e no rodapé (`Footer.js`).
- Atualizar `docs/project-structure.md`.
- Rodar `npm run check`.
