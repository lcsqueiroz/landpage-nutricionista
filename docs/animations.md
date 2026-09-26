# Animações

Tudo sem bibliotecas, em `src/components/Interactions/`. Com `prefers-reduced-motion`, reveals aparecem direto e os efeitos por scroll ficam em valores neutros.

## Reveal — `data-anim`

Elementos com `data-anim` ganham `.is-visible` ao entrar na tela (IntersectionObserver). Elementos pulados por saltos de scroll também são revelados.

| Valor | Efeito |
|---|---|
| `fade-up` | sobe e aparece |
| `blur-in` | desfoca → nítido |
| `scale-in` | cresce levemente |
| `lines` | o contêiner fica visível; os filhos `.maskLine` sobem |

Atraso: `style={{ '--anim-delay': '120ms' }}` (ou `--line-delay` em `.maskLine`).

## Progresso de scroll — `data-progress`

O elemento recebe `--p` (0 → 1), atualizado a cada frame de rolagem enquanto está perto da tela, preso direto à posição (sem suavização). O CSS usa `--p` para parallax, máscaras, escalas etc.

| Modo | 0 | 1 |
|---|---|---|
| `view` (padrão) | topo entra por baixo | base sai por cima |
| `enter` | topo entra por baixo | elemento todo visível |
| `exit` | topo alinhado ao topo da tela | elemento saiu por completo |
| `pin` | início do trecho fixo | fim do trecho fixo |

`--page-progress` no `:root` alimenta a barra de leitura do header.

## Rolagem

Nativa do navegador em todos os dispositivos (a rolagem suave própria da roda do mouse foi removida por parecer artificial). Âncoras internas deslizam pelo `scroll-behavior: smooth` do CSS.

## WebGL — `HeroGL`

Shader próprio sobre a foto do Hero (grão e tratamento de cor; a foto não se move com o scroll). Pausa fora da tela e com a aba oculta; sem WebGL, a `<img>` continua visível. Só inicia na primeira interação (ou após 6s) para não pesar no carregamento.
