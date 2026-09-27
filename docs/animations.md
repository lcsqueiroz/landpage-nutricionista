# Animações

**Modo calmo:** o site quase não se mexe. Nada acompanha a rolagem (sem parallax, recortes, zoom ou painéis que se expandem) e não há WebGL. Isso foi uma decisão: efeitos demais deixavam o site com cara artificial.

O que sobrou, sem bibliotecas:

| Onde | Efeito |
|---|---|
| Blocos com `data-anim` | fade curto (600ms, sobe 12px) ao entrar na tela |
| Texto do Hero | fade de 600ms no carregamento; a foto já nasce pronta (bom para o LCP) |
| Serviços | abrir/fechar do acordeão (`<details>`), altura animada onde o navegador suporta |
| Menu mobile | fade de 300ms |
| Header | some ao rolar para baixo e volta ao rolar para cima |

Com `prefers-reduced-motion`, tudo aparece direto.

## Reveal — `data-anim`

Em `src/components/behavior/Interactions/`: elementos com `data-anim` ganham `.is-visible` ao entrar na tela (IntersectionObserver). Elementos pulados por saltos de scroll também são revelados. Todos os valores (`fade-up`, `lines`) fazem o mesmo fade; `.maskLine` só agrupa linhas de título, sem máscara.

Atraso: `style={{ '--anim-delay': '120ms' }}`.

## Rolagem

Nativa do navegador em todos os dispositivos. Âncoras internas deslizam pelo `scroll-behavior: smooth` do CSS.

## Antes de adicionar um efeito

Evitar qualquer coisa ligada à posição do scroll, animações longas (> 600ms) ou em loop. Se precisar chamar atenção, usar cor, foto e espaço, não movimento.
