# Demo pediátrica — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar uma demo com acabamento final, agendamento simulado e acompanhamento da criança, acessível por um link no GitHub Pages.

**Architecture:** Aplicação estática React/TypeScript com rotas por hash. Regras de agenda e anotações são funções puras; um adaptador de armazenamento e um contexto React conectam os fluxos ao mesmo estado. A identidade visual e a navegação são compartilhadas entre apresentação, agendamento e área do responsável.

**Tech Stack:** React, TypeScript, Vite, React Router, Lucide React, CSS, Vitest, Testing Library, Playwright e ESLint; versões compatíveis resolvidas no início da execução e fixadas no lockfile.

**Spec:** `docs/superpowers/specs/2026-10-21-demo-pediatria-design.md` — aprovado em 21/10/2026.

## Global Constraints

- “Todas as funções e métodos, inclusive componentes e callbacks, devem ter no máximo sete linhas, conforme instrução do usuário.” Aplicar também aos testes; sem comprimir instruções artificialmente.
- Português brasileiro; identificação persistente “Demonstração interativa · dados fictícios”.
- “Tokens iniciais: sálvia `#8B9D83`, musgo `#606C38` e areia `#E8DCC7`.” Títulos Fraunces, interface Epilogue e cantos entre 16 e 32 px.
- “O diferencial visual é uma linha do cuidado: uma sequência conectada que une fase da criança, próxima consulta e anotações.”
- Agenda: primeira consulta/acompanhamento, próximos 14 dias a partir de amanhã, somente dias úteis; confirmação “Confirmar simulação”; estado visível “Agendamento demonstrativo”.
- Sem autenticação, pagamento, prontuário, envio de mensagens ou conteúdo clínico inventado; nenhum arquivo original ou transcrição na publicação.
- Rotas por hash, recursos com base relativa e publicação em subdiretório; persistência local versionada e recuperação de falhas.
- Invocar o frontend-design solicitado e o frontend-design-premium antes de implementar UI; manter `DESIGN.md` com a direção aprovada.

## Review Focus

1. Virada de mês/ano e fuso local: datas continuam futuras e não mudam de dia por conversão UTC — tarefa 1.
2. Agenda repetida ou dia que ficou no passado durante a sessão: confirmação rejeita opção inválida e oferece nova seleção — tarefas 1 e 3.
3. Armazenamento bloqueado, corrompido ou de versão desconhecida: demo continua navegável e explica a recuperação — tarefas 1 e 4.
4. Recarregamento direto de rota e implantação em subdiretório: página e recursos carregam sem 404 — tarefas 2 e 5.
5. Anotação só com espaços ou texto com marcação HTML: validação rejeita vazio; conteúdo válido aparece como texto e pode ser removido — tarefas 1 e 4.

## Estrutura e contratos compartilhados

- Raiz: `package.json`, `package-lock.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `.gitignore`, `DESIGN.md`, `README.md`.
- `src/main.tsx`, `src/app/{App,Routes,DemoProvider,useDemo}.tsx`: bootstrap, rotas e estado compartilhado.
- `src/demo/{types,seed,dates,appointments,notes,storage}.ts`: regras de domínio e persistência; testes adjacentes `*.test.ts`.
- `src/ui/{Brand,Button,Dialog,DemoNotice,EmptyState,CareLine}.tsx`: primitivas acessíveis; arquivos adicionais por responsabilidade quando necessários ao limite de linhas.
- `src/styles/{tokens,base,layout,components}.css` e `public/art/care-journey.svg`: sistema visual e ilustração original sem representar a médica.
- `src/features/landing/{LandingPage,Hero,CareStages,VisitJourney,Footer}.tsx`.
- `src/features/booking/{BookingPage,VisitChoice,DayChoice,TimeChoice,BookingReview,BookingConfirmation}.tsx`.
- `src/features/family/{FamilyLayout,FamilyNavigation,OverviewPage,AppointmentsPage,AppointmentDetails,StagesPage,NotesPage,NoteEditor,ResetDemo}.tsx`.
- `tests/e2e/{journey,resilience}.spec.ts`, `tests/e2e/helpers.ts`, `playwright.config.ts`, `.github/workflows/pages.yml` e `scripts/check-published.mjs`.

Tipos em `types.ts`: `VisitKind = 'first' | 'follow-up'`; `Appointment = { id: string; kind: VisitKind; date: string; time: string; status: 'scheduled' | 'cancelled' }`; `Note = { id: string; title: string; body: string; updatedAt: string }`; `DemoState = { version: 1; appointments: Appointment[]; notes: Note[] }`. Datas são chaves locais `YYYY-MM-DD`; horários são `HH:mm`. `BookingInput` contém `kind`, `date` e `time`; `NoteInput` contém `title` e `body`.

## Task 1: Estado demonstrativo confiável

**Files:** configurações de projeto e `src/demo/*` definidos acima.

**Interfaces:** produz `createDemoState(now: Date): DemoState`, `getDemoDays(now: Date): string[]`, `getAvailableTimes(state: DemoState, date: string, now: Date): string[]`, `bookAppointment(state: DemoState, input: BookingInput, now: Date): DemoState`, `cancelAppointment(state: DemoState, id: string): DemoState`, `getNextAppointment(state: DemoState, now: Date): Appointment | undefined`, `saveNote(state: DemoState, input: NoteInput, now: Date, id?: string): DemoState`, `deleteNote(state: DemoState, id: string): DemoState`.

- [ ] Criar as configurações necessárias para executar testes e TypeScript, sem gerar uma aplicação exemplo. Configurar scripts `dev`, `build`, `preview`, `test`, `lint`, `typecheck` e `test:e2e`; ESLint com `max-lines-per-function: 7`, incluindo funções aninhadas e componentes.
- [ ] Escrever `test('janela local cruza ano e mês')` com relógio local em 31/12/2026: `expect(days).toHaveLength(14)`, `expect(days[0]).toBe('2027-01-01')`, `expect(days[13]).toBe('2027-01-14')`; repetir fim de fevereiro. Em `test.each` de fim de semana, data passada e fora da janela, exigir `expect(getAvailableTimes(state, date, now)).toEqual([])`.
- [ ] Escrever testes de agendamento: criar consulta, impedir duplicidade, rejeitar seleção vencida e devolver a consulta ativa futura mais próxima independentemente da ordem de inserção. Cancelamento libera o horário; consulta passada não aparece como próxima.
- [ ] Escrever `test('notas criadas editadas e excluídas')`, verificando `expect(state.notes).toHaveLength(1)`, conteúdo após edição e lista vazia após excluir. Em `test.each` dos campos em branco, exigir `expect(() => saveNote(state, input, now)).toThrow()`; para marcação, `expect(saved.body).toBe('<script>exemplo</script>')`. Executar `npm test -- --run`; os testes devem falhar por módulos ainda ausentes.
- [ ] Implementar os contratos puros. Horários fictícios fixos: `09:00`, `10:00`, `11:00`, `14:00`, `15:00`. A disponibilidade filtra consultas ativas com a mesma data/hora. Gerar identificadores com `crypto.randomUUID()` e datas locais sem `toISOString()` para chaves do calendário.
- [ ] Adicionar `loadDemo(storage: Storage | undefined, now: Date): { state: DemoState; notice: string | null }` e `persistDemo(storage: Storage | undefined, state: DemoState): boolean` em `storage.ts`. Chave `kids-medic-demo:v1`; validar todos os campos e recuperar exemplos quando o JSON ou esquema forem inválidos. Testar leitura e gravação que lançam erro, JSON inválido e versão desconhecida antes de implementar.
- [ ] Executar `npm test -- --run`, `npm run typecheck` e `npm run lint`; esperar sucesso. Registrar commit `feat: add pediatric demo state and scheduling rules`.

## Task 2: Sistema visual e apresentação do consultório

**Files:** `DESIGN.md`, `index.html`, `src/main.tsx`, `src/app/{App,Routes}.tsx`, `src/ui/*`, `src/styles/*`, `src/features/landing/*`, `public/art/care-journey.svg`, `playwright.config.ts` e teste de navegação em `tests/e2e/journey.spec.ts`.

**Interfaces:** consome `createDemoState`; produz `App(): ReactElement` e rotas `#/`, `#/agendar`, `#/familia`, `#/familia/consultas`, `#/familia/fases`, `#/familia/anotacoes`. Primitivas: `Button(props: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement`, `Dialog(props: { open: boolean; title: string; onClose: () => void; children: ReactNode }): ReactElement`, `CareLine(props: { compact?: boolean }): ReactElement`.

- [ ] Aplicar as skills de frontend previstas e registrar propósito, âncora Organic, tokens, conteúdo, comportamento mobile e diferencial em `DESIGN.md`. Preparar o ambiente isolado pela skill de worktrees no início da execução.
- [ ] Escrever `test('entrada e navegação')`: abrir `/`; `await expect(page.getByText('Dra. Dayse Mary', { exact: true }).first()).toBeVisible()` e verificar o marcador de demonstração; acionar “Agendar consulta”; `await expect(page).toHaveURL(/#\/agendar$/)`. Executar `npm run test:e2e -- --grep 'entrada e navegação'`; esperar falha pela ausência da UI.
- [ ] Implementar base visual responsiva, rotas e componentes compartilhados. Usar `base: './'` no Vite, fontes locais licenciadas e ícones Lucide. Construir a ilustração SVG original e a linha do cuidado; funções de componente devem permanecer pequenas e legíveis.
- [ ] Implementar a landing com nome da médica, chamada editorial, fases, jornada e referência demonstrativa a Nilópolis. Nenhum CRM, preço, currículo, endereço exato ou depoimento inventado. Não usar rótulos técnicos na experiência do produto.
- [ ] Implementar `Dialog` com elemento nativo `dialog`, título acessível, fechamento por Escape e retorno de foco. A navegação deve indicar rota ativa; usar landmarks, rótulos de formulário e foco visível. Adicionar suporte a `prefers-reduced-motion`.
- [ ] Executar teste de entrada e navegação, `npm run lint`, `npm run typecheck` e `npm run build`. Inspecionar landing em 390 px e 1440 px, incluindo contraste, legibilidade e ausência de rolagem horizontal. Registrar commit `feat: build pediatric clinic visual experience`.

## Task 3: Agendamento conectado à área da criança

**Files:** `src/app/{DemoProvider,useDemo}.tsx`, `src/features/booking/*`, `src/features/family/{FamilyLayout,FamilyNavigation,OverviewPage,AppointmentsPage,AppointmentDetails}.tsx`, `tests/e2e/journey.spec.ts` e `tests/e2e/helpers.ts`.

**Interfaces:** consome contratos da tarefa 1 e `Dialog`; produz `DemoProvider(props: { children: ReactNode }): ReactElement` e `useDemo(): { state: DemoState; notice: string | null; book: (input: BookingInput) => void; cancel: (id: string) => void; save: (input: NoteInput, id?: string) => void; remove: (id: string) => void; reset: () => void }`. Mutações válidas atualizam a memória e tentam persistir; erros de domínio são apresentados no formulário.

- [ ] Acrescentar `test('agendamento persiste na área da criança')`: escolher primeira consulta, dia útil disponível e horário; revisar o perfil fictício e confirmar a simulação; na área da criança, `await expect(page.getByTestId('next-appointment')).toContainText(chosenDateLabel)` e `await expect(page.getByTestId('next-appointment')).toContainText(chosenTime)`; repetir após `page.reload()`. Executar o teste e confirmar falha antes da implementação.
- [ ] Implementar provider e hook sobre as funções puras. Consultar a data atual novamente na confirmação para rejeitar horários vencidos. Seleções indisponíveis exibem erro e permitem voltar ao calendário sem perder a escolha de atendimento.
- [ ] Construir as três etapas com progresso claro, seleção acessível, voltar/continuar e revisão. A confirmação identifica a simulação e oferece acesso à área da criança. Nenhuma ação abre WhatsApp, envia dados ou afirma reservar uma consulta real.
- [ ] Implementar shell da família com sidebar no desktop, navegação inferior no celular, visão geral e consultas. Usar criança e responsável explicitamente fictícios; próxima consulta deriva de `getNextAppointment` e não de uma cópia de estado.
- [ ] Acrescentar teste de cancelamento: abrir detalhes, confirmar cancelamento e verificar estado vazio ou próxima consulta restante. Verificar que o mesmo horário volta a poder ser selecionado. Executar testes da tarefa 1 e jornada completa; inspecionar os estados selecionado, erro e confirmação nos dois tamanhos.
- [ ] Executar `npm run lint`, `npm run typecheck` e `npm run build`; registrar commit `feat: connect appointment booking and family dashboard`.

## Task 4: Fases, anotações e recuperação da demonstração

**Files:** `src/features/family/{StagesPage,NotesPage,NoteEditor,ResetDemo}.tsx`, ajustes em `OverviewPage.tsx`, `src/app/DemoProvider.tsx`, `tests/e2e/{journey,resilience}.spec.ts` e `tests/e2e/helpers.ts`.

**Interfaces:** consome `useDemo`, `saveNote`, `deleteNote` e `Dialog`; produz `StagesPage(): ReactElement`, `NotesPage(): ReactElement` e `ResetDemo(): ReactElement`. O editor usa `NoteInput`; a URL pode transportar apenas um título de rascunho vindo da fase, sem dados pessoais.

- [ ] Escrever `test('anotações persistem e podem ser removidas')`: criar, editar e recarregar; `await expect(page.getByRole('heading', { name: editedTitle })).toBeVisible()`; excluir com confirmação e exigir `await expect(page.getByRole('heading', { name: editedTitle })).toHaveCount(0)`. Em `test('editor valida e apresenta texto literal')`, verificar erro para espaços e `await expect(page.getByTestId('note-body')).toHaveText('<script>exemplo</script>')`. Executar ambos e confirmar falha.
- [ ] Implementar fases 0–6 meses, 6–12 meses, 1–3 anos e 4 anos em diante, com exemplos de perguntas para levar à consulta; identificar conteúdo ilustrativo. O CTA de cada fase abre uma nova anotação com título de rascunho, ainda não salvo.
- [ ] Implementar listagem e editor de notas, feedback de rascunho/salvo, foco após abrir/fechar e confirmação de exclusão. Mostrar próximo ao editor: “Use apenas exemplos, sem dados pessoais. As anotações ficam neste navegador.”
- [ ] Escrever testes de resiliência: bloquear leitura e gravação de `localStorage`, sem impedir anotar/agendar em memória; injetar JSON inválido e esquema desconhecido e verificar restauração com aviso. Implementar avisos correspondentes sem bloquear navegação.
- [ ] Implementar reinicialização com confirmação e testar restauração de exemplos após notas e consultas modificadas. Testar acesso direto e recarregamento de cada rota da família. Executar domínio, jornada e resiliência, além de lint, tipos e build; registrar commit `feat: add child follow-up notes and resilient demo reset`.

## Task 5: Revisão visual e publicação no GitHub Pages

**Files:** `.github/workflows/pages.yml`, `README.md`, `scripts/check-published.mjs` e refinamentos visuais nos arquivos que os testes ou a inspeção apontarem.

**Interfaces:** consome `npm run build` e o diretório `dist`; produz workflow de Pages e URL verificada. `check-published.mjs` recebe a URL como argumento e falha se a página ou algum recurso local referenciado responder com erro.

- [ ] Executar a skill de verificação antes de concluir e fazer revisão de implementação em relação ao desenho aprovado. Verificar todas as funções com ESLint; não dispensar o limite de sete linhas para componentes, hooks ou testes.
- [ ] Executar `npm test -- --run`, `npm run test:e2e`, `npm run lint`, `npm run typecheck` e `npm run build`. Servir `dist` sob `/kids_medic_app/`; verificar recursos, navegação por hash e recarregamento direto. Adicionar a verificação de subdiretório em `resilience.spec.ts`.
- [ ] Inspecionar capturas reais em 390 px e 1440 px de landing, seleção de horário, revisão, confirmação, visão geral, fases e editor; corrigir desalinhamento, sobreposição, foco ou contraste. Verificar navegação completa por teclado e redução de movimento.
- [ ] Descobrir conta e repositório pela integração GitHub disponível ou CLI autenticada. Se não houver repositório apropriado, criar um repositório dedicado `kids_medic_app` e configurar o remoto. Não enviar fontes de pesquisa ou dados pessoais. Se a autenticação impedir a publicação, entregar o build e indicar precisamente a ação de conta necessária.
- [ ] Criar workflow com checkout, versão LTS do Node compatível com Vite, `npm ci`, verificações, build, upload do artefato e deploy de Pages. Fixar actions oficiais em revisões verificadas; permissões mínimas `contents: read`, `pages: write` e `id-token: write`, ambiente `github-pages` e concorrência de deploy. Publicar pela branch padrão real do repositório.
- [ ] Documentar comandos locais e comportamento demonstrativo no README; registrar commit `chore: publish pediatric demo to GitHub Pages`, enviar mudanças e acompanhar o deploy até concluir. Executar `node scripts/check-published.mjs <URL>` e abrir o site publicado para percorrer entrada, agendamento e anotações.
- [ ] Entregar o link publicado, resumo do que funciona e limites práticos da demonstração. Só afirmar publicação concluída após conferir deploy e URL.

## Revisão e método de execução

Plano revisado contra o desenho: tarefas 1–4 cobrem os fluxos e estados; tarefa 5 cobre inspeção, subdiretório e publicação. Os cinco focos de revisão têm testes nas tarefas responsáveis. As assinaturas de domínio são únicas e reutilizadas pelo provider e pelas telas.

Recomendação: execução nativa nesta conversa, com uma revisão independente do conjunto ao final conforme a skill de execução. As cinco tarefas formam uma única jornada com estado e identidade visual compartilhados; manter o mesmo implementador reduz passagens de contexto. Alternativa: execução por subagentes, com implementador e revisor por tarefa. A implementação aguarda a revisão deste plano e a escolha do método pelo usuário, conforme o brainstorming escolhido.
