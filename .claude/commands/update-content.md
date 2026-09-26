---
description: Atualiza conteúdo do site (textos, serviços, etapas, formação, posts) seguindo o content-guide
---

Atualize o conteúdo do site conforme solicitado. O mapa completo de onde fica cada conteúdo está em `docs/content-guide.md` — leia antes de editar.

## Regras

1. **Tom:** primeira pessoa (voz da Larissa), linguagem simples; saúde através da comida; emagrecimento como consequência, nunca promessa de resultado.
2. **Ética (CFN):** sem depoimentos ou dados de pacientes, sem "antes e depois", sem prometer resultados.
3. **Atendimento online:** não citar região.
4. **Constantes** (nome, CRN, Instagram, URL) só em `src/lib/site.js`.
5. **Serviços:** o título vai na mensagem do WhatsApp (`buildServiceWhatsAppUrl`) — confira se a frase gerada continua natural.
6. **Posts do Instagram:** capa em `src/assets/instagram/` + entrada em `src/lib/instagram.js` com o link do post.
7. **Política de privacidade:** ao mudar o que o site coleta, atualize o texto e `UPDATED_AT`.
8. Ao terminar, rode `npm run check`.
