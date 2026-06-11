# Skill de Web Design — Google Antigravity (`modern-web-guidance`)

> Documento de referência oficial. Dados recolhidos exclusivamente de fontes oficiais Google/Chrome.

---

## 1. Identificação da skill

| Campo | Valor |
|---|---|
| **Nome** | `modern-web-guidance` |
| **Mantenedor oficial** | Google Chrome team |
| **Repositório fonte** | `github.com/GoogleChrome/modern-web-guidance` |
| **Repositório de source** | `github.com/GoogleChrome/modern-web-guidance-src` |
| **Tipo** | `SKILL.md` + CLI bundled |
| **Tokens aproximados** | ~234 tokens (skill pack principal) |
| **Categoria Antigravity** | Build with Google Plugins |
| **Público** | Coding agents (Antigravity, Claude Code, Gemini CLI, Copilot, Cursor, etc.) |

---

## 2. Fontes oficiais consultadas

| Documento | URL |
|---|---|
| Documentação Chrome — Modern Web Guidance | <https://developer.chrome.com/docs/modern-web-guidance> |
| Chrome — Get started | <https://developer.chrome.com/docs/modern-web-guidance/get-started> |
| Chrome — Explore skills | <https://developer.chrome.com/docs/modern-web-guidance/explore-skills> |
| Chrome — Use cases | <https://developer.chrome.com/docs/modern-web-guidance/use-cases> |
| Chrome — Build extensions with AI | <https://developer.chrome.com/docs/extensions/ai/build-with-ai> |
| Build with Google (Antigravity) | <https://antigravity.google/docs/build-with-google> |
| Repositório GitHub (distribuição) | <https://github.com/GoogleChrome/modern-web-guidance> |
| Repositório GitHub (source) | <https://github.com/GoogleChrome/modern-web-guidance-src> |

---

## 3. Propósito oficial

> *"Modern Web Guidance is a set of skills that embed web platform expertise, best practices, and browser compatibility data directly into your coding agents. It helps to steer your coding agents away from legacy patterns, and instead toward solutions that harness the power and capabilities of the modern web platform."*
> — <https://developer.chrome.com/docs/modern-web-guidance>

Em resumo: fornecer ao agente **conhecimento atualizado** sobre APIs modernas do browser, padrões de design e performance, evitando que utilize padrões desatualizados ou workarounds legados.

---

## 4. Disciplinas base (Core Disciplines)

A skill cobre **6 domínios** oficiais:

| Disciplina | Ícone | Foco |
|---|---|---|
| **User Experience** | 🎨 | View Transitions, animações de entrada/saída, parallax scroll, `scrollbar-color` |
| **CSS Layout** | 📐 | Container queries, subgrid, espaços de cor modernos (`oklch`), `text-wrap`, line-height trimming |
| **Performance** | ⚡ | Preloading instantâneo, INP diagnostics, `scheduler.yield`, priorização de imagens |
| **Forms & UI** | 📝 | Anchor Positioning, Popover API, dialogs, `:user-invalid`, auto-sizing fields |
| **Accessibility** | ♿ | Screen reader, keyboard operability, navegação e descobrabilidade de conteúdo |
| **Built-in AI** | 🤖 | APIs nativas de tradução, sumarização e deteção de idioma no cliente |

> *Fonte: <https://github.com/GoogleChrome/modern-web-guidance>*

---

## 5. Estatísticas oficiais

| Métrica | Valor |
|---|---|
| Features modernas documentadas | **102** |
| Casos de uso reais de developers | **128** |
| CSS & Layout features | 51 |
| HTML & DOM features | 20 |
| JavaScript & APIs features | 31 |

---

## 6. Skill Packs disponíveis (instalação modular)

| Pack | Tokens | Conteúdo |
|---|---|---|
| `modern-web-guidance` | ~234 | Guidance abrangente sobre APIs modernas, layouts e performance |
| `chrome-extensions` | ~181 | Manifest V3, background workers, extension APIs, Chrome Web Store publishing |

A skill pode ser instalada de forma interativa:

```bash
npx modern-web-guidance@latest install --choose
```

---

## 7. Instalação oficial no Antigravity

### 7.1 Durante a instalação do Antigravity

Selecionar a opção **"modern-web-guidance"** no fluxo de instalação.

### 7.2 Após instalação, via Settings

1. Abrir `Settings` (`Cmd + ,` / `Ctrl + ,`).
2. Navegar para `Customizations`.
3. Abrir `Build with Google Plugins`.
4. Adicionar `Modern Web Guidance`.

### 7.3 Via CLI `agy` (Antigravity CLI)

```bash
agy plugin install https://github.com/GoogleChrome/modern-web-guidance
```

### 7.4 Outros métodos oficiais (mesma skill)

```bash
# Vercel Skills CLI
npx skills add GoogleChrome/modern-web-guidance

# GitHub CLI
gh skill install GoogleChrome/modern-web-guidance

# GitHub Copilot CLI
/plugin marketplace add GoogleChrome/modern-web-guidance
/plugin install modern-web-guidance@googlechrome

# Claude Code
/plugin marketplace add GoogleChrome/modern-web-guidance
/plugin install modern-web-guidance@googlechrome
```

---

## 8. Como invocar a skill no prompt

O Antigravity carrega a skill automaticamente quando a descrição do pedido corresponde semanticamente. Pode também forçar a consulta via slash command:

```text
/modern-web-guidance accessibility
/modern-web-guidance performance
/modern-web-guidance forms
/modern-web-guidance css
/modern-web-guidance html
```

Exemplo de prompt em linguagem natural que ativa a skill:

```text
Set up my app to begin preloading pages when users hover over important links.
```

```text
Build a sign-in form with correct autocomplete values and autofill support.
```

```text
Use CSS container queries to make this card layout adapt to its parent.
```

---

## 9. Categorias de casos de uso (Use Cases oficiais)

### 9.1 Accessibility

- `accessible-error-announcement` — Sincroniza `aria-invalid` com `:user-invalid` para feedback correto a screen readers.

### 9.2 Built-in AI

- `language-detection`, `language-model`, `summarizer`, `translator` — APIs on-device.

### 9.3 CSS

- `highlight-text-ranges` — Highlight de texto arbitrário (search results, erros ortográficos, cursores colaborativos).

### 9.4 Forms

- `autofill-address-form`, `autofill-sign-in-form`, `autofill-sign-up-form`, `autofill-payment-form`
- `passkey-authentication`, `passkey-registration`, `passkey-management`, `passkey-reauthentication`
- `rich-media-picker`, `branded-select-styling`, `animated-select-picker`
- `form-fields-automatically-fit-contents`, `user-invalid-validation`

### 9.5 Performance

- `batch-analytics-events` — Debounce + batch de analytics para reduzir contenção de rede.
- `break-up-long-tasks` — Quebrar tarefas síncronas pesadas.
- `efficient-background-processing` — Pausar canvas/JS quando off-screen.
- `faster-spa-view-transitions` — Preservar DOM state em SPAs.
- `identify-inp-causes` — Diagnosticar causas de INP lento.
- `improve-next-page-load-performance` — Prefetch/prerender de páginas prováveis.
- `interactions-in-complex-layouts` — Evitar layout re-cálculos em dashboards densos.
- `schedule-tasks-by-priority` — Usar `scheduler.yield`.

### 9.6 User Experience

- `adapt-scrollbar-to-contrast-preferences` — Scrollbar visível em high-contrast.
- `resilient-context-menus-and-nested-dropdowns` — Menus tethered a elementos com auto-reposicionamento.
- `search-hidden-content` — Conteúdo oculto (accordions, tabs) que aparece em "Find in page".

### 9.7 Privacy

- `privacy` — Privacy by design, data minimization, third-party audits, security headers.

---

## 10. Exemplo de SKILL.md (estrutura oficial)

```markdown
---
name: modern-web-guidance
description: Use this skill when building, modifying, or debugging web applications to apply modern browser APIs, performance, accessibility, and UX best practices. Covers 102 modern web features across CSS, HTML, JS, Forms, Performance, Accessibility, and Built-in AI.
---

# Modern Web Guidance

When the user asks for web work, call the `modern-web-guidance` CLI to fetch the
relevant guidance before writing code:

    npx modern-web-guidance@latest guide <topic>

## When to activate

- Building or editing HTML, CSS, JavaScript for the web platform.
- Working on forms, layout, performance, accessibility, or UX.
- Auditing a web app against modern standards.

## How to use

1. Identify the discipline(s) the request belongs to.
2. Run `npx modern-web-guidance@latest guide <discipline>` for the relevant pack.
3. Apply the returned guidance in the generated code.
4. When in doubt, prefer modern platform APIs over polyfills.

## Constraints

- Do NOT recommend jQuery, polyfills for widely-supported APIs, or legacy
  patterns when a modern alternative exists in Baseline.
- Always check `caniuse` / Baseline status before adopting an API.
- Accessibility is non-negotiable: every interactive element needs keyboard
  support and screen reader semantics.
```

---

## 11. Integração com Chrome DevTools MCP

A skill pode ser combinada com o **Chrome DevTools MCP server** para auditorias em tempo real:

> *"Combine Chrome DevTools for agents with Modern Web Guidance skills to improve your web development workflow. Run real-time performance audits, inspect accessibility trees, and capture console logs—and then automatically apply precise modern web code fixes."*
> — <https://developer.chrome.com/docs/modern-web-guidance>

Configuração MCP recomendada:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp"]
    }
  }
}
```

---

## 12. Boas práticas oficiais

1. **Instale via `agy plugin install`** — mantém atualizações automáticas.
2. **Combine com Chrome DevTools MCP** — para auditoria e fix automático.
3. **Use para extensão Chrome?** — Selecione também o pack `chrome-extensions` (~181 tokens).
4. **Não invente APIs** — sempre que a skill devolver uma feature, confirme a Baseline status.
5. **Accessibility primeiro** — qualquer UI deve ter keyboard support e semântica ARIA.

---

## 13. Resumo

| Pergunta | Resposta |
|---|---|
| O que é? | Skill oficial do Chrome team com 102 features modernas web. |
| Quem mantém? | Google Chrome. |
| Onde instalar? | `agy plugin install https://github.com/GoogleChrome/modern-web-guidance` |
| É open-source? | Sim (GitHub público). |
| Cobre Bootstrap? | Não — usa APIs nativas modernas. Use a skill de Bootstrap 5 em paralelo. |
| Cobre UX/UI? | Parcialmente (disciplina "User Experience"). Use a skill UX/UI para a parte conceptual. |
| Cobre acessibilidade? | Sim — disciplina dedicada "Accessibility". |
