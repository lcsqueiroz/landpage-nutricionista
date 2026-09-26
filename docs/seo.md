# SEO, pré-visualização e segurança

## Metadata

`src/app/layout.js` define título (com template `%s | Larissa Genari — Nutricionista`), descrição, Open Graph, Twitter e robots. `metadataBase` usa `SITE_URL` de `src/lib/site.js`.

## Pré-visualização do link

`src/app/opengraph-image.jpg` (1200×630, JPEG ~70KB — o WhatsApp falha com imagens pesadas) + `opengraph-image.alt.txt`. Para regenerar, ver `docs/scripts.md`.

## Dados estruturados

JSON-LD no `layout.js` (`MedicalBusiness` + `Person` com CRN). Os serviços vêm de `src/lib/services.js`. O JSON é escapado (`<` → `<`) antes de ir para a página.

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
