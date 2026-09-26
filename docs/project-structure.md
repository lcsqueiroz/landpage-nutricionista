# Estrutura do projeto

```
├── docs/
│   ├── brand/                  # arquivos originais da marca (logo JPEG/PNG da cliente)
│   └── *.md                    # documentação
├── public/
│   ├── logo/                   # logo vetorizada: script, detail, flesh, seeds (máscaras SVG)
│   └── robots.txt
├── scripts/
│   ├── brand/                  # vetorização da logo e geração de ícones (Python)
│   ├── og-image/               # gerador da imagem de pré-visualização + fontes
│   └── qa/                     # testes de fumaça e de contraste AA/AAA (puppeteer + axe)
├── src/
│   ├── app/
│   │   ├── layout.js           # fontes, metadata, JSON-LD, Analytics
│   │   ├── page.js             # composição das seções
│   │   ├── globals.css         # tokens, reset e utilitários (.btn, .eyebrow, reveal)
│   │   ├── not-found.js        # página 404
│   │   ├── politica-de-privacidade/
│   │   ├── sitemap.js
│   │   ├── opengraph-image.jpg # imagem de pré-visualização (+ .alt.txt)
│   │   └── icon.png · apple-icon.png · favicon.ico
│   ├── assets/                 # fotos (importadas via next/image)
│   │   └── instagram/          # capas dos posts em destaque
│   ├── components/             # uma pasta por componente (.js + .module.css)
│   └── lib/                    # conteúdo e dados estáticos
├── .env.example
└── next.config.mjs             # React Compiler + cabeçalhos de segurança
```

## Componentes

| Componente | Tipo | Papel |
|---|---|---|
| `Header` | client | Logo central, redes à esquerda, menu/CTA à direita, menu mobile |
| `Hero` + `HeroGL` | server + client | Título, foto em arco e camada WebGL sobre a foto |
| `Sobre` | server | Apresentação, citação, texto em primeira pessoa e formação |
| `Servicos` | server | Lista em acordeão (`<details>` nativo) com link de WhatsApp por serviço |
| `Jornada` | server | "Como funciona": linha do tempo do atendimento |
| `Instagram` | server | Posts em destaque (dados em `lib/instagram.js`) |
| `CTAFinal` | server | Chamada final para o WhatsApp |
| `Footer` | server | Logo, navegação, contato, CRN |
| `StickyWhatsApp` | client | Botão fixo no mobile (some nos serviços e no CTA) |
| `Interactions` | client | Motor de animações e rolagem suave (`docs/animations.md`) |
| `Logo` | server | Logo em camadas, `tone="dark"` ou `"light"` |
| `Icons` | server | Ícones SVG inline |

## `src/lib`

| Arquivo | Conteúdo |
|---|---|
| `site.js` | URL do site, nome, título, CRN, Instagram |
| `whatsapp.js` | Montagem dos links do WhatsApp |
| `services.js` | Serviços (título, ícone, descrição, tópicos) |
| `journey.js` | Etapas do "Como funciona" |
| `education.js` | Formação e pesquisa (bloco dentro do Sobre) |
| `instagram.js` | Posts em destaque |
