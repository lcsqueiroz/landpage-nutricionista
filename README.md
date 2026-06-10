# Site Profissional — Nutricionista

Site institucional desenvolvido para nutricionistas, com foco em conversão via WhatsApp. O visitante navega pelos serviços, escolhe um pacote, preenche nome e objetivo — e é direcionado para o WhatsApp com uma mensagem personalizada já redigida.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js (App Router) |
| Linguagem | JavaScript |
| Estilização | CSS Modules + CSS Custom Properties |
| Fontes | `next/font` (Google Fonts — zero layout shift) |
| Imagens | `next/image` (WebP automático, lazy load) |
| Deploy | Vercel |

---

## Funcionalidades

- **Seções completas:** Hero, Sobre, Como Funciona, Pacotes, Depoimentos, FAQ, CTA Final, Footer
- **Modal de agendamento:** captura nome e objetivo do cliente antes de abrir o WhatsApp
- **Mensagem personalizada:** URL do WhatsApp gerada dinamicamente com nome, objetivo e pacote selecionado
- **CTA sticky mobile:** barra fixa no rodapé em telas < 768px, some ao chegar nos Pacotes
- **Header scroll-aware:** transparente no topo, sólido ao rolar
- **SEO pronto:** metadata completo, JSON-LD `MedicalBusiness`, sitemap automático, Open Graph
- **Performance:** Server Components por padrão, `'use client'` apenas onde necessário
- **Acessibilidade:** WCAG AA, `aria-label` em todos os controles, foco visível

---

## Começando

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Número do WhatsApp da profissional (somente dígitos, com DDI e DDD)
NEXT_PUBLIC_WA_NUMBER=5511999999999

# URL do site em produção (sem barra final)
NEXT_PUBLIC_SITE_URL=https://seudominio.com.br
```

> **Atenção:** variáveis com prefixo `NEXT_PUBLIC_` são expostas no client. Não inclua segredos aqui.

---

## Scripts

```bash
npm run dev      # Desenvolvimento (hot reload)
npm run build    # Build de produção
npm run start    # Servidor de produção (requer build)
npm run lint     # Lint com ESLint
```

---

## Estrutura de Pastas

```
├── app/                   # App Router (rotas, layout, metadata)
├── components/            # Componentes por seção
├── lib/                   # Utilitários (WhatsApp URL builder)
├── public/                # Assets estáticos (imagens, robots.txt)
└── docs/                  # Documentação do projeto
```

Veja [`docs/project-structure.md`](docs/project-structure.md) para a árvore completa.

---

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [`docs/sections.md`](docs/sections.md) | Especificação de cada seção da página |
| [`docs/behaviors.md`](docs/behaviors.md) | Interações, fluxos e lógica client-side |
| [`docs/design-system.md`](docs/design-system.md) | Tokens de design: cores, tipografia, espaçamento, animações |
| [`docs/seo.md`](docs/seo.md) | Estratégia de SEO, metadata e structured data |
| [`docs/project-structure.md`](docs/project-structure.md) | Árvore de arquivos e decisões de arquitetura |
| [`docs/content-guide.md`](docs/content-guide.md) | Guia de conteúdo para a profissional |

---

## Deploy

**Vercel** (recomendado — zero configuração para Next.js):

1. Push para o repositório GitHub
2. Importe o projeto em [vercel.com](https://vercel.com)
3. Adicione as variáveis de ambiente no painel da Vercel
4. Configure o domínio customizado
5. Envie o sitemap ao Google Search Console após o primeiro deploy

---

## Personalização

Antes do primeiro deploy, a profissional deve preencher os dados reais seguindo o [`docs/content-guide.md`](docs/content-guide.md). Os principais pontos são:

- Número do WhatsApp (`NEXT_PUBLIC_WA_NUMBER`)
- Nome, CRN e bio (`components/About/`)
- Pacotes e preços (`lib/packages.js`)
- Depoimentos reais (`lib/testimonials.js`)
- Foto profissional e foto do consultório (`public/`)
- Domínio final para metadata e sitemap
