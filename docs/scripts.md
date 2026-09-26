# Scripts

## Imagem de pré-visualização — `scripts/og-image/`

O site publica `src/app/opengraph-image.jpg` estático (o PNG gerado pelo Next passa de 400KB). Para regenerar:

1. Copie `scripts/og-image/opengraph-image.js` para `src/app/` e mova temporariamente `src/app/opengraph-image.jpg` para fora.
2. `npm run build && npm run start`
3. Baixe `http://localhost:3000/opengraph-image` e converta para JPEG (qualidade ~86) em `src/app/opengraph-image.jpg`.
4. Apague `src/app/opengraph-image.js`.

As cores do gerador espelham os tokens de `globals.css` (o `ImageResponse` não lê variáveis CSS). As fontes ficam em `scripts/og-image/fonts/`.

## Logo — `scripts/brand/`

Requer Python 3 com `numpy`, `pillow` e `potracer` (`pip install numpy pillow potracer`).

| Script | Entrada | Saída |
|---|---|---|
| `vectorize_logo.py` | `docs/brand/logo-horizontal-original.jpg` | `public/logo/{script,detail,flesh,seeds}.svg` |
| `generate_icons.py` | `docs/brand/logo-monograma-original.jpg` | `src/app/{icon.png,apple-icon.png,favicon.ico}` |

```bash
python scripts/brand/vectorize_logo.py
python scripts/brand/generate_icons.py
```

Se a cliente enviar a logo em vetor (AI/SVG/PDF), prefira extrair as camadas direto do arquivo em vez de vetorizar o JPEG.

## Testes de qualidade — `scripts/qa/`

Rodam com o Chrome instalado (`CHROME_PATH` para outro caminho) e dependências temporárias, fora do `package.json`:

```bash
npm i --no-save puppeteer-core axe-core pngjs
```

| Script | O que verifica | Alvo padrão |
|---|---|---|
| `smoke.mjs` | status, console, CSP, h1, ids, âncoras, alt, `noopener`, JSON-LD, rolagem horizontal, links do WhatsApp, alvos de toque, cabeçalhos de segurança, assets | build de produção em `:3123` |
| `contrast-axe.mjs` | contraste AA e AAA pelo axe (o mesmo motor do Lighthouse) | `next dev` em `:3000` |
| `contrast-pixels.mjs` | contraste AA/AAA de cada texto contra os pixels reais do fundo (foto, gradiente, botão), onde o axe não mede | `next dev` em `:3000` |

```bash
node scripts/qa/contrast-pixels.mjs
BASE=http://localhost:3123 node scripts/qa/smoke.mjs
```

**Build de produção sem derrubar o `next dev`:** `npm run build` escreve na mesma pasta `.next` do servidor de dev e o quebra. Pare o dev antes, ou teste numa cópia do projeto.
