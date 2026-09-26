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
- [ ] Cores da hierarquia de texto (`--color-heading` … `--color-label`), contraste AA

### Movimento
- [ ] Efeitos por scroll (`data-progress`) não escondem conteúdo antes de ser lido no mobile
- [ ] `prefers-reduced-motion` respeitado

### Específicos
- [ ] Header: logo legível sobre a foto do Hero; menu mobile abre e fecha sem artefatos
- [ ] Hero: foto em tela cheia e título sobre o esmaecido
- [ ] Serviços: cards empilhados sem sobreposição do botão fixo

## Como usar

Indique o componente ou peça revisão geral. Liste problemas com `arquivo:linha` e a correção proposta. Se possível, valide com emulação real de dispositivo (toque e densidade de pixels).
