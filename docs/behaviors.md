# Comportamentos e Interações

---

## Fluxo Principal — Seleção de Pacote e Envio para WhatsApp

Este é o fluxo de conversão central do site. O objetivo é coletar nome e objetivo do visitante antes de abrir o WhatsApp, tornando a mensagem personalizada e aumentando a taxa de resposta da profissional.

### Passo a passo

```
Visitante clica em "Quero este pacote"
         ↓
Modal abre (LeadModal)
         ↓
Visitante preenche: Nome + Objetivo principal
         ↓
Clica em "Enviar pelo WhatsApp"
         ↓
Validação client-side (campos obrigatórios)
         ↓
buildWhatsAppUrl() gera a URL com mensagem personalizada
         ↓
window.open(url, '_blank') → abre WhatsApp Web ou app
```

### Componente LeadModal

Exibido como modal centralizado com overlay escuro. Fecha ao clicar no overlay, no botão "×", ou ao pressionar `Escape`.

**Campos do formulário:**

| Campo | Tipo | Obrigatório | Opções |
|-------|------|-------------|--------|
| Nome | `text` | Sim | — |
| Objetivo principal | `select` | Sim | Emagrecer com saúde · Ganhar massa muscular · Melhorar a alimentação · Nutrição esportiva · Nutrição na gestação · Outro |

**Comportamento de validação:**
- Campos vazios exibem mensagem de erro inline (sem `alert`)
- Botão de submit fica desabilitado enquanto os campos estão inválidos
- Foco é movido automaticamente para o primeiro campo com erro

### Mensagem gerada no WhatsApp

```
Olá! Meu nome é {nome} e vim através do site.
Tenho interesse no {pacote}.
Meu principal objetivo é: {objetivo}.
Poderia me passar mais informações?
```

### Implementação — `lib/whatsapp.js`

```js
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER;

export const PACKAGES = [
  { id: 'avulso',      name: 'Consulta Avulsa'    },
  { id: 'mensal',      name: 'Pacote Mensal'       },
  { id: 'trimestral',  name: 'Pacote Trimestral'   },
];

export const OBJECTIVES = [
  'Emagrecer com saúde',
  'Ganhar massa muscular',
  'Melhorar a alimentação',
  'Nutrição esportiva',
  'Nutrição na gestação',
  'Outro',
];

/**
 * Gera a URL do WhatsApp com mensagem personalizada.
 * @param {{ packageId: string, name: string, objective: string }} lead
 * @returns {string}
 */
export function buildWhatsAppUrl({ packageId, name, objective }) {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  const message = `Olá! Meu nome é ${name} e vim através do site.\nTenho interesse no ${pkg.name}.\nMeu principal objetivo é: ${objective}.\nPoderia me passar mais informações?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

---

## CTA Sticky Mobile

Uma barra fixa no rodapé do viewport aparece apenas em telas `< 768px`. Mantém o caminho de conversão sempre acessível sem precisar rolar até os pacotes.

**Comportamento:**
- Visível por padrão ao entrar na página
- Some quando a seção `#pacotes` entra no viewport (threshold `0.1`)
- Reaparece ao sair da seção `#pacotes`
- Ao clicar, abre o `LeadModal` sem pacote pré-selecionado (usuário escolhe)

```js
useEffect(() => {
  const section = document.getElementById('pacotes');
  const observer = new IntersectionObserver(
    ([entry]) => setShowStickyBar(!entry.isIntersecting),
    { threshold: 0.1 }
  );
  if (section) observer.observe(section);
  return () => observer.disconnect();
}, []);
```

---

## Header Scroll-Aware

O header começa transparente sobre o Hero (a foto de fundo fica visível). Ao rolar mais de `80px`, recebe background sólido com sombra leve para garantir legibilidade.

```js
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 80);
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

```css
.header {
  position: fixed;
  top: 0;
  width: 100%;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.header.scrolled {
  background: var(--color-bg);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}
```

---

## Navegação Suave (Smooth Scroll)

Links de âncora no header navegam suavemente até a seção correspondente com offset para o header fixo.

```css
/* globals.css */
html {
  scroll-behavior: smooth;
}

:target {
  scroll-margin-top: 80px;
}
```

---

## Accordion FAQ

- Apenas um item aberto por vez — abrir um fecha o anterior
- Animação de altura via CSS `transition` + `max-height`
- Estado gerenciado localmente em `FAQ.js`

```js
const [openIndex, setOpenIndex] = useState(null);

const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
```

```css
.answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}

.answer.open {
  max-height: 500px;
}
```

---

## Carrossel de Depoimentos (Mobile)

Scroll horizontal nativo — sem biblioteca externa. Em desktop exibe grid de 3 colunas.

```css
.track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  gap: 1rem;
}

.card {
  scroll-snap-align: start;
  flex: 0 0 85%;
}
```

---

## Analytics (Preparação)

Estrutura pronta para receber Google Analytics 4 ou Meta Pixel via `next/script`.

**Eventos recomendados:**

| Evento | Disparo |
|--------|---------|
| `package_cta_click` | Clique em "Quero este pacote" (qualquer card) |
| `lead_modal_open` | Modal LeadModal aberto |
| `lead_modal_submit` | Formulário do modal enviado com sucesso |
| `whatsapp_redirect` | `window.open()` para WhatsApp executado |

---

## Acessibilidade

- Todos os botões têm `aria-label` descritivo
- Modal com `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Foco aprisionado dentro do modal enquanto aberto (`focus trap`)
- Fechamento com tecla `Escape`
- Imagens com `alt` text significativo
- Contraste mínimo WCAG AA (4.5:1 para texto normal)
- Foco visível em todos os elementos interativos
