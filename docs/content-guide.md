# Guia de Conteúdo

> Este guia lista todas as informações que a profissional precisa fornecer antes do site ir ao ar. Os itens marcados com ⚠️ bloqueiam o funcionamento — não é possível lançar sem eles.

---

## Dados da Profissional

| Campo | Exemplo | Onde usar |
|-------|---------|-----------|
| ⚠️ Nome completo | Dra. Ana Paula Ferreira | Toda a página |
| ⚠️ CRN | CRN-3 12345/P | Header, Footer, About, JSON-LD |
| ⚠️ WhatsApp | (11) 99999-9999 | `NEXT_PUBLIC_WA_NUMBER=5511999999999` |
| ⚠️ Cidade/Estado | São Paulo – SP | Metadata, SEO, JSON-LD |
| Endereço do consultório | Rua das Flores, 123 – Jardins, SP | Footer, JSON-LD (opcional se só online) |
| Instagram | @nomedaprofissional | Footer, About |
| TikTok | @nomedaprofissional | Footer (opcional) |
| E-mail | contato@nomedaprofissional.com.br | Footer (opcional) |

---

## Textos da Página

### Hero

| Elemento | Instrução |
|----------|-----------|
| Headline | Frase curta e impactante. Ex: _"Transforme sua relação com a comida"_ ou _"Nutrição que cabe na sua rotina"_ |
| Subheadline | Especialidade + diferencial + cidade. Ex: _"Nutricionista clínica e esportiva em São Paulo. Plano alimentar personalizado para o seu estilo de vida."_ |
| Badge anos de experiência | Ex: "8 anos de experiência" |
| Badge pacientes atendidos | Ex: "+500 pacientes atendidos" |

### Sobre a Profissional

| Elemento | Instrução |
|----------|-----------|
| Mini bio | 3 a 5 linhas. Formação, pós-graduação, filosofia de atendimento. Tom pessoal e acolhedor. |
| Especialidades | Marcar as que se aplicam: Emagrecimento · Nutrição Esportiva · Nutrição Clínica · Reeducação Alimentar · Gestação · Materno-Infantil · Outra |
| Atendimento | Presencial · Online · Ambos |

### Como Funciona

As 3 etapas são fixas — só o texto pode ser ajustado:

1. **Agendamento** — ex: _"Escolha seu pacote e nos chame no WhatsApp. Marcamos sua consulta em menos de 24h."_
2. **Consulta** — ex: _"Avaliação completa: anamnese alimentar, objetivos e estilo de vida. Presencial ou online."_
3. **Acompanhamento** — ex: _"Você recebe seu plano alimentar personalizado e suporte contínuo para manter os resultados."_

---

## Pacotes e Preços

Preencha as informações dos 3 pacotes. Se tiver menos de 3, informe para ajustar o layout.

### Pacote 1 — Avulso

| Campo | Valor |
|-------|-------|
| Nome | __________________ |
| Preço | R$ __________ |
| O que inclui | (liste cada item, um por linha) |
| É o mais popular? | Sim / Não |

### Pacote 2 — Mensal (recomendado destacar este)

| Campo | Valor |
|-------|-------|
| Nome | __________________ |
| Preço | R$ __________ |
| O que inclui | |
| É o mais popular? | Sim / Não |

### Pacote 3 — Trimestral

| Campo | Valor |
|-------|-------|
| Nome | __________________ |
| Preço | R$ __________ |
| O que inclui | |
| É o mais popular? | Sim / Não |

> Os nomes dos pacotes aparecem também na mensagem enviada ao WhatsApp — use nomes que façam sentido na conversa.

---

## Depoimentos

Forneça 3 a 5 depoimentos reais de pacientes (com autorização). Para cada um:

| Campo | Instrução |
|-------|-----------|
| Foto | Foto do paciente (opcional — pode usar avatar genérico) |
| Nome | Nome ou primeiro nome |
| Resultado | Uma linha de destaque. Ex: _"Perdi 12kg em 4 meses"_ |
| Texto | 2 a 4 frases com a experiência real |

---

## FAQ

Responda às perguntas abaixo. Adicione outras perguntas frequentes que recebe no WhatsApp.

1. As consultas são presenciais ou online?
2. Em quanto tempo vejo resultados?
3. O plano alimentar é personalizado para mim?
4. Atende por convênio?
5. Como funciona o acompanhamento entre consultas?
6. Qual a diferença entre os pacotes?
7. _(adicionar)_

---

## Imagens

| Imagem | Especificações | Descrição |
|--------|---------------|-----------|
| ⚠️ `foto-profissional.jpg` | Mín. 800×800px, formato quadrado ou 4:5 | Foto da profissional — fundo neutro, boa iluminação, tom de confiança |
| `foto-consultorio.jpg` | Mín. 1200×675px, 16:9 | Foto do consultório ou ambiente de trabalho |
| ⚠️ `og-image.jpg` | Exatamente **1200×630px** | Imagem exibida ao compartilhar o link no WhatsApp, Instagram, etc. — nome + foto profissional |

> Use formato JPG. As imagens são otimizadas automaticamente pelo Next.js para WebP.

---

## Informações para SEO e Rodapé

| Campo | Valor |
|-------|-------|
| ⚠️ Domínio do site | https://__________________.com.br |
| Horário de atendimento | Ex: Segunda a Sexta, 8h às 18h |
| Código Google Search Console | _(após verificar o domínio)_ |
| Google Meu Negócio | Criar/atualizar com o endereço e número do site |

---

## Checklist de Entrega

Antes de solicitar o go-live, confirme:

- [ ] Número do WhatsApp informado e testado
- [ ] Foto profissional entregue (mín. 800×800px)
- [ ] OG Image entregue (1200×630px)
- [ ] Pacotes e preços preenchidos
- [ ] Bio e especialidades revisadas
- [ ] Depoimentos reais fornecidos (mín. 3)
- [ ] FAQ respondido
- [ ] Domínio apontado para a Vercel
- [ ] Google Meu Negócio atualizado com o link do site
