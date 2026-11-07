# Validação da demo — 21 de outubro de 2026

Site: https://camisetags.github.io/kids_medic_app/
Código: https://github.com/camisetags/kids_medic_app
Execução de publicação: https://github.com/camisetags/kids_medic_app/actions/runs/39673200649

## Evidências

- 23 testes de domínio e 35 testes no navegador passaram localmente e no GitHub Actions.
- ESLint, limite de sete linhas por função, TypeScript e build de produção passaram.
- Auditoria estática premium: zero erros ou avisos. DESIGN.md: zero erros; seis avisos sobre tokens auxiliares documentados sem referência de componente no frontmatter.
- Verificação axe nas seis rotas principais em 390 e 1440 px; jornada completa no celular; editor com movimento reduzido.
- Verificados: agendamento, cancelamento, disponibilidade após cancelamento, notas CRUD, texto literal, recarregamento, armazenamento indisponível, JSON inválido, versão desconhecida, reinicialização e rascunhos protegidos ao usar Escape e Voltar do navegador.
- Build servido sob `/kids_medic_app/` com recarregamento de rota por hash.
- Capturas reais de apresentação, calendário, revisão, confirmação, família, fases, notas e editor em celular e desktop foram inspecionadas.
- Pelo endereço público: scripts, estilos, fontes e SVG carregaram; agendamento, consulta na área da criança e anotação após recarregar funcionaram. Nenhum recurso observado pela jornada pública retornou erro HTTP.

## Revisão independente

Revisão somente de leitura do código, plano e desenho. Nenhum achado crítico ou menor. Dois achados importantes foram reproduzidos por testes antes da correção e resolvidos em uma passagem:

1. Voltar pelo histórico podia perder o rascunho. A navegação agora exige descartar ou continuar escrevendo.
2. Agenda não mostrava falha de persistência. O aviso agora aparece durante o agendamento e na confirmação, que distingue armazenamento persistente de sessão.

O verificador de recursos também foi corrigido após uma execução pública demonstrar que um filtro interno de SVG era confundido com URL de arquivo. A mesma verificação passou depois da correção.

## Decisões de execução e consequências

1. Os títulos internos das tarefas foram padronizados para `Task`, exigido pelos scripts de acompanhamento. Sem alteração de escopo ou custo no produto.
2. O worktree gerenciado exigiu autorização de escrita do sandbox; as mudanças foram executadas nele para preservar o checkout original. Sem alteração de comportamento do produto.
3. Reservas reais, autenticação, pagamentos e conteúdo clínico validado permanecem fora da demo, conforme o desenho aprovado. A consequência é que ela demonstra a proposta e não presta esses serviços.
4. A configuração e o endereço público ficaram sob verificação do implementador após o deploy; ambos foram conferidos. O risco seria entregar um link quebrado sem essa verificação.
5. Sincronização entre abas ficou fora desta demonstração de sessão única. Usar uma aba; abas concorrentes podem substituir mudanças nos exemplos.
6. O implementador verificou as capturas reais; a revisão independente inspecionou código e estilos. O julgamento estético continua subjetivo.
7. Foi usado o data hash router do React Router para proteger rascunhos no histórico mantendo as rotas por hash. A mudança de navegação foi coberta pela suíte completa.
8. O ambiente de publicação deste repositório permitia `master`; a regra foi alinhada apenas para `main`, preservando a restrição de branch. Outras branches não publicam automaticamente. Referência: https://docs.github.com/en/rest/deployments/branch-policies#update-a-deployment-branch-policy

## Pendências menores

Nenhuma pendência menor identificada pela revisão independente. Limites de produto: dados fictícios locais, uma única aba e ausência de integração real com o consultório.

## Revisão de clareza do app — 21/10/2026

Recorte aprovado: manter a landing editorial, separar visualmente o app, reduzir textos e identificar explicitamente Marina como responsável de exemplo e Clara como criança. AppLayout passa a ser o proprietário comum da agenda e da família; a confirmação resume atendimento, criança, data e horário e abre diretamente a lista de consultas. Retirados o resumo duplicado durante a agenda, slogans, saudação personalizada e cartões decorativos do app.

- Regressões de identidade e destino da confirmação foram executadas antes da implementação e falharam por ausência do contexto explícito; passaram após a implementação.
- 23 testes de domínio e 37 testes de navegador passaram. Cobertura inclui axe nas seis rotas em 390/1440 px, persistência, cancelamento, notas, avisos de armazenamento e proteção de rascunhos.
- ESLint (máximo de sete linhas por função), TypeScript, build de produção e `git diff --check` passaram.
- Auditoria premium estrita sem achados. DESIGN.md: zero erros; 11 avisos de tokens documentados sem referência de componente no frontmatter, mapeados para o CSS canônico no próprio documento.
- Capturas reais de landing, calendário, revisão, confirmação, resumo, acompanhamento, notas e editor em 390/1440 px foram inspecionadas. A landing conserva sua composição; o app usa superfícies neutras, títulos sans menores e ações diretas.
- Revisão independente somente de leitura de código e capturas: nenhum achado crítico, importante ou menor. Autenticação e validação clínica continuam fora do recorte.
- Publicação da revisão concluída: https://github.com/camisetags/kids_medic_app/actions/runs/39681656589 (commit de produto `8fe4844`). Os mesmos checks passaram no GitHub Actions.
- Após o deploy, o verificador público confirmou scripts, estilos, fontes e ilustração. A jornada manual no endereço público identificou responsável/criança, concluiu a nova confirmação e abriu `/familia/consultas` com a consulta criada visível.

## Admin demonstrativo — 07/11/2026

Desenho aprovado: `docs/superpowers/specs/2026-11-07-admin-demo-design.md`; plano: `docs/superpowers/plans/2026-11-07-admin-demo.md`. Agenda e Crianças compartilham o estado v2 com a família ativa. Cadastro, edição, consulta nova, remarcação, cancelamento, busca, filtros e “Ver como família” são operacionais na demonstração local. Migração preserva consultas e anotações de v1 e seus IDs. Notas permanecem fora do admin.

Verificação: 31 testes de domínio; suite de navegador ampliada com admin, modais axe, recuperação, filtros e isolamento. ESLint (máximo de sete linhas por função), TypeScript e build executados. Auditoria premium estrita sem achados; DESIGN.md sem erros, com 11 avisos documentais já existentes de tokens auxiliares. Capturas de agenda, crianças, formulário e família inspecionadas em 390/1440 px.

Revisão independente do conjunto identificou dois achados importantes, reproduzidos em testes antes da correção: filtro de data ficava invisível ao remarcar a última consulta daquela data; erro de dia/horário não tinha alvo de foco. Ambos corrigidos e cobertos por três regressões RED→GREEN.

Pendência menor da revisão: quando o cancelamento ou remarcação remove a linha sob os filtros atuais, o acionador original deixa de existir e o navegador pode restaurar foco ao corpo; Tab continua na próxima linha. Falta um fallback explícito para o título da lista. Não há perda de dados ou impedimento de continuar.

Decisões e limites: execução inline sem novas pausas, conforme pedido explícito do usuário; demonstração pública sem autenticação, backend ou sincronização entre abas/dispositivos; conteúdo permanece fictício e ilustrativo, sem validação clínica. Revisão deixou publicação para verificação do implementador e não cobriu todas as combinações de navegador. Testes visuais/axe especificados usam Chromium em 390/1440 px.
