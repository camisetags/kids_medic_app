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
