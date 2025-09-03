# Storybook Setup

This repo includes component stories for the tokenized UI primitives in `src/ui/*`. To run them locally:

## Install (once)

```
npm i -D @storybook/react-webpack5 @storybook/addon-essentials @storybook/addon-a11y storybook
```

## Start Storybook

```
npm run storybook
```

Storybook will open at http://localhost:6006.

## Build static storybook

```
npm run build-storybook
```

The static site will be output to `storybook-static/`.

## Notes
- Stories import the app’s theme at `.storybook/preview.js` so CSS variables and focus styles match the app.
- Light/dark can be previewed by toggling the `dark-mode` class on `document.body` in the browser console.
- Primitives covered: Button, Input, Select, Textarea, Card.

