# Estrutura do Projeto

```
landpage-nutricionista/
│
├── app/
│   ├── layout.js             # Root layout: metadata, JSON-LD, fontes, globals
│   ├── page.js               # Página principal — compõe todas as seções
│   ├── globals.css           # Reset, CSS Custom Properties, estilos globais
│   ├── favicon.ico
│   └── sitemap.js            # Geração automática do sitemap (/sitemap.xml)
│
├── components/
│   ├── Header/
│   │   ├── Header.js         # [Client] Scroll listener, menu mobile
│   │   └── Header.module.css
│   ├── Hero/
│   │   ├── Hero.js           # [Server] Headline, CTA, badges de credibilidade
│   │   └── Hero.module.css
│   ├── About/
│   │   ├── About.js          # [Server] Bio, foto, especialidades
│   │   └── About.module.css
│   ├── HowItWorks/
│   │   ├── HowItWorks.js     # [Server] 3 etapas visuais
│   │   └── HowItWorks.module.css
│   ├── Packages/
│   │   ├── Packages.js       # [Server] Grid de cards de pacote
│   │   ├── PackageCard.js    # [Client] onClick → abre LeadModal
│   │   └── Packages.module.css
│   ├── LeadModal/
│   │   ├── LeadModal.js      # [Client] Modal com formulário nome + objetivo
│   │   └── LeadModal.module.css
│   ├── Testimonials/
│   │   ├── Testimonials.js   # [Server] Grid/carrossel de depoimentos
│   │   └── Testimonials.module.css
│   ├── FAQ/
│   │   ├── FAQ.js            # [Client] Accordion com estado
│   │   └── FAQ.module.css
│   ├── FinalCTA/
│   │   ├── FinalCTA.js       # [Server] Seção de conversão final
│   │   └── FinalCTA.module.css
│   ├── Footer/
│   │   ├── Footer.js         # [Server] Contato, redes sociais, copyright
│   │   └── Footer.module.css
│   └── StickyWhatsApp/
│       ├── StickyWhatsApp.js      # [Client] Barra sticky mobile (IntersectionObserver)
│       └── StickyWhatsApp.module.css
│
├── lib/
│   ├── whatsapp.js           # buildWhatsAppUrl(), PACKAGES, OBJECTIVES, número
│   └── testimonials.js       # Array de depoimentos (dados estáticos)
│
├── public/
│   ├── foto-profissional.jpg  # Hero — proporção 1:1 ou 4:5, mín. 800px
│   ├── foto-consultorio.jpg   # Seção Sobre — proporção 16:9, mín. 1200px
│   ├── og-image.jpg           # Open Graph — exatamente 1200x630px
│   └── robots.txt
│
├── docs/
│   ├── sections.md            # Especificação de cada seção da página
│   ├── behaviors.md           # Fluxos de interação e lógica client-side
│   ├── design-system.md       # Tokens de design: cores, tipografia, animações
│   ├── seo.md                 # Estratégia de SEO e structured data
│   ├── project-structure.md   # Este arquivo
│   └── content-guide.md       # Guia para a profissional preencher os dados
│
├── .env.local                 # Variáveis de ambiente (não versionado)
├── .env.example               # Template das variáveis (versionado)
├── next.config.mjs
├── jsconfig.json
└── package.json
```

---

## Decisões de Arquitetura

### Server vs Client Components

| Componente | Tipo | Motivo |
|-----------|------|--------|
| `layout.js` | Server | Metadata, JSON-LD |
| `page.js` | Server | Composição estática das seções |
| `Hero.js` | Server | Conteúdo estático — sem interação |
| `About.js` | Server | Conteúdo estático |
| `HowItWorks.js` | Server | Conteúdo estático |
| `Header.js` | **Client** | Scroll listener, toggle menu mobile |
| `Packages.js` | Server | Container dos cards |
| `PackageCard.js` | **Client** | `onClick` abre `LeadModal` |
| `LeadModal.js` | **Client** | `useState`, `useEffect` (focus trap, Escape) |
| `FAQ.js` | **Client** | Accordion com `useState` |
| `Testimonials.js` | Server | Carrossel via CSS puro |
| `FinalCTA.js` | Server | Conteúdo estático |
| `StickyWhatsApp.js` | **Client** | `IntersectionObserver` |

> Regra: `'use client'` apenas quando há `useState`, `useEffect` ou event handlers. Maximizar Server Components para SEO e performance.

### CSS Modules

- Cada componente tem seu próprio `.module.css` — sem vazamento de estilos
- Tokens de design centralizados em `globals.css` via CSS Custom Properties
- Nenhuma biblioteca de estilo externa — CSS puro com custom properties
- Mobile-first: estilos base para mobile → `@media (min-width: 768px)` → `@media (min-width: 1024px)`

### Dados Estáticos em `lib/`

Pacotes, depoimentos e objetivos são arrays JavaScript em `lib/`. Não há banco de dados — o conteúdo é estático e compilado no build. Para alterar pacotes ou preços, editar `lib/whatsapp.js` e fazer redeploy.

### Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|------------|-----------|
| `NEXT_PUBLIC_WA_NUMBER` | Sim | Número do WhatsApp (somente dígitos, com DDI) |
| `NEXT_PUBLIC_SITE_URL` | Sim | URL do site em produção (sem barra final) |

---

## Comandos

```bash
npm run dev      # Desenvolvimento em localhost:3000
npm run build    # Build de produção
npm run start    # Servidor de produção (requer build prévio)
npm run lint     # ESLint
```

---

## Deploy

**Vercel** (zero config para Next.js):

1. Push para GitHub
2. Importar projeto em [vercel.com/new](https://vercel.com/new)
3. Adicionar variáveis de ambiente (`NEXT_PUBLIC_WA_NUMBER`, `NEXT_PUBLIC_SITE_URL`) no painel
4. Configurar domínio customizado em **Settings → Domains**
5. Após o primeiro deploy em produção, enviar o sitemap ao Google Search Console:
   `https://seudominio.com.br/sitemap.xml`
