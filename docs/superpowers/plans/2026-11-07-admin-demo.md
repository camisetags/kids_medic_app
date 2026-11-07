# Admin demonstrativo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Publicar admin interativo, com agenda e crianças compartilhadas com a visão da família.
**Architecture:** Evoluir o estado local para versão 2 e concentrar regras em funções de domínio. Filtrar dados na visão da família pela criança ativa; o admin consome a base completa. Reutilizar shell, seleção de horários, formulário e proteção de rascunhos.
**Tech Stack:** React, TypeScript, React Router hash, CSS existente, Vitest, Playwright; sem novas dependências.
**Spec:** docs/superpowers/specs/2026-11-07-admin-demo-design.md

## Global Constraints
- Demonstração pública, sem backend, login, reserva real ou dados pessoais reais.
- Máximo de sete linhas por função; datas locais, pt-BR; horários e janela de 14 dias existentes.
- Chave de armazenamento preservada, migração versão 1 sem perda; anotações ausentes do admin.
- Preservar landing e visual funcional aprovado; publicar no Pages existente.

## Review Focus
- Registros antigos precisam migrar sem desaparecer; testar carregamento de v1 e referências inválidas na Task 1.
- Horários concorrem entre crianças; remarcar a própria consulta não pode acusar conflito consigo mesma: Task 1.
- Trocar de família não deve revelar consultas/notas de outra criança: Task 1 e Task 2.
- Formulário incompleto, navegação pelo histórico e armazenamento bloqueado conservam trabalho e explicam falhas: Task 2.
- Filtros sem resultados, nomes longos e telas estreitas preservam ações e foco: Task 2 e Task 3.

### Task 1: Dados compartilhados e família ativa
**Files:** src/demo/{types,validation,storage,seed,children,appointments,notes,selectors}.ts; src/app/{demoActions,demoContext,useFamily}.ts; componentes atuais de família e booking; src/demo/admin.test.ts.
**Interfaces:** Child={id,name,ageMonths,guardian}; ChildInput=Pick<Child,'name'|'ageMonths'|'guardian'>. DemoState v2 com children,activeChildId,appointments e notes vinculados por childId. bookAppointment(state,input,now), rescheduleAppointment(state,id,{date,time},now), saveChild(state,input,id?), selectChild(state,id), familyState(state), childProfile(state) retornam estado ou seleção tipados. BookingInput continua compatível com a família usando childId opcional, resolvido pela criança ativa; consultas persistidas sempre têm childId.
- [x] Escrever testes que migram v1 preservando IDs/notas, rejeitam referências órfãs e idades inválidas, verificam conflitos globais e remarcação própria, cadastro/seleção e isolamento. Executar `npm test -- --run`; esperar falhas porque o schema ainda é v1 e interfaces novas não existem.
- [x] Implementar schema, validação/migração, seeds com três crianças, regras e ações; adaptar família/booking para useFamily e privacidade por childId. Fase padrão segue idade. Canceladas/passadas não podem ser remarcadas.
- [x] Executar `npm test -- --run`, lint e typecheck; esperar suíte verde. Commit `feat: share demo data between admin and family`.

### Task 2: Agenda e cadastro administrativos
**Files:** src/features/admin/{AdminLayout,AgendaPage,ChildrenPage,ChildEditor,VisitEditor,AdminVisitRow,Filters}.tsx e hooks; src/ui/{SelectField,SearchField,DraftDialog}.tsx; src/app/useDraft.ts; src/styles/admin.css; rotas e links; tests/e2e/admin.spec.ts, helpers administrativos.
**Interfaces:** AdminLayout reutiliza AppLayout com variant admin; useDraft<T>(initial,onSave,onClose) administra input,error,dirty,blocked,close,save,discard,keep. SelectField é select nativo, rotulado; SearchField inclui limpar. VisitEditor recebe appointment opcional, usa BookingModel compatível com DayChoice/TimeChoice e estado sem a consulta editada para disponibilidade.
- [x] Escrever testes E2E: cadastrar, editar, agendar, remarcar/cancelar e conferir família/reload; filtrar/limpar; validação e Escape/histórico; anotações privadas e armazenamento bloqueado. Executar testes novos e observar falhas por ausência do admin.
- [x] Implementar duas rotas, navegação e formulários reutilizados com guard de rascunho. Sucesso fecha diálogo e anuncia resultado. Campos obrigatórios associados a erro, primeiro inválido recebe foco. Lista filtrada por criança/responsável, data e situação. Não excluir crianças.
- [x] Executar testes novos e suíte existente, lint e typecheck; esperar sucesso. Commit `feat: add interactive admin agenda and child management`.

### Task 3: Verificação, revisão e publicação
**Files:** tests/e2e/accessibility.spec.ts; scripts/capture-admin.mjs; DESIGN.md; UX-CONTRACT.md; docs/verification.md.
**Interfaces:** Rotas /admin e /admin/criancas; contrato visual e comportamental atualizado sem alterar a apresentação da médica.
- [x] Incluir axe e largura em 390/1440 para novas rotas e modais. Capturar lista, formulário, calendário e família após alteração; inspecionar nomes longos e layout mobile.
- [x] Executar `npm run lint`, `npm run typecheck`, `npm test -- --run`, `npm run test:e2e`, auditoria premium estrita e lint DESIGN.md. Esperar zero falhas; registrar avisos documentais existentes.
- [x] Revisão independente do conjunto contra spec e Review Focus; corrigir achados importantes com regressões RED→GREEN e suíte verde. Commit final.
- [ ] Push autorizado para main, acompanhar workflow, verificar recursos e fluxo no site publicado, registrar resultado e entregar link direto do admin.

## Execução
Execução inline no worktree de feature existente. O usuário aprovou o desenho e pediu “só mete bronca”, autorizando seguir sem novas pausas para plano ou método. Publicação no mesmo Pages já autorizada no desenho aprovado.
