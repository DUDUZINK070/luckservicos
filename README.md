# Luck Serviços

Página de vendas estática da Luck Serviços (IPTV/streaming) com catálogo de títulos, seleção interativa de planos, links de pagamento online e atendimento pelo WhatsApp.

Site no ar: https://luckservicos.vercel.app/

## Publicar na Vercel

Importe este repositório e use o nome `luckservicos`. Selecione **Other** como framework, mantenha o diretório raiz e deixe os comandos de instalação e build vazios. Os arquivos estão na raiz; não há dependências.

## Arquivos

- `index.html`: estrutura e conteúdo da página (com Open Graph e dados estruturados para Google/WhatsApp)
- `styles.css`: todo o visual da página
- `interactive.js`: seletor de planos, galerias, carrossel do catálogo e avisos
- `favicon.svg`: ícone da aba do navegador
- `hero.webp` e `plano-*.webp`: banners principal e dos planos
- `capa-*.webp`: capas do catálogo (19 títulos)
- `vercel.json`: hospedagem estática, cache das imagens e cabeçalhos de segurança

## Planos

1 mês: R$ 19,90; 2 meses: R$ 34,90; 3 meses: R$ 46,90. Valores totais por período.

**Ao trocar preço ou link de pagamento:** a referência é o array `plans` no início do `interactive.js`. Atualize também os valores iniciais escritos no `index.html` (eles aparecem antes do JavaScript carregar) e a tabela acima.

Atendimento: (24) 98841-0497.
