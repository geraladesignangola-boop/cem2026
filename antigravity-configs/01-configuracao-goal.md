# Configuração `/goal` do Google Antigravity

> Documento de referência oficial. Dados recolhidos exclusivamente de fontes oficiais Google.

---

## 1. O que é o `/goal`?

`/goal` é um **slash command nativo** do Google Antigravity (IDE, App Desktop 2.0 e CLI `agy`) que instrui o agente a executar uma tarefa **até a conclusão completa**, sem solicitar confirmações intermédias ao utilizador.

> *"Tells the agent to run until the specified task is completely finished, not asking for intermediate input from the user. The agent will automatically approve its own implementation plan, not ask for clarifications, and will return once it determines that the task has been completed."*
> — Fonte: <https://antigravity.google/blog/google-io-2026-feature-deep-dive>

É, na prática, o modo **"fully autonomous"** do Antigravity.

---

## 2. Fontes oficiais consultadas

| Documento | URL |
|---|---|
| Documentação principal (Slash Commands) | <https://antigravity.google/docs> |
| Blog oficial — Google I/O 2026 Feature Deep Dive | <https://antigravity.google/blog/google-io-2026-feature-deep-dive> |
| Blog oficial — Introducing Google Antigravity 2.0 | <https://antigravity.google/blog/introducing-google-antigravity-2-0> |
| Codelab "Getting Started with Google Antigravity" | <https://codelabs.developers.google.com/getting-started-google-antigravity> |
| Blog Google Developers — Build with Google Antigravity | <https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/> |
| Documentação da API Gemini (Agente Antigravity) | <https://ai.google.dev/gemini-api/docs/antigravity-agent> |

---

## 3. Conjunto completo de Slash Commands oficiais

O Antigravity 2.0 expõe os seguintes slash commands nativos (todos oficiais):

| Comando | Função |
|---|---|
| `/goal` | Executa a tarefa até ao fim, sem pedir input intermédio. Auto-aprova o plano de implementação. |
| `/grill-me` | Antes de implementar, o agente faz perguntas para alinhar detalhes específicos do plano. |
| `/schedule` | Executa uma instrução como tarefa única agendada ou recorrente (via Scheduled Tasks). |
| `/browser` | Força o agente a usar o sub-agente de browser (Chrome). Requer Chrome + permissão de debugging. |

---

## 4. Como o `/goal` se comporta

### 4.1 Comportamento documentado oficialmente

1. O agente **não pergunta** por clarificações intermédias.
2. O agente **auto-aprova** o seu próprio plano de implementação.
3. O agente **executa** a sequência de tool calls até determinar que a tarefa está concluída.
4. A aprovação é feita uma única vez por classe de operação (modelo de segurança *human-in-the-loop*).

> *"Tells the agent to run until the specified task is completely finished, not asking for intermediate input from the user. The agent will automatically approve its own implementation plan, not ask for clarifications, and will return once it determines that the task has been completed."*
> — <https://antigravity.google/blog/google-io-2026-feature-deep-dive>

### 4.2 Modelo de segurança (human-in-the-loop)

Mesmo com `/goal`, o Antigravity **mantém um pedido único de permissão** antes de executar comandos bash. Esta é uma decisão deliberada de design:

- Uma permissão é pedida **por classe de operação**.
- Depois de aprovada, o agente **não pergunta novamente** para a mesma classe.
- O objetivo é evitar que a automação pareça uma "caixa preta" e manter a segurança em contextos de produção.

---

## 5. Sintaxe e exemplos

### 5.1 No Agent Manager (IDE / App Desktop)

Escrever `/goal` antes do pedido:

```
/goal Implementa a página de checkout com Stripe e testes E2E em Playwright.
```

### 5.2 No Antigravity CLI (`agy`)

O CLI aceita o mesmo prefixo:

```bash
agy
```

Depois, na prompt:

```
/goal I have a sales dataset at /Users/name/Desktop/sales_raw.csv.
Spin up multiple subagents to clean, analyze, and visualize it.
Produce a final HTML report and save all outputs in this folder.
```

> O CLI cria automaticamente sub-agentes (ex.: `data_cleaner`, `data_analyzer`, `data_visualizer`) a partir da descrição do objetivo.

### 5.3 Combinação com outros comandos

Não é cumulativo com `/grill-me` — escolha um ou outro:

| Cenário | Comando recomendado |
|---|---|
| Tarefa clara, sem ambiguidade, quer execução rápida | `/goal` |
| Quer alinhar plano antes da execução | `/grill-me` |
| Quer agendar para o futuro | `/schedule` |
| Quer inspecionar UI no browser durante a execução | `/browser` |

---

## 6. Sub-agentes gerados automaticamente

Com `/goal`, o orquestrador pode **decompor a tarefa em sub-agentes** automaticamente. O exemplo documentado usa três sub-agentes (`data_cleaner`, `data_analyzer`, `data_visualizer`) que:

- Operam em **contextos isolados** (um falha não reverte o trabalho dos outros).
- Correm em **paralelo** quando possível.
- Reportam o resultado ao orquestrador para montagem final.

> *"The orchestrator monitors all active subagents and will surface an error in the terminal if one fails, because subagents operate in isolated contexts."*
> — Documentação do Antigravity CLI

---

## 7. Configurações relacionadas que afetam o `/goal`

Para que o `/goal` trabalhe em conjunto com políticas de revisão, configure:

| Definição | Local | Efeito |
|---|---|---|
| `Review Policy` | Settings → Artifact | `Asks for Review` ou `Auto-Approve` |
| `Terminal Command Auto Execution` | Settings → Terminal | `Request Review` ou `Auto-Run` |
| Sandbox Mode | Project Settings → Agent Settings | Liga/desliga contentor de isolamento |
| `Outside of Folder File Access Policy` | Project Settings | `Always Allow` / `Always Ask` / `Always Deny` |
| `Browser URL Allowlist` | Settings → Browser | Lista de domínios autorizados para `/browser` |

> *Fonte: <https://antigravity.google/docs/settings> e codelab oficial.*

---

## 8. Boas práticas oficiais

1. **Use `/goal` apenas quando o objetivo é claro** — sem ambiguidades, a tarefa pode correr sem supervisão.
2. **Use `/grill-me` antes de `/goal`** se a primeira iteração gerar um plano que quer validar.
3. **Combine com `/schedule`** para pipelines recorrentes (ex.: relatório diário de dados).
4. **Defina a `Review Policy` para `Asks for Review`** se ainda estiver a aprender — só depois mude para `Auto-Approve`.
5. **Mantenha a Allowlist do browser atualizada** se for usar `/browser` para verificação visual.
6. **Não use `/goal` para tarefas destrutivas** sem primeiro verificar a `Outside of Folder File Access Policy`.

---

## 9. Limitações conhecidas (documentadas)

| Limitação | Detalhe |
|---|---|
| Status | A API do agente Antigravity e a Interactions API estão em **preview** — schemas podem mudar. |
| `temperature`, `top_p`, `top_k`, `stop_sequences`, `max_output_tokens` | **Não suportados** no agente (devolve 400). |
| Structured outputs | **Não suportado**. |
| `file_search`, `computer_use`, `google_maps`, `function_calling`, `mcp` | **Ainda não suportados** como tools. |
| `background=True` | **Não suportado** — requer `store=True`. |
| Compactação de contexto | Automática a ~135k tokens (Interactions API). |

> *Fonte: <https://ai.google.dev/gemini-api/docs/antigravity-agent>*

---

## 10. Resumo rápido

| Pergunta | Resposta |
|---|---|
| O que faz? | Executa a tarefa até ao fim, sem pausas. |
| Auto-aprova o plano? | Sim. |
| Pede clarificações? | Não. |
| Pede permissões? | Sim, uma vez por classe de operação (modelo de segurança). |
| Pode correr sub-agentes? | Sim, em paralelo, isolados. |
| Funciona no CLI? | Sim (`/goal` no `agy`). |
| Funciona na IDE? | Sim. |
| É open-source? | O CLI (escrito em Go) é open-source; o app é proprietário Google. |
| Alternativa? | `/grill-me` para validar antes; `/schedule` para agendar. |
