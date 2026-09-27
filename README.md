# Larissa Genari — Nutricionista

Site profissional da nutricionista Larissa Genari (CRN-3 94745): apresentação, formação, serviços e agendamento via WhatsApp. Feito para quem chega pelo Instagram, com prioridade para o mobile.

## Stack

Next.js 16 (App Router) · JavaScript · CSS Modules · `next/font` · Vercel (Analytics + Speed Insights)

## Começando

```bash
npm install
cp .env.example .env.local   # preencha NEXT_PUBLIC_WA_NUMBER
npm run dev                  # http://localhost:3000
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run check` | Lint + build (rodar antes de publicar) |

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXT_PUBLIC_WA_NUMBER` | Sim (produção) | WhatsApp com DDI e DDD, só dígitos |
| `NEXT_PUBLIC_SITE_URL` | Não | URL pública; padrão `https://www.larigenari.com.br` |

## Documentação

Tudo em [`docs/`](docs): estrutura, design system, animações, conteúdo, SEO, scripts e pendências ([`docs/debitos.md`](docs/debitos.md)).
