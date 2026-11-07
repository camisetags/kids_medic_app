# Admin demonstrativo do consultório

## Objetivo e intenção

Adicionar ao mockup publicado uma visão administrativa utilizável para demonstrar o trabalho do consultório: consultar a agenda de várias crianças, cadastrar e editar crianças/responsáveis, criar, remarcar e cancelar consultas. O usuário quer brincar com os dados, sem operação real do consultório. Preservar a separação aprovada entre landing editorial e app direto.

## Abordagens

- **Demonstração local integrada — escolhida pelo usuário:** continuar no projeto e no GitHub Pages, com uma base compartilhada entre família e admin no mesmo navegador. Permite alterações reais no estado da demonstração, persistidas localmente, com baixo custo de operação. Não sincroniza dispositivos nem representa controle de acesso.
- **Sistema operacional com backend:** banco compartilhado, autenticação e permissões. Permitiria uso por pessoas em dispositivos diferentes, mas muda o objetivo, a infraestrutura e os requisitos de tratamento de dados. O usuário escolheu explicitamente manter esta etapa demonstrativa.

O uso da mesma base local, em vez de um painel desconectado com números estáticos, é uma decisão do implementador para atender ao pedido de interatividade.

## Escopo proposto pelo implementador

### Agenda administrativa

Rota `/admin`, com título “Agenda”. Mostrar consultas de todas as crianças, identificando criança, responsável, atendimento, dia, horário e situação. Busca por criança/responsável e filtros por data e situação; padrão sem filtro de data, para que registros antigos ainda sejam localizáveis. Ordenar por data/hora, mostrando os valores reais da base demonstrativa. Não adicionar indicadores ou gráficos sem utilidade operacional.

Ações: “Nova consulta”, “Remarcar” e “Cancelar consulta”. Nova consulta seleciona uma criança cadastrada e reutiliza os tipos e a disponibilidade existentes. Remarcar preserva identificação e atendimento, permite escolher um novo dia/horário, revalida disponibilidade ao salvar e exclui o próprio registro do cálculo de conflito. Cancelar pede confirmação, conserva o registro com situação “Cancelada” e libera o horário. Não adicionar novos estados clínicos nesta etapa. Consultas passadas continuam visíveis, mas não podem ser remarcadas; o admin pode consultar e cancelar exemplos antigos.

### Crianças e responsáveis

Rota `/admin/criancas`, com busca e lista de crianças, idade e responsável. Cadastrar e editar apenas nome da criança, idade em meses (inteiro entre 0 e 216) e nome do responsável. Campos obrigatórios, nomes entre 1 e 120 caracteres após trim; identificadores gerados e estáveis. Sem coleta de contato, documentos, informações clínicas ou credenciais. Não há exclusão de crianças nesta etapa, evitando registros órfãos.

Cada criança oferece “Ver como família”. A ação seleciona explicitamente aquela família de exemplo e abre `/familia`. O cabeçalho da família mostra o responsável e a criança selecionados, sem supor que representam a identidade real do visitante. Cadastro novo não troca a família ativa automaticamente.

### Visão da família

Agendamento, consultas, próxima consulta, acompanhamento ilustrativo e anotações usam a criança ativa. O admin vê a agenda de todas as crianças; a família vê somente seus próprios registros demonstrativos. Criar, remarcar ou cancelar pelo admin atualiza a mesma consulta que aparece na família ao navegar entre as duas áreas.

Anotações continuam privadas da visão da família: vinculadas à criança ativa e ausentes do admin. Não criar prontuário, evolução clínica, mensagens ou encaminhamento de anotações à médica. O acompanhamento continua sendo o fluxo ilustrativo atual. Sem filtro de fase na URL, abrir a faixa correspondente à idade da criança ativa; permitir explorar as demais faixas sem alterar o cadastro.

### Navegação e apresentação

Admin tem contexto inequívoco “Admin · demonstração”, navegação “Agenda” e “Crianças” e acesso à área da família. Família oferece um acesso secundário “Admin da demonstração”. Landing preservada, admitindo apenas um link discreto para o admin no rodapé.

Manter a linguagem funcional aprovada: rótulos normais, cabeçalho compacto, fonte sans, identidade verde e superfícies do app. Um aviso de demonstração identifica a ausência de acesso protegido; não simular login nem exibir cadeado. Usar somente exemplos fictícios.

## Dados e persistência

Migrar o estado para schema versão 2, com crianças, identificador da criança ativa e `childId` em consultas e anotações. Novos exemplos incluem três famílias claramente fictícias e consultas em datas relativas ao relógio do navegador; família ativa inicial Clara/Marina.

Preservar a chave de armazenamento existente. Estados válidos de versão 1 são migrados atribuindo consultas e notas existentes a Clara e conservando conteúdo, IDs e situações; adicionar os demais cadastros de exemplo sem inventar consultas adicionais na migração. Estado versão 2 é validado, inclusive referências e família ativa. Dados inválidos continuam recuperando os exemplos com aviso. Reiniciar demonstração restaura a versão 2 após confirmação.

Sem rede ou armazenamento disponível, operações continuam em memória com o aviso existente. Trocar áreas usa navegação da mesma aplicação; sincronização concorrente entre abas/dispositivos continua fora do escopo.

## Regras e estados de interação

Agenda e família usam uma só implementação das regras de disponibilidade: dias úteis entre amanhã e os próximos 14 dias, horários fixos atuais, uma consulta agendada por horário para a médica, independentemente da criança. Criação e remarcação revalidam no momento de salvar. Nenhuma ação inválida altera estado nem descarta o formulário.

Formulários e confirmações reutilizam os componentes compartilhados, labels reais, erros associados e foco no primeiro campo inválido. Fechar uma edição alterada exige descarte explícito; histórico e Escape preservam as garantias já existentes. Sucesso retorna à lista atualizada e mostra feedback curto. Filtros de busca têm ação de limpar, e estado vazio informa se faltam dados ou se os filtros não encontraram resultados.

## Limites explícitos

Sem backend, login, permissões reais, cobrança, mensagens externas, reserva real, configuração de disponibilidade, exportação ou importação. O admin não é uma barreira de segurança; o app permanece uma demonstração pública com dados locais fictícios. Não compartilhar anotações privadas com o admin.

## Verificação e conclusão

Testar migração sem perda de dados, referências inválidas, cadastro/edição, visibilidade por criança, conflito entre famílias e remarcação sem falso conflito com a própria consulta. No navegador: criar criança e consulta pelo admin, abrir sua visão da família, remarcar, cancelar, recarregar e verificar persistência; testar filtros, validação, rascunhos, armazenamento bloqueado e privacidade das anotações. Preservar toda a suíte existente, axe em desktop/celular e limite máximo de sete linhas por função.

Concluir com build e verificações passando, inspeção visual nas duas larguras, publicação no Pages existente e conferência do fluxo no endereço público. Atualizar DESIGN.md, UX-CONTRACT.md e registro de verificação. Detalhes de componentes e decomposição de funções ficam para o plano de implementação, respeitando os proprietários compartilhados existentes.
