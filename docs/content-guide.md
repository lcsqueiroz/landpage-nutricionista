# Onde editar cada conteúdo

| Conteúdo | Onde |
|---|---|
| Nome, título, CRN, Instagram, URL do site | `src/config/site.js` |
| Crédito do desenvolvedor (rodapé) e responsável pelos dados (política) | `src/config/site.js` (`DEVELOPER`) |
| Número do WhatsApp | variável `NEXT_PUBLIC_WA_NUMBER` (Vercel / `.env.local`) |
| Mensagens enviadas no WhatsApp | `src/lib/whatsapp.js` |
| Título e texto do Hero | `src/components/sections/Hero/Hero.js` |
| Foto do Sobre | `src/assets/images/larissa/sobre.jpg` (a `original-01.jpg` com a cor ajustada para o tom da foto do Hero) |
| Fotos do Hero | `src/assets/images/larissa/original-03.jpg` (mobile/tablet) e `src/assets/images/larissa/hero-wide.jpg` (desktop, paisagem ≥ 1672×941 com a Larissa no centro) |
| Texto do Sobre | `src/components/sections/Sobre/Sobre.js` (`BIO`) |
| Frase da faixa de foto (Manifesto) | `src/components/sections/Manifesto/Manifesto.js` (`STATEMENT`) |
| Formação e pesquisa (no Sobre) | `src/content/education.js` |
| Serviços (texto e miniatura) | `src/content/services.js` |
| Etapas do "Como funciona" | `src/content/journey.js` |
| Posts do Instagram | `src/content/instagram.js` + capas em `src/assets/images/instagram/` |
| Texto do CTA final | `src/components/sections/CTAFinal/CTAFinal.js` |
| Política de privacidade | `src/app/politica-de-privacidade/page.js` (atualizar `UPDATED_AT`) |
| Título/descrição no Google e redes | `src/app/layout.js` (`metadata`) |

## Fotos

Ficam em `src/assets/images/` e entram via `next/image` (otimização automática). Para trocar, substitua o arquivo mantendo o nome ou atualize o `import`.

As fotos de comida (`src/assets/images/food/`) são do [Unsplash](https://unsplash.com/license) (uso comercial livre, sem atribuição obrigatória). O ideal é trocá-las por fotos próprias da Larissa quando existirem:

| Arquivo | Onde aparece | Origem |
|---|---|---|
| `bowl-colorido.jpg` | Manifesto | unsplash.com/photos/IGfIGP5ONV0 |
| `hortifruti.jpg` | Serviço: Nutrição clínica | unsplash.com/photos/lzyaeNQ9wU4 |
| `tomates-linho.jpg` | Serviço: Reeducação alimentar | unsplash.com/photos/-lM91wXmnPM |
| `salada-grao-de-bico.jpg` | Serviço: Emagrecimento saudável | unsplash.com/photos/lCzfUBEOuTA |
| `prato-escuro.jpg` | Fundo do CTA final | unsplash.com/photos/oaz0raysASk |
| `preparo-tabua.jpg` | Como funciona (faixa com base diagonal) | unsplash.com/photos/DTNrMk0-yvs |

## Tom dos textos

Para não soar como texto de IA: situações concretas da rotina (exame alterado, beliscar à tarde, mercado perto de casa), ritmo variado (frase curta, depois longa), sem listas de três em toda frase, sem "Transforme…", "Descubra…", "Não apenas… mas também…". Nada de inventar fatos da vida da Larissa.

Se o CRN-3 exigir declaração de apoio de IA (Código de Ética 2026), sugestão de linha no rodapé: "Textos e imagens produzidos com apoio de ferramentas digitais e revisados pela nutricionista."

- Primeira pessoa, voz da Larissa, linguagem simples.
- Saúde através da comida; emagrecimento é consequência, nunca promessa.
- Sem clichês ("sem milagres", "resultados duradouros") e sem prometer resultado.
- Sem depoimentos ou dados de pacientes; sem fotos de "antes e depois".
- Atendimento online, sem citar região.
