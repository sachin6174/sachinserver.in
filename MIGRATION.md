Migration Guide — Tokens and Theme

Overview
This guide helps migrate styles to the new token and role-based variables without breaking existing components.

Compatibility Mapping (no code changes required)
- Existing variable names now resolve to role tokens via `src/styles/theme.css`:
  - `--background-color` → `--bg`
  - `--text-color` → `--text`
  - `--card-background` → `--surface`
  - `--border-color` / `--border-color-light` → `--border` / `--divider`
  - `--hover-background` / `--active-background` → `--surface-hover` / `--surface-active`
  - `--primary-color` / `--primary-color-dark` → `--primary` / `--brand-700`
  - `--secondary-color` / `--secondary-color-dark` → `--accent` / `--secondary-700`
  - `--success-color` / `--warning-color` / `--error-color` / `--info-color` → `--success` / `--warning` / `--danger` / `--info`
  - `--code-background` / `--pre-background` → `--code-bg` / `--surface-2`

Recommended Refactors (next PRs)
- Colors: Replace hard-coded hex colors with semantic roles, e.g. `color: var(--text-secondary)`; backgrounds with `var(--surface)`.
- Spacing: Use scale tokens for padding/margins: `var(--space-2|3|4|6|8)`.
- Radius: Use `--radius-xs|sm|md|lg|xl|2xl` consistently.
- Shadows: Use `--shadow-sm|md|lg|xl`; do not create ad-hoc rgba shadows.
- Motion: Use `--duration-*` and `--ease-*`; respect `prefers-reduced-motion`.
- Z-index: Replace raw values with CSS vars: `z-index: var(--z-modal)` etc.

Focus & A11y
- Avoid `outline: none;` unless replacing with a clearly visible ring. Prefer relying on the global rule:
  `:focus-visible { box-shadow: var(--shadow-focus); }`
- Ensure interactive elements are proper semantics (<button>, <a>) and maintain a 44×44px target on touch.

High-Contrast Support
- To preview: add `high-contrast-mode` to the body (e.g., `document.body.classList.add('high-contrast-mode')`).
- In this mode, shadows and animations are minimized; ensure sufficient contrast and focus visibility.

Examples
- Before: `background: #fff; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,.06);`
- After:  `background: var(--surface); border-radius: var(--radius-sm); box-shadow: var(--shadow-md);`
ThemeService Changes (PR 2)

- Previous behavior: ThemeService strategies wrote raw hex values into CSS custom properties like `--background-color`, `--primary-color`, etc. This could override role tokens and fragment the source of truth.
- New behavior: ThemeService only toggles `body` classes: `light-mode`, `dark-mode`, `high-contrast-mode`. All visual roles are defined in `src/styles/theme.css`.
- AppStateContext now:
  - Reads the initial theme name via `getInitialTheme()` (async), derives a boolean `isDarkMode` from the effective theme, and calls `applyTheme(themeName)`.
  - When toggling, maps boolean to names (`dark`|`light`) and calls `applyTheme` with a valid name.

What to do if you were using ThemeService properties
- If you previously relied on `ThemeService.getThemeProperties()` to read hex values, migrate to CSS variables/tokens in styles instead.
- For JS needing the current theme, use `getCurrentTheme()` and query computed styles if needed (e.g., `getComputedStyle(document.documentElement).getPropertyValue('--primary')`).

Typography Foundation (PR 3)

TabSystem Chrome Normalization (PR 4)

- Tabs bar now uses tokens for borders (`--divider`), radius (`--radius-xl`), z-index (`--z-header`), and shadows (`--shadow-md`).
- Backdrop-filter intensities reduced (8–12px blur, ~110% saturation) to improve performance; vendor-prefixed variants updated accordingly.
- Replaced raw radii values across TabSystem with `--radius-*` tokens.
- Logo/image glow effects converted from hard-coded rgba drop-shadows to `color-mix` with `--primary` and lower intensity.

If you had CSS that assumed heavier glass or shadow
- Prefer adding local emphasis with token shadows (`--shadow-lg|xl`) rather than custom rgba stacks.
- If specific elements require stronger glow, use `--shadow-glow` or compose with `color-mix` on palette tokens.

Page Sweeps — Initial 3 Pages (PR 5)

- AboutMe: Local variables now map to tokens; prefer role tokens (`--bg`, `--surface`, `--text`, `--primary`) instead of page-specific hex values.
- Psychology: Violet accents now derive from `--primary`/brand tokens; soft backgrounds use `color-mix` with role tokens for dark-mode compatibility.
- DiffChecker: Success/danger accents use tool variables; focus rings use `--shadow-focus` for accessibility.

Guidance
- When adding new accents on pages, choose role/brand tokens first; use `color-mix` to generate subtle tints rather than raw hex.
- For interactive states, rely on the global `:focus-visible` or `.focus-ring` utility instead of removing outlines.
- Base font sizing: The global body size is now `var(--font-body)` (16px) instead of 10px. Headings `h1..h6` map to the token scale with appropriate line-heights and margins.
- Paragraphs and common text elements (`p, li, dd`) use `var(--font-body)` with `--lh-body` for readability.
- If a component relied on the old 10px base to achieve very small UI, explicitly set a tokenized size on that component (e.g., local class with `font-size: 0.875rem`) rather than depending on a tiny global base.
- For long-form content, wrap in `.u-prose` to limit line length (~72ch) for better readability.

Page Sweeps II (PR 8)

- SystemDesign: Replace hard-coded greens/reds/violets with semantic tokens (`--success`, `--danger`, `--brand-*`); for soft fills use `color-mix` with surface so dark mode looks correct.
- Drawing: Use token fonts and spacing; convert rgba brand tints in hero backgrounds to `color-mix` over brand/accent; use `--success` for green CTA buttons.
- JSONTool: Inputs and code blocks now use token borders, radii, and fonts; labels/values use `--tool-info-color`/`--tool-success-color`; textarea focus uses `--shadow-focus`.

Tip: When you need subtle backgrounds or borders, prefer `color-mix` with role tokens (e.g., `color-mix(in srgb, var(--primary) 10%, var(--surface))`) rather than introducing a new hex.

Page Sweeps III (PR 11)

- Literature: Replace star colors with tokens — use `--warning` for filled stars and `--divider` (or `--text-muted`) for empty states.
- XMLTool: Add tokenized `:focus-visible` rings to interactive controls and avoid hard-coded hover colors; use `color-mix` with `--accent-color` for hover emphasis.
- NodeJS: No-op; component inherits all shared token styles.

Stylelint Setup (PR 13)

- Run `npm run lint:css` to check CSS. Use `npm run lint:css:fix` for autofixable issues.
- Current config is conservative (extends standard, disables descending specificity). As migration progresses, we can:
  - Enable `color-no-hex` and migrate remaining hex colors to tokens.
- Add a token-enforcing plugin to restrict `box-shadow`, `border-radius`, `z-index`, and color to variables.

CI: Stylelint Workflow (PR 14)

- A GitHub Action (`.github/workflows/stylelint.yml`) runs on pushes/PRs touching CSS or lint config.
- Uses Node 20 with npm cache, runs `npm ci` then `npm run lint:css`.
- Extend later with Axe and Lighthouse once budgets are finalized.

New Primitives (PR 15)

- Checkbox: `import { Checkbox } from 'src/ui'` — use for boolean fields. Props: `label`, `hint`, `error`, `required`, `disabled`, `checked`, `onChange`.
- Radio: `import { Radio } from 'src/ui'` — use within named groups. Props: `name`, `label`, `hint`, `error`, `required`, `checked`, `onChange`.
- Switch: `import { Switch } from 'src/ui'` — for on/off toggles; keyboard and screen reader friendly via `role="switch"` and focus ring.
- Alert: `import { Alert } from 'src/ui'` — variants: `info|success|warning|danger`, optional `title`, `onClose`.

Notes
- All controls provide tokenized focus rings and map to role tokens for color; avoid custom outlines or raw hex.
- Prefer these primitives over ad-hoc inputs for consistent spacing, focus, and error states.

Additional Primitives (PR 16, PR 17)

- Table: `import { Table } from 'src/ui'`
  - Pass `columns` and `data`. Enable sorting by setting `sortable` (default true). Use `caption` for accessible description.
- Tooltip: `import { Tooltip } from 'src/ui'`
  - Wrap trigger; pass `content` and `placement`. Appears on hover and focus.
- Breadcrumb: `import { Breadcrumb } from 'src/ui'`
  - Provide `items=[{ label, href?, onClick?, current? }]`. Current page is marked with `aria-current`.
- Pagination: `import { Pagination } from 'src/ui'`
  - Control `page` and `pageCount`, handle `onPageChange`. Includes prev/next and compressed ranges.
- Toast: `import { ToastProvider, useToast } from 'src/ui'`
  - Wrap app (or Story) with `ToastProvider`, call `useToast().success('Saved')` etc.

A11y Notes
- All triggers/buttons expose visible focus rings. Avoid custom outline suppression; rely on global tokens.
