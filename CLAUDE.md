@AGENTS.md

---

# Contexto do Projeto

Site profissional para uma nutricionista. Não é só landing page — apresenta a profissional, seus serviços e pacotes, e converte visitantes em pacientes via WhatsApp.

**Público-alvo:** seguidores do Instagram da profissional. A maioria acessa pelo celular diretamente do link na bio ou Stories. **Mobile é prioridade absoluta — não é detalhe.**

---

# Stack

- **Framework:** Next.js, App Router, JavaScript (sem TypeScript)
- **Estrutura:** `src/` — todo código vive em `src/app/`, `src/components/`, `src/lib/`
- **Alias:** `@/` → `src/` (jsconfig.json) — usar sempre, nunca caminhos relativos entre módulos
- **Estilos:** CSS Modules + CSS Custom Properties (sem Tailwind, sem styled-components)
- **Fontes:** `next/font` — Playfair Display (headings) + Inter (body)
- **Imagens:** `next/image` sempre (WebP automático, lazy load, evita CLS)
- **React Compiler:** ativo (`reactCompiler: true`) — sem `useMemo`/`useCallback` manual
- **Deploy:** Vercel

---

# Regras de Arquitetura

## Server vs Client Components

**Padrão é Server Component.** Usar `'use client'` SOMENTE quando houver:
- `useState` ou `useReducer`
- `useEffect` ou outros hooks de efeito
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Browser APIs (`window`, `document`, `IntersectionObserver`)

**Componentes Client atuais:**
- `Header.js` — scroll listener
- `PackageCard.js` — onClick abre LeadModal
- `LeadModal.js` — form state + focus trap + Escape
- `FAQ.js` — accordion state
- `StickyWhatsApp.js` — IntersectionObserver

## CSS Modules

- Cada componente tem seu próprio `.module.css`
- Nenhuma cor, fonte ou espaçamento definido inline — sempre via variável CSS
- Tokens em `src/app/globals.css` (ver seção Design Tokens abaixo)
- **Mobile-first:** estilos base para 320px → `@media (min-width: 768px)` → `@media (min-width: 1024px)`

## Dados Estáticos

Sem banco de dados. Conteúdo em arrays JS em `src/lib/`:
- `src/lib/whatsapp.js` — pacotes, objetivos, função buildWhatsAppUrl()
- `src/lib/testimonials.js` — depoimentos

---

# Fluxo Principal de Conversão

```
PackageCard → "Quero este pacote"
    ↓
LeadModal abre (com nome do pacote no título)
    ↓
Usuário preenche: Nome (text) + Objetivo (select)
    ↓
"Enviar pelo WhatsApp" → buildWhatsAppUrl({ packageId, name, objective })
    ↓
window.open(url, '_blank') → WhatsApp Web ou app
```

Mensagem gerada:
```
Olá! Meu nome é {nome} e vim através do site.
Tenho interesse no {pacote}.
Meu principal objetivo é: {objetivo}.
Poderia me passar mais informações?
```

---

# Design Tokens (src/app/globals.css)

```css
/* Cores */
--color-primary: #2E7D32        /* verde principal */
--color-accent: #F9A825         /* dourado — botões CTA */
--color-bg: #FAFAF7             /* fundo da página */
--color-surface: #FFFFFF        /* cards, modal */
--color-text: #1A1A1A
--color-text-muted: #5A5A5A

/* Espaçamento */
--spacing-section: clamp(3rem, 8vw, 6rem)
--container-max: 1200px
--container-padding: clamp(1rem, 5vw, 2rem)
--gap-cards: clamp(1rem, 3vw, 1.5rem)

/* Tipografia */
--font-heading: 'Playfair Display', serif
--font-body: 'Inter', sans-serif

/* Bordas e sombras */
--radius-card: 12px
--shadow-card: 0 4px 24px rgba(0,0,0,0.08)
--shadow-modal: 0 24px 64px rgba(0,0,0,0.18)

/* Transições */
--transition-fast: 150ms ease
--transition-base: 250ms ease
--transition-slow: 350ms ease
```

---

# Regras Mobile-First

1. **Touch targets:** mínimo 44×44px em todos os botões e links
2. **Inputs:** `font-size: 16px` obrigatório para evitar zoom automático no iOS
3. **Imagens:** sempre `sizes` prop no `next/image` refletindo o tamanho real em mobile
4. **Hero:** foto e texto empilhados em mobile (`flex-direction: column`), lado a lado no desktop
5. **Cards de pacote:** coluna única em mobile, grid em desktop
6. **LeadModal:** `width: 90vw` em mobile, largura fixa (`max-width: 480px`) em desktop
7. **StickyWhatsApp:** visível apenas em `< 768px`

---

# Variáveis de Ambiente

```env
NEXT_PUBLIC_WA_NUMBER=55DDXXXXXXXXX   # somente dígitos, com DDI
NEXT_PUBLIC_SITE_URL=https://dominio.com.br
```

---

# Documentação Detalhada

Antes de implementar qualquer seção ou comportamento, ler:

| Dúvida | Documento |
|--------|-----------|
| Especificação de seções | `docs/sections.md` |
| Interações e fluxos | `docs/behaviors.md` |
| Tokens de design | `docs/design-system.md` |
| SEO e metadata | `docs/seo.md` |
| Estrutura de arquivos | `docs/project-structure.md` |
| Conteúdo a preencher | `docs/content-guide.md` |

---

# Comandos Disponíveis

- `/new-component` — scaffolda novo componente de seção com estrutura padrão
- `/mobile-review` — revisa componente para qualidade mobile-first
- `/update-content` — guia para atualizar pacotes, depoimentos, FAQ e textos

---

# O que NÃO fazer

- Não usar TypeScript — projeto é JavaScript puro
- Não usar Tailwind ou outra biblioteca CSS
- Não criar rotas de API — não há backend, tudo é estático
- Não usar `'use client'` sem necessidade — Server Components por padrão
- Não definir cores ou espaçamentos inline — sempre via CSS Custom Properties
- Não instalar bibliotecas de UI (Material, Chakra, shadcn) — CSS Modules puro
- Não usar bibliotecas de carrossel — carrossel é CSS puro (scroll-snap)
- Não adicionar animações complexas sem testar `prefers-reduced-motion`
