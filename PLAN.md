PR 1 — Design Tokens and Theme Foundation

Scope & Rationale
- Introduce a cohesive token system (colors, spacing, radii, shadows, motion, z-index, typography) as CSS variables.
- Provide light, dark, and high-contrast role mappings without altering business logic or page routes.
- Ensure backward compatibility by mapping existing variable names to new role tokens to avoid breaking current CSS.
- Establish an accessible focus-ring baseline.

Changes in this PR
- Added `/design/tokens.json` (authoritative token source for palettes/scales).
- Added `/src/styles/theme.css` (CSS variables: palettes, roles, modes, focus ring, minimal utilities).
- Imported theme file early in `src/index.js`.
- Authored `AUDIT.md` and `MIGRATION.md` to guide subsequent refactors.

Out of Scope (future PRs)
- Refactor component CSS to rely exclusively on tokens.
- Add UI primitives in `/ui/*` and storybook entries.
- Normalize typography sizes and remove ad-hoc inline styles.
- Replace outline: none patterns and align z-index usage to tokens.

Validation
- App builds and runs without visual regressions.
- Existing light/dark toggles work; high-contrast class supported.
- Axe checks for focus visibility improve due to focus-visible rule.

---
PR 2 — ThemeService alignment + A11y Utility

Scope & Rationale
- Align ThemeService with the token-based theming model: stop mutating per-color CSS variables and only toggle body theme classes. This ensures a single source of truth lives in CSS tokens.
- Fix AppStateContext’s theme integration to use theme names ('light'|'dark'|'auto'|'high-contrast') and expose a boolean `isDarkMode` derived from the effective theme.
- Add a reusable `.focus-ring` utility for places that need explicit focus styling.

Changes
- Refactor `src/services/ThemeService.js` strategies to only toggle classes and return empty properties for compatibility (no runtime hex assignments).
- Update `src/contexts/AppStateContext.js` to await initial theme, map to boolean, and call `applyTheme(name)` with a valid theme name rather than booleans.
- Add `.focus-ring` utility to `src/styles/theme.css`.

Risk/Impact
- Visuals remain driven by existing CSS variables/tokens; minimal regression risk.
- Any code previously reading `ThemeService.getThemeProperties()` still works but returns empty map; no known callers outside ThemeService.

Next
- PR 3: Typography foundation (apply tokenized type scale; remove ad‑hoc 10px base; set vertical rhythm and max line length).
- PR 4: Normalize `TabSystem.css` shadows/radii/filters to tokens and reduce backdrop-filter usage for perf.

---
PR 3 — Typography Foundation

Scope & Rationale
- Replace ad-hoc 10px base and uniform 15px headings in `src/index.css` with tokenized typography roles from `src/styles/theme.css`.
- Improve readability and a11y by using a 16px body size, appropriate line-heights, and consistent heading hierarchy. Add a `u-prose` utility for readable content width.

Changes
- Update `src/index.css` to:
  - Set body `font-size` to `var(--font-body)` and `line-height` to `var(--lh-body)`.
  - Map `h1..h6` to token scale `--font-h*-size` and `--font-h*-lh` with consistent margins.
  - Normalize paragraph text to `var(--font-body)`.
  - Use tokenized colors for the skip link and z-index token instead of `10000`.
- Extend `src/styles/theme.css` with border width tokens and a `.u-prose` utility.

Risk/Impact
- Components using `1rem` will scale with the 16px base; verify critical layouts. Mobile iOS zoom prevention remains intact.

Next
- PR 4: `TabSystem.css` normalization (reduce filters/backdrop-filter; replace ad-hoc shadows/radii/spacing with tokens; align z-index to tokens).

---
PR 4 — TabSystem Chrome Normalization

Scope & Rationale
- Normalize the global chrome (`src/TabSystem.css`) to design tokens for consistency and performance without altering routes or flows.

Changes
- Tabs bar: tokenized borders (`var(--divider)`), z-index (`var(--z-header)`), radius (`var(--radius-xl)`), and simplified shadows (`var(--shadow-md)`). Reduced glass blur from 20px to 8px and saturation to 110%.
- Logo glow: reduced drop-shadow intensity and replaced raw rgba with token-based `color-mix` using `--primary`.
- Radii: replaced literal radii (2px, 8px, 16px, 20px, 24px) with `--radius-*` equivalents.
- Backdrop blur: standardized other occurrences to 8–12px with moderate saturation to reduce GPU cost.

Impact
- Visual language becomes more cohesive; glassmorphism remains but lighter, aiding perf (paint/composite).
- Z-index, spacing, and radii align to tokens, easing future maintenance.

Next
- Sweep remaining drop-shadow and bespoke box-shadows to `--shadow-*` tokens.
- Normalize remaining page sections and Tools CSS to role tokens and spacing scale.

---
PR 5 — Page Sweeps (Initial 3 pages)

Scope & Rationale
- Adopt tokens and a11y conventions in a representative set of pages: LeftBrain/AboutMe, RightBrain/Psychology, and Tools/DiffChecker. Keep visuals familiar while removing hard-coded values.

Changes
- AboutMe: Replaced local `:root` hex palette with mappings to global tokens; aligned container font/spacing to tokenized foundation.
  - File: `src/LeftBrain/AboutMe/AboutMe.css`
- Psychology: Replaced violet hexes (e.g., `#8B5CF6`, `#A855F7`, `#E9D5FF`) with role/brand tokens and color-mix for soft backgrounds; kept gradients but tokenized.
  - File: `src/RightBrain/Psychology/Psychology.css`
- DiffChecker tool: Tokenized hover colors via `color-mix` and swapped success/danger hexes for tool vars; improved focus ring to use `--shadow-focus`; normalized chip radii.
  - File: `src/Tools/DiffChecker/DiffChecker.css`

Risk/Impact
- Visuals preserved with token equivalents; dark-mode now adapts via role tokens.

Next
- Continue sweeps across other prominent pages (Drawing, SystemDesign, JSONTool) and centralize remaining `--tool-*` variables to map from design tokens.

---
PR 6 — Tools Theme Bridge

See summary in the handoff: mapped `src/Tools/shared-styles.css` to tokens for full theme parity across tools.

---
PR 7 — Shared Styles Bridge

Bridged LeftBrain/RightBrain shared styles to tokens, aligned container typography, and removed local z-index schemes.

---
PR 8 — Page Sweeps II (3 more pages)

Scope & Rationale
- Apply tokens and a11y improvements to: LeftBrain/SystemDesign, RightBrain/Drawing, Tools/JSONTool.

Changes
- SystemDesign: Green accents → `--success` tokens; critical/database states use `--danger`/`--brand-*`; soft tints via `color-mix`.
  - File: `src/LeftBrain/SystemDesign/SystemDesign.css`
- Drawing: Container typography/spacing tokenized; hero tints from brand/accent tokens; Wikipedia button uses success gradient tokens.
  - File: `src/RightBrain/Drawing/Drawing.css`
- JSONTool: Inputs/pre/tree styles use tokens; focus-visible uses `--shadow-focus`; semantic colors from `--tool-*` bridge.
  - File: `src/Tools/JSONTool/JsonTool.css`

Impact
- Dark-mode and theme parity improve; focus visibility consistent; spacing/radii/shadows standardized.

 Next
 - Continue page sweeps (e.g., LeftBrain/SystemDesign details, RightBrain/Literature, Tools/XMLTool/CSVTool) and replace remaining raw colors/focus overrides.

---
PR 9 — A11y Focus Pass I

Tokenized focus-visible rings for UUID, YAML, Regex, Password, NumberToUnicode, and base tool inputs.

---
PR 10 — A11y Focus Pass II

Extended focus-visible updates to YouTubeDownloader, APITool, CSVTool, StorageTool, EmojiPicker, MacOSAppCatalog, ColorPicker, QRCodeTool, and LaTeXRenderer.

---
PR 11 — Page Sweeps III

Scope & Rationale
- Apply tokens and a11y improvements to: RightBrain/Literature, Tools/XMLTool, and confirm LeftBrain/NodeJS requires no custom CSS.

Changes
- Literature: Ratings stars now use semantic tokens (`--warning` for filled, `--divider` for empty) instead of raw hex.
  - File: `src/RightBrain/Litlerature/Literature.css`
- XMLTool: Added tokenized focus-visible to select/textarea; replaced hover color with `color-mix` on `--accent-color`.
  - File: `src/Tools/XMLTool/XmlTool.css`
- NodeJS: No additional custom styles needed; inherits from shared tokens.

Impact
- Further reduces raw hex usage; improves consistent, accessible focus styling.

---
PR 12 — Shadow Normalization (targeted)

Scope & Rationale
- Replace bespoke rgba box-shadows in highly visible tools with tokenized `--shadow-*` for consistency and better theme parity.

Changes
- YouTubeDownloader: Use `--shadow-sm|md` for thumbnails, result cards, and hover shadows.
  - File: `src/Tools/YouTubeDownloader/YouTubeDownloader.css`
- StorageTool: Button base/hover and item hover shadows now use `--tool-shadow-sm|md`.
  - File: `src/Tools/StorageTool/StorageTool.css`
- ColorPicker: Container, display, and input hover shadows use `--tool-shadow-sm|md`.
  - File: `src/Tools/ColorPicker/ColorPickerTool.css`
- QRCodeTool: Button hover shadows tokenized; hover colors use `color-mix` over semantic tokens.
  - File: `src/Tools/QRCodeTool/QRCodeTool.css`

Impact
- Visuals remain familiar while unifying elevation across the app.

---
PR 13 — Stylelint Setup

Scope & Rationale
- Add Stylelint to enforce baseline CSS quality and enable future token rules.

Changes
- Added `.stylelintrc.json` extending `stylelint-config-standard` with relaxed specificity rule.
- Added `.stylelintignore` to skip `node_modules/`, `build/`, `public/`, `attached_assets/`.
- Updated `package.json` with scripts: `lint:css`, `lint:css:fix` and devDependencies for Stylelint.

Next
- Optionally add plugins to enforce token usage for colors/shadows/radii once raw hex/shadows are fully migrated.

---
PR 14 — CI: Stylelint Workflow

Scope & Rationale
- Add a GitHub Action to run Stylelint on pushes and PRs affecting CSS or lint config, providing continuous feedback and preventing regressions.

Changes
- Added `.github/workflows/stylelint.yml` to install deps and run `npm run lint:css` on Node 20 with npm cache.

Next
- Extend CI later with Axe and Lighthouse checks for key routes once budgets are set.

---
PR 15 — New Primitives (Checkbox, Radio, Switch, Alert)

Scope & Rationale
- Add foundational, tokenized primitives to expand coverage beyond Button/Input/Select/Textarea/Card/Tag. Ensure a11y, sizing, and variants align with the design system.

Changes
- Added components with tokenized CSS and focus-visible styles: `Checkbox`, `Radio`, `Switch`, `Alert`.
- Exported from `src/ui/index.js` and created Storybook stories for each.

Next
- Migrate forms to use these primitives; add `Table`, `Tooltip`, `Toast`, `Breadcrumb`, `Pagination` primitives next.

---
PR 16 — New Primitives (Table, Tooltip)

Scope & Rationale
- Add a tokenized `Table` with sortable headers, zebra rows, and density options; add accessible `Tooltip` with keyboard support and position variants.

Changes
- `src/ui/Table.{js,css,stories.jsx}`: semantic table with optional sorting (aria-sort), focus styles on sort buttons, zebra rows and compact density.
- `src/ui/Tooltip.{js,css,stories.jsx}`: role=tooltip bubble that appears on hover/focus; positions top/right/bottom/left.
- Updated exports in `src/ui/index.js`.

Next
- Add `Breadcrumb`, `Pagination`, and `Toast`; migrate key pages to use `Table` where applicable (e.g., data lists).

---
PR 17 — New Primitives (Breadcrumb, Pagination, Toast)

Scope & Rationale
- Complete core navigation and notification primitives to meet acceptance criteria and improve a11y and cohesion.

Changes
- Breadcrumb: `src/ui/Breadcrumb.{js,css,stories.jsx}` with proper `nav[aria-label="Breadcrumb"]`, separators, current page with `aria-current`.
- Pagination: `src/ui/Pagination.{js,css,stories.jsx}` with keyboard focus rings, ellipsis ranges, previous/next controls and `aria-current`.
- Toast: `src/ui/ToastProvider.{js,css,stories.jsx}` with `useToast()` API and variants (info/success/warning/danger), polite live region.
- Updated exports in `src/ui/index.js`.

Next
- Add `Tabs`, `Modal/Sheet/Drawer`, and `Toast` usage migration across pages; start replacing ad-hoc pagination and breadcrumbs.

---
PR 18 — New Primitives (Tabs, Modal, Sheet, Drawer)

Scope & Rationale
- Round out the primitives to hit acceptance criteria: accessible tabs (keyboard nav), and basic overlays (modal, side sheet, bottom drawer) with tokens and a11y semantics.

Changes
- Tabs: `src/ui/Tabs.{js,css,stories.jsx}` with `role="tablist"`, `role="tab"`, `role="tabpanel"`, arrow-key navigation, focus rings, and vertical/horizontal layout.
- Modal: `src/ui/Modal.{js,css,stories.jsx}` with `role="dialog"` + `aria-modal`, overlay click/Escape to close, tokenized surface.
- Sheet: `src/ui/Sheet.{js,css,stories.jsx}` sliding panel (left/right) using tokens.
- Drawer: `src/ui/Drawer.{js,css,stories.jsx}` bottom drawer with tokens.
- Updated exports in `src/ui/index.js`.

Next
- Migrate select pages to these primitives (replace ad-hoc tab/overlay patterns). Add Nav + Footer primitives or align existing app chrome to tokens.
