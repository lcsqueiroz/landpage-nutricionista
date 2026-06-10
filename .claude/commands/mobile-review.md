---
description: Revisa um componente para garantir qualidade mobile-first (prioridade Instagram)
---

Revise o componente ou seção indicado para garantir que a experiência mobile está correta. A maioria dos visitantes vem pelo Instagram — mobile é prioridade absoluta.

## Checklist de revisão mobile

### Layout e espaçamento
- [ ] CSS base escrito para 320px (sem assumir tela larga)
- [ ] `padding` e `gap` usam `clamp()` ou variáveis de espaçamento responsivo
- [ ] Nenhum elemento com `width` fixo em px que quebre em telas pequenas
- [ ] Textos não truncam ou somem em telas pequenas
- [ ] Imagens com `next/image` têm `sizes` correto para mobile

### Touch e interação
- [ ] Todos os botões e links têm área de toque ≥ 44×44px
- [ ] Espaçamento entre elementos clicáveis ≥ 8px (evitar clique acidental)
- [ ] Sem hover-only states que esconde informação importante
- [ ] Formulários (LeadModal) com `font-size: 16px` nos inputs (evita zoom no iOS)

### Tipografia
- [ ] Tamanho mínimo de fonte: 14px para textos secundários, 16px para corpo
- [ ] Hierarquia legível sem precisar de zoom
- [ ] Line-height adequado para mobile (≥ 1.5 para parágrafos)

### Componentes específicos
- [ ] Header: menu mobile funcional (hamburguer ou nav simplificada)
- [ ] Hero: foto e texto empilhados verticalmente em mobile
- [ ] Packages: cards em coluna única (não side-by-side) em mobile
- [ ] LeadModal: modal ocupa 90% da largura, campos com `width: 100%`
- [ ] Testimonials: carrossel horizontal com scroll-snap ativo
- [ ] StickyWhatsApp: visível apenas em telas < 768px

### Performance mobile
- [ ] Imagem do Hero tem `priority` no `next/image`
- [ ] Nenhuma fonte extra além de Playfair Display e Inter
- [ ] Animações com `prefers-reduced-motion` respeitado

## Como usar

Indique o componente ou arquivo a revisar, ou peça uma revisão geral da página.
Após a análise, liste os problemas encontrados com localização (arquivo:linha) e correção proposta.
