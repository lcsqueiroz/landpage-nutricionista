# Onde editar cada conteúdo

| Conteúdo | Onde |
|---|---|
| Nome, título, CRN, Instagram, URL do site | `src/lib/site.js` |
| Número do WhatsApp | variável `NEXT_PUBLIC_WA_NUMBER` (Vercel / `.env.local`) |
| Mensagens enviadas no WhatsApp | `src/lib/whatsapp.js` |
| Título e texto do Hero | `src/components/Hero/Hero.js` |
| Citação e texto do Sobre | `src/components/Sobre/Sobre.js` (`STATEMENT`, `BIO`) |
| Formação e pesquisa (no Sobre) | `src/lib/education.js` |
| Serviços | `src/lib/services.js` |
| Etapas do "Como funciona" | `src/lib/journey.js` |
| Posts do Instagram | `src/lib/instagram.js` + capas em `src/assets/instagram/` |
| Texto do CTA final | `src/components/CTAFinal/CTAFinal.js` |
| Política de privacidade | `src/app/politica-de-privacidade/page.js` (atualizar `UPDATED_AT`) |
| Título/descrição no Google e redes | `src/app/layout.js` (`metadata`) |

## Fotos

Ficam em `src/assets/` e entram via `next/image` (otimização automática). Para trocar, substitua o arquivo mantendo o nome ou atualize o `import`.

## Tom dos textos

- Primeira pessoa, voz da Larissa, linguagem simples.
- Saúde através da comida; emagrecimento é consequência, nunca promessa.
- Sem clichês ("sem milagres", "resultados duradouros") e sem prometer resultado.
- Sem depoimentos ou dados de pacientes; sem fotos de "antes e depois".
- Atendimento online, sem citar região.
