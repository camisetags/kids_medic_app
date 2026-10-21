# Dra. Dayse Mary · Demo pediátrica

Demonstração interativa de um site e área da família, criada para apresentar a proposta de agendamento e acompanhamento infantil.

## Experimentar

Página inicial → Agendar consulta → escolher atendimento, dia e horário → confirmar simulação → Área da família. A área da criança reúne consultas, fases e anotações; é possível cancelar uma consulta, criar/editar/excluir notas e reiniciar os exemplos.

**Somente dados fictícios.** As interações são locais ao navegador. Não há reserva de consulta real, autenticação, prontuário, envio à médica, cobrança ou conteúdo clínico validado. Se o armazenamento estiver bloqueado, a aplicação mantém os exemplos durante a sessão e avisa sobre a limitação.

## Desenvolvimento

Node 22.12 ou posterior e npm.

```sh
npm ci
npm run dev
```

```sh
npm test -- --run
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

A suíte de navegador inicia o desenvolvimento na porta 4173 e o build sob `/kids_medic_app/` na porta 4174. `node scripts/capture-demo.mjs` gera capturas de todas as telas em 390 e 1440 px em um diretório temporário. Funções, métodos, componentes e callbacks respeitam o limite de sete linhas, verificado pelo ESLint.

## GitHub Pages

O workflow `pages.yml` valida tipos, lint e regras de domínio, constrói o site e publica `dist`. Rotas por hash e caminhos relativos permitem servir a aplicação em um subdiretório. Para conferir o resultado:

```sh
node scripts/check-published.mjs https://camisetags.github.io/kids_medic_app/
```

## Direção e limites

Identidade visual provisória em verde sálvia, areia e musgo. Fontes locais Fraunces e Epilogue, distribuídas sob SIL Open Font License pelos pacotes Fontsource; ícones Lucide sob ISC; ilustração SVG original do projeto. `DESIGN.md` documenta o sistema visual e `UX-CONTRACT.md` os comportamentos compartilhados.

Requisitos e plano aprovados ficam em `docs/superpowers/`. Áudios, vídeo e transcrições de referência não são incluídos no código nem na publicação.
