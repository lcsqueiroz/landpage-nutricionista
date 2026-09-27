# SEO, pré-visualização e segurança

## Metadata

`src/app/layout.js` define título, descrição, canonical (`alternates.canonical`), Open Graph, Twitter e robots. `metadataBase` usa `SITE_URL` de `src/config/site.js` (`https://www.larigenari.com.br`).

- **Título da home** (60 caracteres): `Larissa Genari | Nutricionista online e reeducação alimentar`. Subpáginas usam o template `%s | Larissa Genari — Nutricionista`.
- **Descrição** (155 caracteres): traz a palavra-chave principal ("nutricionista online") de forma natural. Título até ~60 e descrição até ~160 caracteres para o Google não cortar.
- **Títulos de duas linhas** (`.maskLine`): a primeira linha termina com espaço (`<span>Como posso </span>`). Sem ele, o texto lido pelo Google e por leitores de tela sai grudado ("possote").
- **Imagens:** toda `<img>` tem `alt` descritivo, inclusive as decorativas dentro de contêiner `aria-hidden` (ferramentas de SEO contam `alt=""` como ausente).

### Relatório AIOSEO (2026-09-27) — o que não se aplica

A AIOSEO é feita para WordPress; estes avisos são falsos positivos em Next.js na Vercel:
- "JavaScript não minificado": o chunk apontado é um polyfill do Next, já minificado.
- "Tempo de resposta 0,25 s": a página é pré-renderizada e servida do cache da Vercel (`X-Vercel-Cache: HIT`); a diferença é latência da ferramenta.
- "25 requisições": os chunks de JS são divisão automática do Next e as imagens abaixo da dobra carregam sob demanda (`next/image`).
- "Poucos links internos": regra pensada para blogs; o site é uma página única com âncoras.

## Pré-visualização do link

`src/app/opengraph-image.jpg` (1200×630, JPEG ~70KB — o WhatsApp falha com imagens pesadas) + `opengraph-image.alt.txt`. Para regenerar, ver `docs/scripts.md`.

## Dados estruturados

JSON-LD no `layout.js` (`MedicalBusiness` + `Person` com CRN). Os serviços vêm de `src/content/services.js`. O JSON é escapado (`<` → `<`) antes de ir para a página.

## Rastreamento

- `src/app/sitemap.js` — home e política de privacidade
- `public/robots.txt` — libera tudo e aponta o sitemap
- `not-found.js` com `noindex`

## Ícones

`src/app/icon.png`, `apple-icon.png`, `favicon.ico` (gerados pelo script de ícones).

## Cabeçalhos de segurança (produção)

Definidos em `next.config.mjs`:

- `Content-Security-Policy` — só recursos do próprio domínio; `frame-ancestors 'none'`; `object-src 'none'`
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — câmera, microfone, localização e topics desligados
- `Strict-Transport-Security`
- `poweredByHeader: false`

Ao adicionar qualquer recurso externo (script, fonte, imagem, embed), atualizar a CSP.

## Privacidade

Vercel Web Analytics e Speed Insights (sem cookies, dados anônimos) — descritos em `/politica-de-privacidade`.
