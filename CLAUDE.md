@AGENTS.md

---

# Contexto do projeto

Site profissional da nutricionista **Larissa Genari** (CRN-3 94745). Apresenta a profissional, a formação, os serviços e o acompanhamento, e converte visitantes em pacientes via **WhatsApp**. Atendimento **online** (não citar região).

**Público:** seguidores do Instagram, que chegam pelo link da bio. **Mobile é prioridade absoluta.**

**Posicionamento dos textos:** primeira pessoa (voz da Larissa), saúde através da comida; emagrecimento é consequência, nunca promessa de resultado. Sem depoimentos de pacientes (decisão da cliente).

---

# Stack

- **Next.js 16** (App Router, Turbopack), **JavaScript** (sem TypeScript), **React Compiler** ativo (sem `useMemo`/`useCallback` manual)
- **CSS Modules + CSS Custom Properties** (sem Tailwind, sem bibliotecas de UI)
- **Fontes:** `next/font` — Cormorant Garamond (títulos) + Roboto (texto), ambas variáveis
- **Imagens:** sempre `next/image` com `sizes` real no mobile
- **Deploy:** Vercel (Web Analytics + Speed Insights)
- **Alias:** `@/` → `src/` — nunca caminhos relativos entre módulos

---

# Estrutura

Detalhes em `docs/project-structure.md`. Resumo:

- `src/app/` — layout, página, política de privacidade, 404, ícones, imagem OG, sitemap
- `src/components/<Nome>/` — um componente por pasta (`.js` + `.module.css`)
- `src/lib/` — conteúdo e dados estáticos (`site.js`, `services.js`, `journey.js`, `education.js`, `instagram.js`, `whatsapp.js`)
- `public/logo/` — logo vetorizada em camadas (máscaras SVG)
- `docs/` — documentação; `docs/brand/` — arquivos originais da marca
- `scripts/` — ferramentas (imagem OG, vetorização da logo, ícones, testes de qualidade/contraste)

**Ordem da página:** Hero → Sobre (com formação) → Serviços → Como funciona → Instagram → CTA final → Rodapé.

---

# Regras

## Server vs Client
Server Component por padrão. `'use client'` só com estado, efeitos, eventos ou APIs do navegador. Hoje são client: `Header`, `StickyWhatsApp`, `Interactions`, `HeroGL`.

## Estilo
- Toda cor, fonte, peso, espaçamento e raio vem de tokens em `src/app/globals.css` (ver `docs/design-system.md`). Nada inline além de variáveis de índice/atraso (`--i`, `--anim-delay`).
- **Mobile-first:** base para 320px → `@media (min-width: 768px)` → `@media (min-width: 1024px)`.
- **Cantos quase retos** (2–3px). Círculos só em ícones e marcadores. Arredondado demais passa ar de template.
- Toda animação respeita `prefers-reduced-motion`. Animações por scroll usam `data-anim` / `data-progress` (ver `docs/animations.md`).

## Código
- **Comentários de uma linha só**, explicando o porquê (não o quê).
- Conteúdo editável fica em `src/lib/`; constantes da profissional e links em `src/lib/site.js`.
- Links externos com `target="_blank" rel="noopener noreferrer"`.
- Touch targets ≥ 44×44px.

---

# Conversão

Todos os botões "Agendar consulta" abrem o WhatsApp com mensagem pronta (`src/lib/whatsapp.js`). Os cards de serviço enviam o nome do serviço na mensagem.

---

# Variáveis de ambiente

Ver `.env.example`. `NEXT_PUBLIC_WA_NUMBER` (só dígitos, com DDI) é obrigatória em produção.

---

# Documentação

| Assunto | Documento |
|---|---|
| Estrutura de pastas | `docs/project-structure.md` |
| Tokens e identidade visual | `docs/design-system.md` |
| Animações por scroll | `docs/animations.md` |
| Onde editar cada conteúdo | `docs/content-guide.md` |
| SEO, pré-visualização e segurança | `docs/seo.md` |
| Scripts (OG, logo, ícones, testes de contraste) | `docs/scripts.md` |
| Pendências | `docs/debitos.md` |

---

# O que NÃO fazer

- TypeScript, Tailwind, bibliotecas de UI/carrossel/animação
- Rotas de API ou backend (o site é estático)
- Cores/espaçamentos fora dos tokens
- Prometer resultados ou usar fotos de "antes e depois" (código de ética do CFN)
- Expor dados de pacientes
