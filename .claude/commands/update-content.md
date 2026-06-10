---
description: Atualiza conteúdo do site (pacotes, depoimentos, FAQ, textos) seguindo o content-guide
---

Atualize o conteúdo do site conforme solicitado. Todo conteúdo editável fica em `lib/` ou diretamente nos componentes.

## Mapa de onde fica cada conteúdo

| Conteúdo | Arquivo |
|----------|---------|
| Número do WhatsApp | `.env.local` → `NEXT_PUBLIC_WA_NUMBER` |
| Pacotes (nome, preço, itens) | `lib/whatsapp.js` → array `PACKAGES` |
| Objetivos do select | `lib/whatsapp.js` → array `OBJECTIVES` |
| Depoimentos | `lib/testimonials.js` |
| FAQ perguntas e respostas | `components/FAQ/FAQ.js` |
| Bio da profissional | `components/About/About.js` |
| Especialidades | `components/About/About.js` |
| Headline do Hero | `components/Hero/Hero.js` |
| Textos das etapas (Como Funciona) | `components/HowItWorks/HowItWorks.js` |
| Texto do CTA final | `components/FinalCTA/FinalCTA.js` |
| Endereço e redes sociais | `components/Footer/Footer.js` |
| Metadata SEO | `app/layout.js` → `export const metadata` |

## Regras ao atualizar conteúdo

1. **Pacotes**: o `id` do pacote aparece na mensagem do WhatsApp — manter kebab-case sem espaços
2. **Mensagem WhatsApp**: ao mudar o nome de um pacote, verificar se a mensagem gerada ainda faz sentido em `lib/whatsapp.js` → `buildWhatsAppUrl()`
3. **Imagens**: substituir em `public/` mantendo o mesmo nome de arquivo; re-otimizar para WebP antes de subir
4. **Depoimentos**: mínimo 3, máximo 5 para o carrossel funcionar bem em mobile
5. **Metadata**: após mudar domínio ou nome, atualizar `app/layout.js` E `app/sitemap.js`

## Guia completo de conteúdo

Ver `docs/content-guide.md` para a lista completa de informações que a profissional precisa fornecer, com especificações de imagem e checklist de go-live.

Indique qual conteúdo deseja atualizar para começar.
