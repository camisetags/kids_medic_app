---
version: alpha
name: "Dayse Mary — Pediatria"
description: "Uma linha de cuidado editorial e orgânica para famílias acompanharem cada fase da criança."
colors:
  primary: "#344E41"
  sage: "#8B9D83"
  moss: "#606C38"
  background: "#E8DCC7"
  surface: "#EDE3D2"
  ink: "#293D32"
  muted: "#4D5948"
  clay: "#B08B6E"
  danger: "#9B4535"
  appBackground: "#F3F5F2"
  appSurface: "#FFFFFF"
  appLine: "#DCE2DA"
  appSelected: "#E8EEE5"
  appSubtle: "#EBEEE8"
typography:
  display:
    fontFamily: "Fraunces Variable, Georgia, serif"
  body:
    fontFamily: "Epilogue Variable, Arial, sans-serif"
rounded:
  DEFAULT: "20px"
  large: "32px"
  control: "16px"
spacing:
  section-gap: "88px"
  page-max: "1200px"
components:
  button:
    height: "48px"
  card:
    rounded: "20px"
  dialog:
    rounded: "32px"
---
# Dayse Mary — Design System

## Overview
Uma caderneta de infância ilustrada, com composição editorial de uma pequena publicação de botânica. Público: responsáveis brasileiros, sobretudo pelo celular, e demonstração comercial ao consultório. Evidência: desenho aprovado e referências do usuário. Registro híbrido: a página inicial apresenta a proposta; a área da família e a agenda privilegiam a tarefa. Locale pt-BR, datas locais e relógio do navegador. Japão não integra o escopo.

Âncora Organic na landing. A linha do cuidado é uma assinatura exclusiva da apresentação. Por decisão explícita do usuário em 21/10/2026, o app usa um registro funcional: verde da marca, fundos neutros, sans e hierarquia compacta, sem frases promocionais ou ilustrações decorativas. Não parecer painel hospitalar, brinquedo ou dashboard financeiro. A identidade é provisória e usa apenas informações profissionais recebidas, sem credenciais ou prova social inventadas.

## Colors
CSS canônico em `src/styles/tokens.css`; este documento espelha seus valores aprovados (modelo B). `colors.primary` → `--primary`, `background` → `--background`, `surface` → `--surface`, `ink` → `--ink`, `muted` → `--muted`, `sage` → `--sage`, `moss` → `--moss`, `clay` → `--clay`, `danger` → `--danger`. Todos os componentes consomem variáveis semânticas. Os tokens `colors.appBackground`, `appSurface`, `appLine`, `appSelected` e `appSubtle` mapeiam respectivamente para `--app-background`, `--app-surface`, `--app-line`, `--app-selected`, `--app-subtle`. `application.css` aplica esses tokens apenas ao app e seus diálogos, sem mudar a landing. Verde escuro sobre areia e texto escuro sobre sálvia; cor nunca é o único indicador de estado. Tema claro único; forced-colors permanece utilizável.

## Typography
Fraunces Variable para títulos da landing e logotipo (`--font-brand`). No app, Epilogue Variable em títulos, leitura e controles; h1 de 24–27 px, títulos de seção 17–20 px e texto funcional de 12–14 px. Fontes locais distribuídas pelos pacotes Fontsource com licença. Títulos têm ritmo de publicação, texto tem linha 1.65 e largura limitada. Números de datas são tabulares. Português com acentos; sem transformar rótulos normais em linguagem temática.

## Layout
Largura máxima 1200 px, margens de 6% no desktop e 20 px no celular. Hero em duas colunas, uma coluna abaixo de 760 px. Agendamento e área da família usam o mesmo AppLayout: sidebar de 232 px, substituída por navegação inferior abaixo de 760 px. A conta de exemplo informa separadamente responsável e criança em todas essas rotas. O resumo prioriza a próxima consulta, seguido de criança e anotações; não usa saudação personalizada. Rolagem pertence ao documento; nenhuma tela é artificialmente limitada à altura da janela. Reservar espaço para ações e safe-area no celular.

## Elevation & Depth
Hierarquia por superfícies tonais e bordas; sombra difusa apenas em cartões flutuantes da ilustração e no modal. Textura SVG de grão em baixa opacidade apenas na landing. O app usa fundo neutro e superfície branca, sem grão ou sombra decorativa, por decisão aprovada do usuário; essa distinção de registro tem precedência sobre as restrições da âncora Organic.

## Shapes
Na landing: cartões 20 px, grandes painéis 32 px, controles 16 px. No app: painéis e diálogos 16 px, controles 12 px. A ilustração pode usar arcos e círculos orgânicos, próprios da linguagem editorial. Não arredondar cada pequeno elemento de conteúdo.

## Components
Botões primários escuros, secundários com borda e ações destrutivas com texto e ícone próprios. Hover muda tom e deslocamento de no máximo 1 px, foco tem anel visível, seleção usa borda e ícone, indisponível usa texto e atributo disabled. Nenhum controle habilitado fica sem ação. Ícones Lucide com 1.6 px de traço, 18–24 px, com nome acessível quando isolados.

Formulários têm validação própria e mensagens relacionadas aos campos. Calendário de datas e horários é uma seleção de botões rotulados em pt-BR. Dialog é a primitiva modal compartilhada baseada no elemento dialog, com foco/restauração e Escape. Feedback usa região de status compartilhada. Textareas têm resize none e altura suficiente com rolagem própria. Movimentos duram 300 ms e são removidos com prefers-reduced-motion.

A linha do cuidado permanece apenas na landing. AppLayout é o proprietário do cabeçalho de conta e da navegação tanto na agenda quanto na família. Heading permite título sem eyebrow. A confirmação resume atendimento, criança, dia e horário; “Ver consulta” abre a lista de consultas diretamente. O marcador global identifica a demonstração e avisos de armazenamento continuam visíveis, sem repetir explicações em cada cartão. Fases, consultas e notas conservam o mesmo significado de salvar, voltar, excluir e confirmar. Ver `UX-CONTRACT.md` para comportamento. Conteúdo clínico é ilustrativo; toda pessoa e consulta de exemplo é identificada como tal.

## Do's and Don'ts
- Preservar composição editorial na apresentação e clareza operacional nos formulários.
- Usar a mesma navegação, feedback e primitiva modal entre telas.
- Não inventar estatísticas, depoimentos, credenciais, valores ou orientações clínicas.
- Não publicar materiais originais de pesquisa nem coletar informações pessoais reais.
