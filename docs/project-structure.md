# Estrutura do projeto

Regra geral: cada pasta tem um papel só. A `app/` guarda apenas rotas e arquivos que o Next reconhece por nome; configuração fica na raiz porque é lá que o Next, o ESLint e o npm procuram.

```
├── docs/
│   ├── brand/                      # arquivos originais da marca (logo JPEG/PNG da cliente)
│   └── *.md                        # documentação
├── public/                         # servido por URL, sem processamento
│   ├── logo/                       # logo vetorizada: script, detail, flesh, seeds (máscaras SVG)
│   ├── patterns/                   # textura de frutas (máscara SVG) do Sobre e dos Serviços
│   └── robots.txt
├── scripts/
│   ├── brand/                      # vetorização da logo e geração de ícones (Python)
│   ├── og-image/                   # gerador da imagem de pré-visualização + fontes
│   └── qa/                         # testes de fumaça e de contraste AA/AAA (puppeteer + axe)
├── src/
│   ├── app/                        # só rotas e arquivos de convenção do Next
│   │   ├── layout.js               # fontes, CSS global, metadata, JSON-LD, Analytics
│   │   ├── page.js                 # composição das seções
│   │   ├── not-found.js            # página 404 (+ .module.css)
│   │   ├── politica-de-privacidade/
│   │   ├── sitemap.js
│   │   ├── opengraph-image.jpg     # imagem de pré-visualização (+ .alt.txt)
│   │   └── icon.png · apple-icon.png · favicon.ico
│   ├── components/
│   │   ├── layout/                 # presentes em toda página: Header, Footer, StickyWhatsApp
│   │   ├── sections/               # seções da home: Hero, Servicos, Manifesto, Sobre, Jornada, Instagram, CTAFinal
│   │   ├── ui/                     # peças reutilizáveis: Logo, Icons
│   │   └── behavior/               # só comportamento, sem visual: Interactions
│   ├── content/                    # textos e dados editáveis (services, journey, education, instagram)
│   ├── config/                     # site.js: nome, CRN, links, URL, desenvolvedor
│   ├── lib/                        # funções utilitárias (whatsapp.js)
│   ├── styles/                     # CSS global, importado em layout.js nesta ordem:
│   │   ├── tokens.css              #   1. design system (cores, fontes, espaçamentos)
│   │   ├── base.css                #   2. reset e estilos de base
│   │   └── utilities.css           #   3. .btn, .eyebrow, reveal, movimento reduzido
│   └── assets/images/              # importadas via next/image
│       ├── larissa/                # hero-wide (desktop), sobre (cor ajustada), original-01, original-03
│       ├── food/                   # fotos de comida do Unsplash
│       └── instagram/              # capas dos posts em destaque
├── .env.example
├── eslint.config.mjs · jsconfig.json · package.json
└── next.config.mjs                 # React Compiler + cabeçalhos de segurança
```

Cada componente tem sua pasta com `.js` + `.module.css` (ex.: `src/components/sections/Hero/Hero.js`). O alias `@/` aponta para `src/`.

## Componentes

| Componente | Pasta | Tipo | Papel |
|---|---|---|---|
| `Header` | `layout/` | client | Logo central, redes à esquerda, menu/CTA à direita, menu mobile |
| `Footer` | `layout/` | server | Logo, navegação, contato, CRN, direitos e crédito do desenvolvedor |
| `StickyWhatsApp` | `layout/` | client | Botão fixo no mobile (some nos serviços e no CTA) |
| `Hero` | `sections/` | server | Título e foto sem moldura (retrato no mobile, paisagem de ponta a ponta no desktop, via `<picture>`) |
| `Servicos` | `sections/` | server | Cartões em acordeão (`<details>` nativo) com miniatura de comida, textura de frutas e link de WhatsApp por serviço |
| `Manifesto` | `sections/` | server | Faixa de foto de comida de ponta a ponta com a frase da Larissa |
| `Sobre` | `sections/` | server | Apresentação com foto, texto em primeira pessoa, formação e textura de frutas |
| `Jornada` | `sections/` | server | "Como funciona": faixa de foto com base diagonal + etapas em grade (1/2/3 colunas) |
| `Instagram` | `sections/` | server | Posts em destaque (dados em `content/instagram.js`) |
| `CTAFinal` | `sections/` | server | Chamada final para o WhatsApp, em tela cheia |
| `Logo` | `ui/` | server | Logo em camadas, `tone="dark"` ou `"light"` |
| `Icons` | `ui/` | server | Ícones SVG inline |
| `Interactions` | `behavior/` | client | Reveal por IntersectionObserver e âncora da URL (`docs/animations.md`) |

## Dados e utilitários

| Arquivo | Conteúdo |
|---|---|
| `config/site.js` | URL do site, nome, título, CRN, Instagram, desenvolvedor |
| `lib/whatsapp.js` | Montagem dos links do WhatsApp |
| `content/services.js` | Serviços (título, miniatura, descrição, tópicos) |
| `content/journey.js` | Etapas do "Como funciona" |
| `content/education.js` | Formação e pesquisa (bloco dentro do Sobre) |
| `content/instagram.js` | Posts em destaque |
