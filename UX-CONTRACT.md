# Contrato de experiência
Visual: `DESIGN.md`. Regras de negócio: desenho aprovado em `docs/superpowers/specs/2026-10-21-demo-pediatria-design.md`.

## Canonical UI Map
| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Date | DayChoice / TimeChoice | src/demo/dates.ts | authored buttons | domain + journey E2E |
| Select/Listbox | SelectField | UX-CONTRACT.md | native | admin E2E + axe |
| Form | Field / NoteEditor | shared field labels + domain validation | create / edit | journey E2E |
| Scrollbar | base.css | global CSS tokens | document / textarea | browser computed styles |
| Toast | StatusMessage | DemoProvider status | success / warning / info | resilience E2E |
| CRUD | useDemo | pure demo rules | notes / appointments | full-flow E2E |
| Dialog | Dialog | native dialog with app-owned content | destructive confirmation / editor | keyboard E2E |

SelectField usa select nativo: popup e teclado pertencem ao sistema operacional, com labels e opções pt-BR; geometria do popup nativo é aceita. Não há seleção tabular, autenticação ou integração externa. O calendário é autorado com botões nativos sem implementar um widget ARIA grid. Todas as ações são locais.

## Operações e estados
Agendar: selecionar → revisar → confirmar → confirmação curta com atendimento, criança, data e horário → “Ver consulta” abre `/familia/consultas`. Uma submissão repetida não duplica o horário; datas são revalidadas na confirmação. Cancelar consulta requer confirmação e devolve à lista atualizada. Notas: criar/editar salva e fecha o editor, conservando a lista; excluir requer confirmação. Reiniciar restaura todos os exemplos após confirmação. Escape e cancelar preservam o estado salvo.

O editor permanece em modal: clicar na navegação externa enquanto há rascunho não é possível por inert. Fechar um rascunho alterado exige confirmação própria; recarregar com rascunho usa beforeunload apenas para proteção de descarte. Não persistir rascunho sensível na URL.

Formulários usam noValidate, labels reais, aria-invalid e erro associado; o primeiro campo inválido recebe foco. Salvar sem campos obrigatórios não apaga o rascunho. Texto do usuário é renderizado como texto, nunca HTML.

## Recuperação
Dados versionados no localStorage. Falha de leitura restaura exemplos com aviso. Falha de escrita mantém estado em memória e mostra aviso persistente. Sem rede, uma página já carregada mantém operações locais; não há promessa de instalação ou cache offline inicial. Datas e horas usam fuso local do navegador. Ao recarregar rota por hash, o mesmo destino é restaurado.

## Acessibilidade e apresentação
WCAG 2.2 AA como alvo. Cada rota tem título específico, foco no main e navegação ativa. Modal tem título, Escape, foco e retorno ao acionador. Navegação mobile não cobre conteúdo. Destruição usa verbo explícito e opção segura recebe foco. Estado vazio oferece uma ação útil. Todas as telas mostram o marcador de demonstração; sem cobrança ou reserva real.

## Separação entre apresentação e app
A landing (`/`) preserva o registro editorial do consultório. AppLayout é o proprietário comum de `/agendar` e `/familia/*`, com conta de exemplo explícita: Marina é a responsável e Clara é a criança. Não há login nem suposição sobre a identidade real do visitante. Títulos e ações nomeiam as tarefas; não usar slogans, saudações personalizadas ou cartões decorativos nas telas funcionais. O marcador global informa que são dados fictícios; o sucesso do agendamento inclui um aviso curto de simulação. Avisos persistentes de armazenamento permanecem no StatusMessage. Regressões: `tests/e2e/app-clarity.spec.ts`.

## Admin demonstrativo e múltiplas famílias
Fonte: `docs/superpowers/specs/2026-11-07-admin-demo-design.md`. AdminLayout reutiliza AppLayout; Agenda e Crianças usam dados completos. useFamily é o proprietário da seleção por criança, incluindo notas privadas ausentes do admin. O acesso é livre e rotulado como demonstração, sem promessa de segurança. Schema v2 migra v1 mantendo a chave existente, IDs e conteúdo.

Cadastro e edição salvam e fecham o DraftDialog, conservam a lista filtrada e anunciam sucesso via StatusMessage. Nova consulta e remarcação reutilizam DayChoice/TimeChoice, com botões type=button dentro de formulários. A disponibilidade exclui a própria consulta ao remarcar e é global entre crianças. Cancelamento conserva registro e libera horário. Não excluir crianças. Ver como família seleciona explicitamente a criança e navega para /familia. Cadastros novos não trocam a criança ativa.

useUnsavedGuard é o proprietário comum da proteção de histórico/beforeunload para notas e admin. useDraft/DraftDialog implementam descarte explícito dos formulários administrativos, Escape e foco em erro. Busca e filtros do admin vivem na URL (q/date/status), usam replace para não poluir o histórico e permitem limpar a busca com retorno de foco. Listas de demonstração são locais e pequenas, renderizadas integralmente com rolagem do documento. Estados vazios distinguem ausência de dados de filtros sem resultados. Sem sincronização entre abas/dispositivos.
