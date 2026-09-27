---
description: Revisa um componente para garantir qualidade mobile-first (prioridade Instagram)
---

Revise o componente ou seção indicado. A maioria dos visitantes vem pelo Instagram — mobile é prioridade absoluta.

## Checklist

### Layout
- [ ] CSS base para 320px; `@media (min-width: 768px)` e `(min-width: 1024px)` só expandem
- [ ] Sem larguras fixas que quebrem telas pequenas; sem rolagem horizontal
- [ ] Composição com intenção (sangrias, sobreposições), não só blocos empilhados
- [ ] `next/image` com `sizes` real no mobile

### Toque
- [ ] Alvos de toque ≥ 44×44px, com ≥ 8px entre eles
- [ ] Nada importante só no hover; hover tem equivalente em `:active`/`:focus-visible`
- [ ] Botão fixo de WhatsApp não cobre conteúdo clicável

### Tipografia e cor
- [ ] Corpo ≥ 16px, secundário ≥ 14px, line-height ≥ 1.5
- [ ] Cores da hierarquia de texto (`--color-heading` … `--color-label`), contraste AAA

### Movimento
- [ ] Só fades curtos (`data-anim`); nada ligado à rolagem, nada em loop (modo calmo)
- [ ] `prefers-reduced-motion` respeitado

### Específicos
- [ ] Header: faixa sólida branca, logo legível; menu mobile abre e fecha sem artefatos
- [ ] Hero: foto de ponta a ponta no topo e título sobre o esmaecido
- [ ] Serviços: acordeão abre/fecha sem ficar coberto pelo botão fixo do WhatsApp
- [ ] Sobre: foto na largura do conteúdo, margens iguais dos dois lados

## Como usar

Indique o componente ou peça revisão geral. Liste problemas com `arquivo:linha` e a correção proposta. Se possível, valide com emulação real de dispositivo (toque e densidade de pixels).
