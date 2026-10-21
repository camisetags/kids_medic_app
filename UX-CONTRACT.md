# Contrato de experiência
Visual: `DESIGN.md`. Regras de negócio: desenho aprovado em `docs/superpowers/specs/2026-10-21-demo-pediatria-design.md`.

## Canonical UI Map
| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Date | DayChoice / TimeChoice | src/demo/dates.ts | authored buttons | domain + journey E2E |
| Form | Field / NoteEditor | shared field labels + domain validation | create / edit | journey E2E |
| Scrollbar | base.css | global CSS tokens | document / textarea | browser computed styles |
| Toast | StatusMessage | DemoProvider status | success / warning / info | resilience E2E |
| CRUD | useDemo | pure demo rules | notes / appointments | full-flow E2E |
| Dialog | Dialog | native dialog with app-owned content | destructive confirmation / editor | keyboard E2E |

Não há dropdown, seleção tabular, tabela, autenticação ou integração externa. O calendário é autorado com botões nativos sem implementar um widget ARIA grid. Todas as ações são locais.

## Operações e estados
Agendar: selecionar → revisar → confirmar → confirmação com acesso à família. Uma submissão repetida não duplica o horário; datas são revalidadas na confirmação. Cancelar consulta requer confirmação e devolve à lista atualizada. Notas: criar/editar salva e fecha o editor, conservando a lista; excluir requer confirmação. Reiniciar restaura todos os exemplos após confirmação. Escape e cancelar preservam o estado salvo.

O editor permanece em modal: clicar na navegação externa enquanto há rascunho não é possível por inert. Fechar um rascunho alterado exige confirmação própria; recarregar com rascunho usa beforeunload apenas para proteção de descarte. Não persistir rascunho sensível na URL.

Formulários usam noValidate, labels reais, aria-invalid e erro associado; o primeiro campo inválido recebe foco. Salvar sem campos obrigatórios não apaga o rascunho. Texto do usuário é renderizado como texto, nunca HTML.

## Recuperação
Dados versionados no localStorage. Falha de leitura restaura exemplos com aviso. Falha de escrita mantém estado em memória e mostra aviso persistente. Sem rede, uma página já carregada mantém operações locais; não há promessa de instalação ou cache offline inicial. Datas e horas usam fuso local do navegador. Ao recarregar rota por hash, o mesmo destino é restaurado.

## Acessibilidade e apresentação
WCAG 2.2 AA como alvo. Cada rota tem título específico, foco no main e navegação ativa. Modal tem título, Escape, foco e retorno ao acionador. Navegação mobile não cobre conteúdo. Destruição usa verbo explícito e opção segura recebe foco. Estado vazio oferece uma ação útil. Todas as telas mostram o marcador de demonstração; sem cobrança ou reserva real.
