# Débitos do projeto

Pendências conhecidas. Atualizar conforme forem resolvidas.

## Bloqueiam a publicação

- [ ] **`NEXT_PUBLIC_WA_NUMBER` na Vercel** — sem ela os botões ficam sem número (o build avisa no log). Conferir também `NEXT_PUBLIC_SITE_URL`.

## Confirmar com a cliente

- [ ] **Código de Ética do CFN 2026 (Resolução 856)** — confirmar com o CRN-3 antes de publicar: (1) se a foto do Hero no desktop, redesenhada por IA, é permitida (o código veda IA para criar/manipular imagens que simulem pessoas reais); alternativa pronta é voltar à `larissa-03.jpg`; (2) se é preciso declarar no site o apoio de IA nos textos/imagens (sugestão de linha no rodapé em `docs/content-guide.md`); (3) inscrição no e-Nutricionista, exigida para atendimento online.
- [ ] Textos novos (2026-09-27): validar com a Larissa o 2º parágrafo do Sobre (leitura da pesquisa CNPq) e a frase do Instagram ("dúvidas que aparecem nas consultas" só vale se ela já atende).

- [ ] Aprovação da logo vetorizada nas cores do site (original em `docs/brand/`); se existir, pedir o arquivo vetorial (AI/SVG/PDF).
- [ ] Etapas de "Como funciona" (`src/content/journey.js`): questionário prévio, retornos e suporte entre consultas.
- [ ] Leitura final de todos os textos.
- [ ] Capas originais dos posts do Instagram (1080×1350) para `src/assets/images/instagram/`.
- [ ] Revisão jurídica da política de privacidade, se desejado.
- [ ] Nova paleta 60-30-10 (branco + verde profundo + coral da melancia, no lugar de porcelana + champanhe) — aprovar com a cliente.
- [ ] Nova tipografia (Fraunces + Roboto, branch `redesign/visual-real`) — aprovar; trocar é em `layout.js` e `--font-heading`/`--font-body`.
- [ ] Fotos de comida do Unsplash (`src/assets/images/food/`) — trocar por fotos próprias da Larissa quando houver orçamento (lista em `docs/content-guide.md`); por enquanto ficam.
- [ ] "Nutricionista" da logo em bronze escuro (`--color-logo-role`) para passar AAA; o champanhe original é isento por ser logotipo, se a cliente preferir.

## Técnico

- [ ] CSP usa `'unsafe-inline'` em scripts (exigido pelo Next sem nonce); endurecer com nonce via middleware se o site ganhar conteúdo dinâmico.
- [ ] Verificador de contraste AA/AAA (`scripts/qa/contrast-pixels.mjs` e `contrast-axe.mjs`) como `npm run test:contrast` — aguardando decisão (precisa de puppeteer-core, axe-core e pngjs como devDependencies).
- [ ] Lighthouse mobile local fica em ~80: o custo restante é o primeiro layout (fontes) no Chrome do Windows com CPU 4x; medir no PageSpeed Insights com a URL da Vercel antes de otimizar mais.
- [ ] Lighthouse precisa ser refeito depois do redesign (Fraunces + Roboto, fotos de comida, `<picture>` no Hero): rodar num build de produção com o `next dev` parado, ou direto na URL da Vercel.
- [ ] Branch `redesign/visual-real` sem commit — commitar quando validar (o ponto de partida está no commit `5fa3a23` da `redesign/visual-premium`).

## Validação depois do deploy

- [ ] Aparelhos reais: iPhone (Safari e navegador do Instagram) e Android — rolagem, menu e header.
- [ ] Lighthouse na URL publicada.
- [ ] Pré-visualização do link no WhatsApp e no [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
- [ ] Conferir no navegador que os scripts `/_vercel/insights` e `/_vercel/speed-insights` carregam sem violar a CSP.

## Resolvidos

- [x] Ícones (favicon, icon, apple-icon) gerados do monograma com fundo transparente enviado pela cliente, 2026-09-27

- [x] Imagem de pré-visualização regenerada (2026-09-27): visual atual, slogan novo, foto original (não a de IA)
- [x] Limpeza (2026-09-27): `ServiceIcon`/campo `icon`, 23 tokens sem uso, `larissa-02.jpg`, fontes antigas do gerador OG, comentários e docs desatualizados; `.claude/SKILL.md` removido

- [x] Foto do Hero no desktop gerada por IA a partir da original: aprovada pela Larissa (rosto fiel), 2026-09-26

- [x] Logomarca oficial vetorizada (`public/logo/`), melancia com cores naturais
- [x] Favicon, `icon.png` e ícone do iPhone
- [x] Imagem de pré-visualização (JPEG 70KB, cores e cantos atuais)
- [x] Política de privacidade (Vercel Analytics / Speed Insights)
- [x] Página 404 com a identidade do site
- [x] `priceRange` e código sem uso removidos; constantes centralizadas em `src/config/site.js`
- [x] Documentação (`CLAUDE.md`, `README.md`, `docs/`, `.claude/commands/`) atualizada
- [x] Sitemap com fallback de URL e data de build
- [x] Next 16.2.7 → 16.3.6 (vulnerabilidades críticas) e `npm audit` zerado
- [x] Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, etc.)
- [x] Lighthouse (build de produção): foto do hero pinta no primeiro frame (cortina em transform), WebGL adiado para a primeira interação ou 6s, contraste e nome acessível da logo corrigidos
- [x] Contraste WCAG AAA em todas as seções (mobile e desktop, 3 páginas): tokens de texto escurecidos, `--color-on-dark-muted` 72%, esmaecido do hero e véu do header reforçados
- [x] Hierarquia de peso de fonte por tokens (`--weight-*`), sem `font-weight` numérico nos componentes
- [x] Efeito de ondas do cursor sobre a foto do hero removido (WebGL mantém respiração, ondulação do scroll e grão)
