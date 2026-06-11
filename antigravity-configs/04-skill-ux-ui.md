# Skill de UX/UI — Google Antigravity

> Documento de referência oficial. Dados recolhidos exclusivamente de fontes oficiais Google (web.dev, Chrome for Developers, Antigravity docs).

---

## 1. Identificação da skill proposta

| Campo | Valor |
|---|---|
| **Nome** | `ux-ui-design` (sugestão) |
| **Mantenedor do conteúdo** | Google web.dev, Chrome for Developers, equipe Antigravity |
| **Versão** | 1.0.0 |
| **Categoria** | UX/UI, Design, Acessibilidade |
| **Tipo** | `SKILL.md` (formato Antigravity) |
| **Combina com** | `modern-web-guidance` (User Experience discipline) |

> **Nota:** Não existe uma única skill *oficial* chamada "UX/UI" publicada pela Google. Esta skill agrega exclusivamente guidelines publicados em **web.dev** (Learn Accessibility, Design and UX) e a disciplina **User Experience** da skill oficial `modern-web-guidance` (Chrome team).

---

## 2. Fontes oficiais consultadas

| Documento | URL |
|---|---|
| web.dev — Learn Accessibility (Welcome) | <https://web.dev/learn/accessibility/welcome> |
| web.dev — Design and user experience | <https://web.dev/learn/accessibility/design-ux> |
| web.dev — Accessibility (hub) | <https://web.dev/accessibility> |
| web.dev — Why accessibility matters | <https://web.dev/learn/accessibility/why> |
| Chrome — Modern Web Guidance (User Experience) | <https://developer.chrome.com/docs/modern-web-guidance> |
| Chrome — Get started (MWG) | <https://developer.chrome.com/docs/modern-web-guidance/get-started> |
| Chrome — Explore skills (MWG) | <https://developer.chrome.com/docs/modern-web-guidance/explore-skills> |
| Antigravity — Skills docs | <https://antigravity.google/docs/skills> |
| Antigravity — Plugins docs | <https://antigravity.google/docs/plugins> |
| Build with Google | <https://antigravity.google/docs/build-with-google> |

---

## 3. Propósito da skill

Capacitar o agente Antigravity a:

1. Aplicar os **7 princípios de Inclusive Design** oficiais do Google.
2. Respeitar as **10 heurísticas de acessibilidade** do Google/Deque.
3. Adicionar **accessibility annotations** a designs.
4. Recomendar APIs nativas modernas (View Transitions, scrollbar-color, etc.) sempre que a UX o exigir.
5. Auditar decisões de design contra WCAG e padrões de inclusão.

---

## 4. Conteúdo da skill — ficheiro `SKILL.md`

### 4.1 Localização recomendada

| Âmbito | Caminho |
|---|---|
| Workspace (projeto) | `<projeto>/.agent/skills/ux-ui-design/SKILL.md` |
| Global | `~/.gemini/skills/ux-ui-design/SKILL.md` |

### 4.2 `SKILL.md` completo

```markdown
---
name: ux-ui-design
description: Plans, reviews, and audits user interface and experience decisions against Google's official inclusive design principles, accessibility heuristics, and modern web UX guidelines (View Transitions, Anchor Positioning, Popover, scroll-driven animations). Use this skill whenever designing, redesigning, or reviewing UI components, layouts, navigation, forms, or interaction patterns. Triggers on "UX", "UI", "user experience", "interface design", "accessibility", "a11y", "WCAG", "inclusive design", "responsive", "interaction", "animation", "transitions".
---

# UX/UI Design Skill (Google web.dev + Chrome Modern Web Guidance)

## Goal

Produce user interfaces that follow the **official Google inclusive design
guidelines**, are **accessible by default** (WCAG-aligned), and use **modern
native browser APIs** for UX (instead of heavy libraries).

## Sources of truth (read these)

1. <https://web.dev/learn/accessibility/design-ux> — official inclusive design
   principles and accessibility heuristics.
2. <https://web.dev/learn/accessibility> — full accessibility course.
3. <https://developer.chrome.com/docs/modern-web-guidance> — modern UX APIs.
4. <https://antigravity.google/docs/skills> — SKILL.md format.

## The 7 Inclusive Design Principles (official)

When designing any UI, check the result against these 7 principles:

1. **Provide comparable experience** — ensure your interface provides an
   equal experience for all, so people can accomplish tasks in a way that
   suits their needs without undermining the quality of the content.
2. **Consider the situation** — make sure your interface delivers a valuable
   experience to people, regardless of their circumstances.
3. **Be consistent** — use familiar conventions and apply them in a logical
   manner.
4. **Give control** — ensure people can access and interact with content in
   their preferred way.
5. **Offer choice** — consider providing different ways for people to complete
   tasks, especially those that are complex or non-standard.
6. **Prioritize content** — help users focus on core tasks, features, and
   information by arranging these elements in the preferred order within the
   content and layout.
7. **Add value** — consider the purpose and significance of features and how
   they improve the experience for different users.

> Source: web.dev/learn/accessibility/design-ux

## The 10 Accessibility Heuristics (Google / Deque)

> *"Up to 67% of all accessibility bugs for a website or app can be avoided
> when accessibility is part of the design process."*
> — web.dev (Deque research, 2019)

Apply these 10 heuristics at design time:

1. **Interaction methods and modalities** — users can efficiently interact
   using their input method of choice (mouse, keyboard, touch, voice, etc.).
2. **Navigation and wayfinding** — users can navigate, find content, and
   determine where they are, at all times, within the system.
3. **Structure and semantics** — users can make sense of the structure of
   the content on each page and understand how to operate within the system.
4. **Error prevention and states** — interactive controls have persistent,
   meaningful instructions to help prevent mistakes, and provide clear error
   states which indicate what the problems are and how to fix them.
5. **Contrast and legibility** — users can easily distinguish and read text
   and other meaningful information.
6. **Language and readability** — users can easily read and understand the
   content.
7. **Predictability and consistency** — users can predict each element's
   purpose; it's clear how each element relates to the system as a whole.
8. **Timing and preservation** — users are given enough time to complete
   their tasks and don't lose information if their session runs out.
9. **Movement and flashing** — users can stop elements on the page that move,
   flash, or are animated. Users shouldn't be distracted or otherwise harmed
   by these elements.
10. **Visual and auditory alternatives** — users can access text-based
    alternatives for any visual or auditory content which conveys information.

## Accessibility annotations (handoff design → dev)

Before handing off to development, the design must include annotations for:

- **Color**: contrast ratios of every color pair in the palette.
- **Buttons and links**: identify default, hover, active, focus, and disabled
  states.
- **Skip links**: highlight the skip-to-main-content link.
- **Headings**: add H1–H6 levels and include every text that looks like a
  heading.
- **Landmarks**: highlight `<header>`, `<nav>`, `<main>`, `<aside>`,
  `<footer>`.
- **Interactive components**: identify clickable elements, hover effects,
  focus area.
- **Keyboard**: identify where focus starts (alpha stop) and the tab order.
- **Forms**: field labels, helper text, error messages, success messages.
- **Accessible names**: how assistive technology should recognise the element.

## Modern UX APIs (Chrome team, official)

Prefer native browser APIs over JS libraries. Examples:

| Need | Use | Avoid |
|---|---|---|
| Smooth route transitions | View Transitions API | Heavier SPA libraries |
| Tooltip / Popover tethered to element | CSS Anchor Positioning + Popover API | Tippy.js / Floating UI (unless needed) |
| Custom scrollbar styling | `scrollbar-color` | Custom JS scrollbars |
| Entry / exit animations | CSS `@starting-style` + transitions | Animate.css |
| Scroll-driven animations | `animation-timeline: scroll()` | ScrollMagic |
| Off-thread heavy work | `scheduler.yield()` | `setTimeout(fn, 0)` hacks |
| Form validation styling | `:user-invalid` | Custom JS validators |

> Source: developer.chrome.com/docs/modern-web-guidance

## Color contrast rules (WCAG-aligned, official)

- **Normal text**: contrast ratio ≥ **4.5:1** (AA).
- **Large text (≥18pt or 14pt bold)**: ≥ **3:1** (AA).
- **UI components and graphics**: ≥ **3:1** (AA).
- AAA (recommended where possible): 7:1 for normal text, 4.5:1 for large.
- Use `oklch()` or `color-mix()` for modern, perceptually-uniform palettes.

## Motion & animation rules

1. **Respect `prefers-reduced-motion`** — wrap all animations in
   `@media (prefers-reduced-motion: no-preference)`.
2. **No flashing > 3 Hz** — risk of seizures (WCAG 2.3.1).
3. **Auto-pause** long animations on hover / focus / `prefers-reduced-motion`.
4. **Always provide a stop** for moving content.
5. **Stagger entrances** for lists (60–120ms per item) — never all at once.

## Form UX rules (Chrome team)

- Pair every input with a `<label>`.
- Use `autocomplete="<token>"` for known fields (name, email, address, cc-*).
- Validate with `:user-invalid` (only after user interaction).
- Show password toggle, never block paste.
- Submit button must be a real `<button type="submit">`, never a `<div>`.
- On error, move focus to the first invalid field and announce via
  `aria-live="polite"`.

## Audit checklist (run before declaring UI done)

- [ ] Keyboard: every interactive element reachable via Tab, with visible
      focus ring.
- [ ] Screen reader: all images have `alt`, all icons have `aria-label` or
      are `aria-hidden`.
- [ ] Contrast: all text/UI pairs pass WCAG AA.
- [ ] Motion: respects `prefers-reduced-motion`.
- [ ] Forms: every input has a label, autocomplete tokens set, validation
      uses `:user-invalid`.
- [ ] Landmarks: one `<main>`, one `<h1>` per page.
- [ ] Responsive: layout works at 360px, 768px, 1024px, 1440px.
- [ ] Touch targets: ≥ 44×44 px (WCAG 2.5.5 AAA, recommended by web.dev).
- [ ] Internationalization: `lang` attribute on `<html>`; text expands up to
      30% in translations.
- [ ] Color is never the only signal (state must also use icon/text).

## Constraints

- DO NOT use jQuery, Bootstrap 4 patterns, or any legacy workarounds when a
  modern API exists in Baseline.
- DO NOT override native focus rings without providing an equivalent visible
  alternative.
- DO NOT use `outline: none` without `:focus-visible` replacement.
- DO NOT use `tabindex > 0`.
- DO NOT use `<div>` or `<span>` as a button — use `<button>` or
  `<a role="button">`.
- DO NOT auto-play audio or video with sound.
- DO NOT introduce a UI library for what a modern native API already does.

## When to escalate to a human

- Branding decisions (color palette, typography pairings) — confirm with the
  user before generating.
- Architecture of the IA (sitemap, navigation taxonomy) — confirm.
- Copywriting (microcopy, error messages, empty states) — confirm tone.
- Anything involving user research / personas — confirm scope.
```

---

## 5. Ficheiros de referência complementares

A skill pode ser complementada com ficheiros em `references/`:

### 5.1 `references/contrast-and-color.md`

```markdown
# Contrast & color (WCAG 2.1 / 2.2)

- AA normal text: 4.5:1
- AA large text:  3:1   (≥18pt or 14pt bold)
- AA UI components: 3:1
- AAA normal text: 7:1
- AAA large text:  4.5:1

Tools: Chrome DevTools → CSS Overview, Lighthouse (Google). Ferramentas da
indústria (não-Google) úteis: Stark, Polypane, axe DevTools (Deque).

Never rely on color alone. Pair color with icon, label, or text.
```

### 5.2 `references/forms-checklist.md`

```markdown
# Forms UX checklist

- [ ] Real `<form>` with `method` and `action` (or JS handler).
- [ ] `<label for="id">` paired with every input.
- [ ] `autocomplete` tokens (per Chrome guidance).
- [ ] `:user-invalid` for validation styling.
- [ ] `aria-describedby` for help / error text.
- [ ] `aria-invalid="true"` toggled in JS for state.
- [ ] `aria-live="polite"` region for form-level error summary.
- [ ] Submit button: real `<button type="submit">`.
- [ ] No disabling of paste.
- [ ] Password manager compatible.
```

### 5.3 `references/motion-respect.md`

```markdown
# Respecting motion preferences

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 6. Combinação com outras skills oficiais

| Combinação | Resultado |
|---|---|
| `ux-ui-design` + `modern-web-guidance` | Decisões de UX + APIs modernas nativas |
| `ux-ui-design` + `bootstrap-5` | Auditoria de acessibilidade em UI Bootstrap |
| `ux-ui-design` + `frontend-design` | Decisões de design originais validadas por heurísticas |
| `ux-ui-design` + `web-design-guidelines` | Auditoria técnica final (código) |

---

## 7. Métricas-chave para avaliar a UX

| Métrica | Onde medir | Fonte |
|---|---|---|
| **INP** (Interaction to Next Paint) | CrUX / RUM | web.dev / INP article |
| **LCP** (Largest Contentful Paint) | CrUX / RUM | web.dev |
| **CLS** (Cumulative Layout Shift) | CrUX / RUM | web.dev |
| **Lighthouse Accessibility score** | Chrome DevTools | developer.chrome.com |
| **axe-core violations** | Automated tests | deque.com/axe *(ferramenta da indústria, não Google)* |
| **Manual screen reader test** | NVDA / VoiceOver | web.dev |

---

## 8. Resumo

| Pergunta | Resposta |
|---|---|
| Fontes oficiais | web.dev, Chrome for Developers, Antigravity docs |
| Skill oficial Google? | Não — agregação autoral de guidelines oficiais |
| 7 princípios de design | Inclusive Design (web.dev) |
| 10 heurísticas | Accessibility Heuristics (Google/Deque) |
| APIs modernas | View Transitions, Popover, Anchor Positioning, scrollbar-color |
| Padrão de cor | WCAG AA mínimo, AAA recomendado |
| Respeita `prefers-reduced-motion`? | Sim, regra explícita |
| Combina com Chrome DevTools MCP? | Sim, recomendado |
