UI Audit — Initial Pass (PR 1)

Summary
- Stack: CRA (react-scripts 5), React 19, plain CSS.
- Theming: body class toggles (light/dark), ThemeService strategies. Many CSS variables already present but inconsistent naming across files.
- Surfaces: Main shell `src/TabSystem.js` + `src/TabSystem.css` drives global look; many feature areas under LeftBrain/RightBrain/Tools with their own CSS.

Key Findings
- Hard-coded colors: present across ThemeService and multiple feature CSS files. Examples:
  - src/index.css: fallback values `#fff`, `#333`, code blocks `#f4f4f4`, `#2d2d2d`, `#ff6b9d`.
  - src/services/ThemeService.js: sets many hex values per theme.
  - Feature CSS (e.g., Psychology.css) uses raw brand-like purples `#8B5CF6`, etc.
- Shadow inconsistency: mixture of custom rgba shadows and variable-driven shadows. Many ad-hoc shadows in feature CSS.
- Radius inconsistency: wide range from 2px to 16px and more; no single scale.
- Spacing: mixed fixed pixel paddings/margins throughout components; no app-wide scale.
- Transitions/motion: numerous different durations and easings; no shared tokens; heavy backdrop-filter and gradients in TabSystem.
- Focus a11y: multiple files set `outline: none;`; missing visible focus patterns.
- Z-index: unscoped large numbers up to 10000; no tokenized layers.
- Inline styles: common across feature components for spacing/color; risks style drift and a11y.

Diff Risk Map
- Very High: src/TabSystem.css (site chrome, tokens, gradients, shadows), src/index.css (global typography + base), src/services/ThemeService.js (theming contract).
- High: src/styles/site.css and shared-styles under LeftBrain/RightBrain (cross-section layouts, cards).
- Medium: Tools/** CSS (numerous utilities, repeated patterns); feature pages using inline styles.
- Low: Leaf components already referencing CSS custom properties.

Immediate Recommendations (this PR)
- Establish single source of truth for tokens and roles via CSS variables.
- Provide dark/high-contrast roles; add a global focus-visible style.
- Add compatibility mapping so existing `--background-color`, `--primary-color`, etc. resolve to tokens.

Next PR Targets
- Normalize `TabSystem.css` to use role tokens only; reduce glass/filters for performance.
- Replace outline: none occurrences with compliant focus-ring.
- Start refactoring feature CSS to semantic tokens (colors, radius, shadows, spacing).
- Add primitive components `/ui/*` with tokenized variants.

