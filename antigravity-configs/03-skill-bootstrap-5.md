# Skill de Bootstrap 5 — Google Antigravity

> Documento de referência oficial. Dados recolhidos exclusivamente de fontes oficiais (getbootstrap.com e antigravity.google).

---

## 1. Identificação da skill proposta

| Campo | Valor |
|---|---|
| **Nome** | `bootstrap-5` (sugestão) |
| **Mantenedor do framework** | Mark Otto, Jacob Thornton e contribuidores Bootstrap |
| **Mantenedor da skill** | Equipa do projeto (skill autoral baseada na documentação oficial) |
| **Versão do framework** | **Bootstrap 5.3.x** (a mais recente na documentação oficial) |
| **Site oficial** | <https://getbootstrap.com/> |
| **Documentação oficial** | <https://getbootstrap.com/docs/5.3/> |
| **Tipo** | `SKILL.md` (formato Antigravity) |
| **Categoria** | Web Design / Frontend Frameworks |

> **Nota:** Não existe uma skill *oficial* da Google para Bootstrap 5. Esta skill usa exclusivamente dados oficiais de `getbootstrap.com` e respeita o formato `SKILL.md` definido em `antigravity.google/docs/skills`.

---

## 2. Fontes oficiais consultadas

| Documento | URL |
|---|---|
| Bootstrap — Introduction | <https://getbootstrap.com/docs/5.3/getting-started/introduction/> |
| Bootstrap — Contents | <https://getbootstrap.com/docs/5.3/getting-started/contents/> |
| Bootstrap — Grid system | <https://getbootstrap.com/docs/5.3/layout/grid/> |
| Bootstrap — Grid examples | <https://getbootstrap.com/docs/5.3/examples/grid/> |
| Bootstrap — Examples | <https://getbootstrap.com/docs/5.3/examples/> |
| Documentação Antigravity — Skills | <https://antigravity.google/docs/skills> |
| Documentação Antigravity — Plugins | <https://antigravity.google/docs/plugins> |
| Build with Google (Antigravity) | <https://antigravity.google/docs/build-with-google> |
| Codelab — Authoring Antigravity Skills | <https://codelabs.developers.google.com/getting-started-with-antigravity-skills> |

---

## 3. Propósito da skill

Capacitar o agente Antigravity a:

1. Gerar markup HTML5 válido usando **apenas classes oficiais** do Bootstrap 5.3.
2. Aplicar o **sistema de grid** mobile-first com os 6 breakpoints oficiais.
3. Utilizar componentes oficiais (Navbar, Modal, Card, Accordion, etc.) com a JavaScript bundle correta.
4. Respeitar as **CDNs oficiais** e estrutura de ficheiros recomendada.
5. Acessibilizar componentes seguindo ARIA + padrões do Bootstrap.

---

## 4. Conteúdo da skill — ficheiro `SKILL.md`

> Estrutura conforme definido em <https://antigravity.google/docs/skills>.

### 4.1 Localização recomendada

| Âmbito | Caminho |
|---|---|
| Workspace (projeto) | `<projeto>/.agent/skills/bootstrap-5/SKILL.md` |
| Global (todas as obras) | `~/.gemini/skills/bootstrap-5/SKILL.md` |

### 4.2 `SKILL.md` completo

```markdown
---
name: bootstrap-5
description: Builds accessible, mobile-first web interfaces using Bootstrap 5.3 (grid, components, utilities). Use this when the user asks to build, scaffold, refactor, or audit pages, layouts, forms, navbars, modals, or any UI with Bootstrap 5. Triggers on "Bootstrap", "BS5", "navbar", "card grid", "modal", "container/row/col", or any request for a responsive layout using Bootstrap.
---

# Bootstrap 5.3 Skill

## Goal

Produce production-grade HTML/CSS/JS that follows the **official Bootstrap 5.3
documentation** (getbootstrap.com/docs/5.3). Never invent classes. Never mix
Bootstrap 4 patterns.

## When to use this skill

- User mentions "Bootstrap", "BS5", "navbar", "card", "modal", "carousel",
  "accordion", "dropdown", "form controls", "grid", "container/row/col".
- User asks for a responsive landing page, dashboard, or admin shell.
- User wants a quick prototype with a pre-styled component library.
- User asks to migrate from Bootstrap 4 → 5 or from custom CSS → Bootstrap 5.

## When NOT to use this skill

- User wants Tailwind, Material, or another framework → use the appropriate skill.
- User wants raw CSS / modern CSS native APIs (container queries, :has(), etc.) →
  defer to `modern-web-guidance`.
- Project already uses a different UI library — do not introduce Bootstrap.

## Quick start (CDN — official)

Use the official Bootstrap 5.3 CDN. Required tags in the HTML head/body:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>...</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.x/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="<SRI-HASH-OF-5.3.x>"
      crossorigin="anonymous">
  </head>
  <body>
    <!-- content -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.x/dist/js/bootstrap.bundle.min.js"
      integrity="<SRI-HASH-OF-5.3.x>"
      crossorigin="anonymous"></script>
  </body>
</html>
```

> Always fetch the current SRI hash from the official docs or jsDelivr.
> The `bootstrap.bundle.min.js` includes Popper (required for dropdowns,
> tooltips, popovers).

## Grid system (official)

- **12 columns**, **6 responsive tiers** based on `min-width` media queries.
- Wrap content in `.container`, `.container-fluid`, or responsive
  `.container-{sm|md|lg|xl|xxl}`.
- Use `.row` and `.col-*` / `.col-{breakpoint}-*`.

| Breakpoint | Min-width | Class infix | Container max-width |
|---|---|---|---|
| xs   | <576px   | (none)   | auto |
| sm   | ≥576px   | `-sm-`   | 540px |
| md   | ≥768px   | `-md-`   | 720px |
| lg   | ≥992px   | `-lg-`   | 960px |
| xl   | ≥1200px  | `-xl-`   | 1140px |
| xxl  | ≥1400px  | `-xxl-`  | 1320px |

> *"Each tier of classes scales up, meaning if you plan on setting the same
> widths for md, lg, xl and xxl, you only need to specify md."*
> — getbootstrap.com/docs/5.3/examples/grid

Default gutter: `1.5rem` (`.75rem` per side). Use `.g-0`, `.gx-*`, `.gy-*` to
override.

### Grid example

```html
<div class="container">
  <div class="row g-3">
    <div class="col-12 col-md-8">Main</div>
    <div class="col-12 col-md-4">Sidebar</div>
  </div>
</div>
```

## Components that require Bootstrap's JavaScript

These components require `bootstrap.bundle.min.js` (includes Popper):

- Accordion, Alerts (dismissible), Buttons (toggle states), Carousel, Collapse
- Dropdowns, Modals, Navbar (responsive), Navs (Tab plugin), Offcanvas
- Scrollspy, Toasts, Tooltips, Popovers

## Accessibility rules (Bootstrap-specific)

- Use semantic HTML first; use Bootstrap classes to *enhance* it.
- Every Modal, Offcanvas, and Dropdown already includes the necessary
  `aria-*` attributes and focus management when initialised via the JS API.
- Forms: pair every `<input>` / `<select>` / `<textarea>` with a `<label>` and
  use `.form-label`, `.form-control`, `.form-text`, `.invalid-feedback`.
- Color contrast: do not override Bootstrap's color tokens with values that
  fail WCAG AA.

## Constraints

- DO NOT use jQuery — Bootstrap 5 dropped jQuery.
- DO NOT use Bootstrap 4 classes (`ml-*`, `mr-*`, `pl-*`, `pr-*` →
  use `ms-*`, `me-*`, `ps-*`, `pe-*`).
- DO NOT include both `bootstrap.js` and `bootstrap.bundle.js` — use
  the bundle.
- DO NOT use the `>` selector for child grids — `.row` already handles
  negative margins.
- DO NOT skip the `<meta name="viewport">` tag — Bootstrap is mobile-first.

## File structure (when including source via npm / package manager)

```
bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.min.css
│   ├── bootstrap-grid.css
│   ├── bootstrap-grid.min.css
│   ├── bootstrap-reboot.css
│   ├── bootstrap-reboot.min.css
│   ├── bootstrap-utilities.css
│   └── bootstrap-utilities.min.css
└── js/
    ├── bootstrap.bundle.js
    ├── bootstrap.bundle.min.js
    ├── bootstrap.esm.js
    └── bootstrap.esm.min.js
```

## Audit checklist

Before finishing a Bootstrap task, verify:

- [ ] Only Bootstrap 5.3 classes are used (no v4 leftovers).
- [ ] Grid columns add up to 12 per row.
- [ ] Components requiring JS are placed after `bootstrap.bundle.min.js`.
- [ ] `<meta name="viewport">` is in `<head>`.
- [ ] All form fields have associated `<label>`.
- [ ] Color contrast meets WCAG AA.
- [ ] No jQuery in dependencies.
- [ ] JS API is used for Modal / Offcanvas / Tooltip (not just data attrs) when
      dynamic lifecycle is needed.
```

---

## 5. Como o agente deve usar a skill

### 5.1 Trigger semântico (description field)

A description acima foi desenhada para fazer **matching semântico** com prompts do utilizador. Exemplos que devem ativar a skill:

- *"Cria uma landing page com Bootstrap 5"*
- *"Faz um dashboard com sidebar usando BS5"*
- *"Adiciona um modal de confirmação ao formulário"*
- *"Migra este template de Bootstrap 4 para 5"*
- *"Constrói uma navbar responsiva com dropdowns"*

### 5.2 Limites (Constraints)

| Fazer | Não fazer |
|---|---|
| Usar classes oficiais da v5.3 | Inventar classes não documentadas |
| Usar o bundle JS (inclui Popper) | Incluir `bootstrap.js` + `popper.js` separados |
| Usar `ms-*` / `me-*` | Usar `ml-*` / `mr-*` (v4) |
| Mobile-first | Esquecer o `<meta viewport>` |
| Semântica HTML + classes | `<div>` para tudo sem motivo |
| `npm install bootstrap` ou CDN | Adicionar jQuery |

---

## 6. Integração recomendada com outras skills oficiais

| Combinação | Porquê |
|---|---|
| `bootstrap-5` + `modern-web-guidance` | Bootstrap para layout base + APIs modernas nativas (View Transitions, container queries onde aplicável) |
| `bootstrap-5` + `web-design-guidelines` | Auditoria final de acessibilidade e UX |
| `bootstrap-5` + `frontend-design` | Decisões de design original (cores, tipografia) fora do standard Bootstrap |

---

## 7. Instalação local da skill no Antigravity

### 7.1 Estrutura de pastas

```
<projeto>/
└── .agent/
    └── skills/
        └── bootstrap-5/
            ├── SKILL.md
            ├── references/
            │   ├── grid.md        # resumo do grid system
            │   ├── components.md  # lista oficial de componentes
            │   └── utilities.md   # utilities oficiais
            └── examples/
                ├── landing.html
                ├── dashboard.html
                └── form.html
```

### 7.2 Comando

Não existe `npx` para esta skill — copia manualmente a pasta `bootstrap-5/` para `.agent/skills/` do projeto, ou globalmente para `~/.gemini/skills/`.

---

## 8. Versão e atualizações

| Item | Valor |
|---|---|
| Versão da skill | 1.0.0 |
| Compatível com Bootstrap | 5.3.x |
| Atualizar quando | Nova minor/major do Bootstrap 5 |

---

## 9. Resumo

| Pergunta | Resposta |
|---|---|
| Framework | Bootstrap 5.3 |
| Site oficial | getbootstrap.com |
| Skill oficial Google? | Não — skill autoral baseada em docs oficiais |
| Formato | `SKILL.md` (padrão Antigravity) |
| Localização | `.agent/skills/bootstrap-5/` ou `~/.gemini/skills/` |
| Inclui JS? | Sim — `bootstrap.bundle.min.js` (com Popper) |
| Inclui jQuery? | **Nunca** — removido na v5 |
| Mobile-first? | Sim, requer `<meta viewport>` |
| Componentes JS | 15 oficiais (Modal, Dropdown, Carousel, …) |
