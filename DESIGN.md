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
  muted: "#596653"
  clay: "#B08B6E"
  danger: "#9B4535"
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

Âncora Organic. A linha do cuidado conecta fase, consulta e anotação e é a assinatura do sistema. Não parecer painel hospitalar, brinquedo ou dashboard financeiro. A identidade é provisória e usa apenas informações profissionais recebidas, sem credenciais ou prova social inventadas.

## Colors
CSS canônico em `src/styles/tokens.css`; este documento espelha seus valores aprovados (modelo B). `colors.primary` → `--primary`, `background` → `--background`, `surface` → `--surface`, `ink` → `--ink`, `muted` → `--muted`, `sage` → `--sage`, `moss` → `--moss`, `clay` → `--clay`, `danger` → `--danger`. Todos os componentes consomem variáveis semânticas. Verde escuro sobre areia e texto escuro sobre sálvia; cor nunca é o único indicador de estado. Tema claro único; forced-colors permanece utilizável.

## Typography
Fraunces Variable para títulos, Epilogue Variable para leitura e controles. Fontes locais distribuídas pelos pacotes Fontsource com licença. Títulos têm ritmo de publicação, texto tem linha 1.65 e largura limitada. Números de datas são tabulares. Português com acentos; sem transformar rótulos normais em linguagem temática.

## Layout
Largura máxima 1200 px, margens de 6% no desktop e 20 px no celular. Hero em duas colunas, uma coluna abaixo de 760 px. Área da família usa sidebar de 230 px, substituída por navegação inferior abaixo de 760 px. Rolagem pertence ao documento; nenhuma tela é artificialmente limitada à altura da janela. Reservar espaço para ações e safe-area no celular.

## Elevation & Depth
Hierarquia por superfícies tonais e bordas; sombra difusa apenas em cartões flutuantes da ilustração e no modal. Textura SVG de grão em baixa opacidade, sem prejudicar texto. Sem superfícies brancas puras, preto puro ou fundos creme.

## Shapes
Cartões 20 px, grandes painéis 32 px, controles 16 px. A ilustração pode usar arcos e círculos orgânicos, próprios da linguagem editorial. Não arredondar cada pequeno elemento de conteúdo.

## Components
Botões primários escuros, secundários com borda e ações destrutivas com texto e ícone próprios. Hover muda tom e deslocamento de no máximo 1 px, foco tem anel visível, seleção usa borda e ícone, indisponível usa texto e atributo disabled. Nenhum controle habilitado fica sem ação. Ícones Lucide com 1.6 px de traço, 18–24 px, com nome acessível quando isolados.

Formulários têm validação própria e mensagens relacionadas aos campos. Calendário de datas e horários é uma seleção de botões rotulados em pt-BR. Dialog é a primitiva modal compartilhada baseada no elemento dialog, com foco/restauração e Escape. Feedback usa região de status compartilhada. Textareas têm resize none e altura suficiente com rolagem própria. Movimentos duram 300 ms e são removidos com prefers-reduced-motion.

A linha do cuidado tem os mesmos três marcos na landing e na visão geral. Fases, consultas e notas conservam o mesmo significado de salvar, voltar, excluir e confirmar. Ver `UX-CONTRACT.md` para comportamento. Conteúdo clínico é ilustrativo; toda pessoa e consulta de exemplo é identificada como tal.

## Do's and Don'ts
- Preservar composição editorial na apresentação e clareza operacional nos formulários.
- Usar a mesma navegação, feedback e primitiva modal entre telas.
- Não inventar estatísticas, depoimentos, credenciais, valores ou orientações clínicas.
- Não publicar materiais originais de pesquisa nem coletar informações pessoais reais.
