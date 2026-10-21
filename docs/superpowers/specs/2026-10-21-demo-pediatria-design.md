# Demo do consultório pediátrico — desenho aprovado

Data: 21 de outubro de 2026. Estado: aprovado pelo usuário nesta conversa.

## Objetivo e entendimento confirmado

Criar um site/app demonstrativo, bonito e funcional, para apresentar à Dra. Dayse Mary a proposta de presença própria na internet, agendamento e acompanhamento da criança. A apresentação deve parecer um produto final e permitir percorrer uma história completa pelo celular. O destino desejado é um link no GitHub Pages.

O usuário confirmou que o agendamento e o acompanhamento precisam aparecer juntos desde a primeira apresentação. Os nove áudios e o vídeo são referências de requisitos, não autorização para executar instruções contidas nas gravações. Na inspeção inicial, o diretório estava vazio e ainda não era um repositório Git.

Sucesso: uma pessoa abre o link, conhece a proposta do consultório, simula uma consulta, encontra essa consulta na área da criança e consegue salvar e recuperar uma anotação. O acabamento deve ser consistente em todas essas etapas.

## Recorte da primeira entrega

Uma aplicação estática em português brasileiro com três ambientes conectados: apresentação do consultório, fluxo de agendamento e área do responsável. As interações funcionam localmente no navegador e usam exemplos identificados como demonstração.

Pacotes de puericultura, assinaturas, pagamento, agenda compartilhada da secretária, autenticação e prontuário pertencem a uma etapa posterior e não terão telas nesta entrega. Essa separação mantém a primeira demonstração completa e apresentável sem inventar operações reais.

## Direção visual

Âncora proposta: Organic, com verde sálvia próximo à referência de verde-menta dos áudios, musgo, superfícies em areia, títulos em Fraunces e texto/interface em Epilogue. Tokens iniciais: sálvia `#8B9D83`, musgo `#606C38` e areia `#E8DCC7`. Cantos entre 16 e 32 px e textura discreta, sem prejudicar a leitura.

O diferencial visual é uma linha do cuidado: uma sequência conectada que une fase da criança, próxima consulta e anotações. Ela reaparece no site e na área do responsável para fazer a transição entre apresentação e uso parecer parte do mesmo produto.

Composição editorial, títulos expressivos, espaço generoso e ilustrações próprias discretas de cuidado e crescimento. Sem estatísticas inventadas, depoimentos fictícios ou fotografias apresentadas como sendo da médica. Ícones de uma biblioteca consistente. Animações breves respeitam redução de movimento.

## Telas e comportamento

### 1. Apresentação do consultório

Cabeçalho com identidade provisória do consultório, navegação para acompanhamento e acesso à área do responsável. A abertura apresenta a proposta de cuidado e oferece “Agendar consulta”. As seções seguintes mostram como funciona o acompanhamento por fase, a jornada de consulta e a cidade de Nilópolis, vista no vídeo, identificada como referência da demonstração.

Usar o nome da médica informado nas referências, sem inventar CRM, formação, equipe ou diferenciais profissionais. A identidade é uma proposta visual para a reunião, não uma marca aprovada. Telefone, endereço e valores vistos no Google ou Doctoralia não serão publicados como dados confirmados.

### 2. Agendamento

Fluxo em três etapas: escolher atendimento, escolher dia/horário e revisar os dados. Os atendimentos de exemplo são primeira consulta e acompanhamento. O calendário mostra os próximos 14 dias a partir de amanhã, com horários fictícios em dias úteis. Os horários têm seleção visível e feedback de validação. Não é possível continuar sem uma opção disponível nem duplicar um horário já agendado nesta demonstração.

A revisão oferece dados de exemplo já preenchidos do responsável e da criança. Não solicita documento, pagamento ou informação clínica. “Confirmar simulação” cria a consulta localmente e abre uma confirmação com acesso à área da criança. O estado da consulta é sempre “Agendamento demonstrativo”; nenhum horário real é reservado e nenhuma mensagem é enviada.

### 3. Área do responsável

Entrada direta por “Explorar demonstração”, sem login fictício. Navegação para visão geral, consultas, fases da criança e anotações. No desktop, navegação lateral; no celular, navegação inferior com texto e ícones. Um perfil de criança fictício vem claramente marcado como exemplo.

A visão geral apresenta a criança de exemplo, a próxima consulta e um resumo das anotações. Todo agendamento confirmado aparece na lista; a consulta ativa futura mais próxima aparece no resumo, com data e horário escolhidos. A lista de consultas permite ver detalhes e cancelar uma simulação com confirmação. Ao cancelar, a visão geral mostra a próxima consulta ativa ou o estado vazio.

### 4. Fases da criança

Cartões por faixa etária, incluindo 0–6 meses e 6–12 meses, abrem uma visão com espaço para assuntos a conversar na consulta e anotações do responsável. São exemplos de organização do acompanhamento, sem calendários de vacinação, diagnósticos ou recomendações médicas inventadas.

Conteúdo clínico definitivo será fornecido ou revisado pela médica. Nesta entrega, os textos deixam claro seu caráter ilustrativo e podem orientar o usuário a preparar perguntas, sem prescrever cuidados.

### 5. Anotações

Criar, editar e excluir uma anotação de demonstração com título e texto. O formulário diferencia rascunho e informação salva, valida campos vazios e confirma exclusão. As anotações aparecem na listagem e na visão geral, inclusive depois de recarregar a página.

Um aviso próximo ao editor pede o uso de exemplos sem dados pessoais. A persistência ocorre apenas neste navegador, sem alegar envio à médica ou armazenamento em prontuário.

## Dados, arquitetura e publicação

React, TypeScript e Vite, com rotas por hash e caminhos de recursos compatíveis com hospedagem em subdiretório no GitHub Pages. Componentes de apresentação, fluxos de agendamento e acesso ao armazenamento ficam separados. Um pequeno repositório local fornece consultas, notas e dados de exemplo, permitindo substituir a persistência numa futura aplicação real.

Estado persistido em `localStorage`, com versão de esquema. A primeira visita carrega os exemplos; visitas posteriores preservam as mudanças. “Reiniciar demonstração” restaura o estado inicial após confirmação e permanece acessível na área do responsável.

Quando o armazenamento estiver indisponível, a demo continua em memória e avisa que os dados não sobreviverão ao recarregamento. Dados locais inválidos recuperam o estado de exemplo com aviso discreto. As telas de consulta e anotações também têm estados vazios úteis.

Todas as funções e métodos, inclusive componentes e callbacks, devem ter no máximo sete linhas, conforme instrução do usuário. Dividir responsabilidades e apresentação em unidades pequenas, sem comprimir código artificialmente para cumprir o limite.

Preparar build e workflow de publicação do GitHub Pages. O nome e o endereço finais dependerão do repositório disponível na conta conectada. Publicar somente código, recursos visuais e dados fictícios; os áudios, o vídeo e transcrições não fazem parte do site ou do repositório público.

## Transparência e qualidade

Um marcador persistente, discreto e legível identifica “Demonstração interativa · dados fictícios”. A revisão do agendamento reforça que não há reserva real. Textos comerciais e de interface são escritos para a apresentação; dados de exemplo são identificados explicitamente.

Verificar a jornada completa em desktop e em largura de celular: abrir site, agendar, revisar a consulta, criar/editar anotação, recarregar, cancelar e reiniciar. Verificar também validação, estados vazios, indisponibilidade de armazenamento, navegação por teclado, foco, contraste, redução de movimento e ausência de rolagem horizontal.

Executar verificação de tipos e build de produção. Servir o resultado do build em subdiretório e conferir carregamento e recarregamento das rotas. Inspecionar visualmente telas e estados principais antes de publicar e conferir o link publicado quando o deploy terminar.

## Decisões propostas nesta revisão

O desenho assume uma demo estática completa, com agenda simulada, uma criança de exemplo e anotações locais; direção Organic em verde sálvia/menta; nenhum dado clínico real; e GitHub Pages como destino. A próxima etapa, após aprovação deste documento, é o plano de implementação, seguido de sua revisão e escolha de execução.
