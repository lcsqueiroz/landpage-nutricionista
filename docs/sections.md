# Seções da Landing Page — Nutricionista

> Mobile-first. Cada seção é projetada para guiar o visitante do interesse ao agendamento.

---

## 1. Hero

**Objetivo:** Primeira impressão, comunicar valor imediato e direcionar ao agendamento.

**Elementos:**
- Foto da profissional (otimizada com `next/image`, formato WebP)
- Headline principal — ex: _"Transforme sua relação com a comida"_
- Subheadline — tagline com especialidade e diferencial
- Botão CTA primário: **"Agendar consulta"** → abre WhatsApp com mensagem padrão
- Indicadores de credibilidade: CRN, anos de experiência, número de pacientes atendidos (badges pequenos)

**Comportamento mobile:**
- Foto acima do texto em mobile, lado a lado em desktop
- CTA fixo no rodapé do viewport em mobile (sticky bottom bar) para sempre manter o agendamento acessível

---

## 2. Sobre a Profissional

**Objetivo:** Humanizar e construir confiança.

**Elementos:**
- Foto secundária (ambiente consultório ou lifestyle)
- Nome completo + CRN
- Mini bio: formação, especialidades, filosofia de atendimento
- Lista de especialidades/áreas de atuação (ícones + texto):
  - Emagrecimento saudável
  - Nutrição esportiva
  - Nutrição clínica
  - Reeducação alimentar
  - Nutrição materno-infantil _(ajustar conforme a profissional)_
- Link para Instagram ou outra rede social

---

## 3. Como Funciona

**Objetivo:** Reduzir fricção — mostrar que o processo é simples.

**Elementos:**
- 3 etapas visuais (ícone + número + texto):
  1. **Agendamento** — escolha o pacote e fale pelo WhatsApp
  2. **Consulta** — avaliação completa presencial ou online
  3. **Acompanhamento** — plano alimentar personalizado + suporte contínuo
- Formato horizontal em desktop, vertical (stepper) em mobile

---

## 4. Pacotes e Preços

**Objetivo:** CTA principal — capturar nome e objetivo do visitante antes de abrir o WhatsApp.

**Elementos:**
- 3 cards de pacote (ex: Avulso, Mensal, Trimestral)
- Cada card contém:
  - Nome do pacote
  - Preço (ex: R$ 150 / consulta ou R$ 450 / mês)
  - Lista de itens incluídos (checkmarks)
  - Badge "Mais popular" no pacote recomendado
  - Botão CTA: **"Quero este pacote"** → abre `LeadModal`

**Fluxo ao clicar em "Quero este pacote":**
1. `LeadModal` abre com o nome do pacote já exibido no título
2. Visitante preenche: **Nome** e **Objetivo principal** (select)
3. Clica em **"Enviar pelo WhatsApp"**
4. WhatsApp abre com mensagem personalizada incluindo nome, objetivo e pacote

**Estrutura sugerida dos pacotes:**

| Pacote | Conteúdo sugerido |
|--------|-------------------|
| Avulso | 1 consulta + plano alimentar básico |
| Mensal | 2 consultas + plano + retorno por app/wpp |
| Trimestral | Consultas mensais + plano + bioimpedância + acompanhamento semanal |

> ⚠️ Nomes, preços e conteúdo dos pacotes devem ser preenchidos pela profissional — ver [`docs/content-guide.md`](content-guide.md).

---

## 5. Depoimentos

**Objetivo:** Prova social — reforçar confiança antes da decisão de compra.

**Elementos:**
- 3 a 5 cards de depoimento
- Cada card: foto (avatar), nome, resultado alcançado, texto do depoimento
- Carrossel em mobile (scroll horizontal sem controles visíveis, swipeable)
- Grid 3 colunas em desktop

---

## 6. FAQ

**Objetivo:** Eliminar objeções comuns antes do clique no CTA.

**Elementos:**
- Accordion (expand/collapse) com 5 a 7 perguntas
- Exemplos de perguntas:
  - As consultas são presenciais ou online?
  - Em quanto tempo vejo resultados?
  - O plano alimentar é personalizado?
  - Atende por convênio?
  - Como funciona o acompanhamento entre consultas?
  - Qual a diferença entre os pacotes?

---

## 7. CTA Final

**Objetivo:** Última chance de conversão antes do footer.

**Elementos:**
- Headline de urgência/benefício: ex: _"Comece hoje sua jornada para uma vida mais saudável"_
- Botão CTA grande: **"Agendar agora pelo WhatsApp"**
- Fundo com cor de destaque (contraste com restante da página)

---

## 8. Footer

**Objetivo:** Credibilidade e informações de contato.

**Elementos:**
- Nome e CRN da profissional
- Endereço do consultório (se presencial)
- Links sociais: Instagram, TikTok (se aplicável)
- Link de contato via WhatsApp
- Copyright + ano
- Política de privacidade (link — necessário pela LGPD)
