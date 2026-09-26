# Débitos do projeto

Pendências conhecidas. Atualizar conforme forem resolvidas.

## Bloqueiam a publicação

- [ ] **`NEXT_PUBLIC_WA_NUMBER` na Vercel** — sem ela os botões ficam sem número (o build avisa no log). Conferir também `NEXT_PUBLIC_SITE_URL`.

## Confirmar com a cliente

- [ ] Aprovação da logo vetorizada nas cores do site (original em `docs/brand/`); se existir, pedir o arquivo vetorial (AI/SVG/PDF).
- [ ] Etapas de "Como funciona" (`src/lib/journey.js`): questionário prévio, retornos e suporte entre consultas.
- [ ] Leitura final de todos os textos.
- [ ] Capas originais dos posts do Instagram (1080×1350) para `src/assets/instagram/`.
- [ ] Revisão jurídica da política de privacidade, se desejado.
- [ ] Fonte Roboto no texto (trocada da Inter em teste) — confirmar; se voltar, são 2 linhas (`layout.js` e `--font-body`).
- [ ] "Nutricionista" da logo em bronze escuro (`--color-accent-text`) para passar AAA; o champanhe original é isento por ser logotipo, se a cliente preferir.

## Técnico

- [ ] `.claude/SKILL.md` (design system genérico do TypeUI) contradiz o design do projeto (outra fonte, cantos 6–12px, `#18181b`) e pode induzir agentes de IA a desfazer o visual — remover ou substituir.
- [ ] CSP usa `'unsafe-inline'` em scripts (exigido pelo Next sem nonce); endurecer com nonce via middleware se o site ganhar conteúdo dinâmico.
- [ ] Verificador de contraste AA/AAA (axe + amostragem de pixels, hoje só no scratchpad) como `npm run test:contrast` — oferecido, aguardando decisão (precisa de puppeteer-core, axe-core e pngjs como devDependencies).
- [ ] Lighthouse mobile local fica em ~80: o custo restante é o primeiro layout (fontes) no Chrome do Windows com CPU 4x; medir no PageSpeed Insights com a URL da Vercel antes de otimizar mais.
- [ ] Favicon/ícone do iPhone usam a melancia original (polpa rosa); gerar a partir das camadas vetorizadas se quiser a mesma cor da logo.

## Validação depois do deploy

- [ ] Aparelhos reais: iPhone (Safari e navegador do Instagram) e Android — WebGL, rolagem, menu e header.
- [ ] Lighthouse na URL publicada.
- [ ] Pré-visualização do link no WhatsApp e no [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
- [ ] Conferir no navegador que os scripts `/_vercel/insights` e `/_vercel/speed-insights` carregam sem violar a CSP.

## Resolvidos

- [x] Logomarca oficial vetorizada (`public/logo/`), melancia com cores naturais
- [x] Favicon, `icon.png` e ícone do iPhone
- [x] Imagem de pré-visualização (JPEG 70KB, cores e cantos atuais)
- [x] Política de privacidade (Vercel Analytics / Speed Insights)
- [x] Página 404 com a identidade do site
- [x] `priceRange` e código sem uso removidos; constantes centralizadas em `src/lib/site.js`
- [x] Documentação (`CLAUDE.md`, `README.md`, `docs/`, `.claude/commands/`) atualizada
- [x] Sitemap com fallback de URL e data de build
- [x] Next 16.2.7 → 16.3.6 (vulnerabilidades críticas) e `npm audit` zerado
- [x] Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, etc.)
- [x] Lighthouse (build de produção): foto do hero pinta no primeiro frame (cortina em transform), WebGL adiado para a primeira interação ou 6s, contraste e nome acessível da logo corrigidos
- [x] Contraste WCAG AAA em todas as seções (mobile e desktop, 3 páginas): tokens de texto escurecidos, `--color-on-dark-muted` 72%, esmaecido do hero e véu do header reforçados
- [x] Hierarquia de peso de fonte por tokens (`--weight-*`), sem `font-weight` numérico nos componentes
- [x] Efeito de ondas do cursor sobre a foto do hero removido (WebGL mantém respiração, ondulação do scroll e grão)
