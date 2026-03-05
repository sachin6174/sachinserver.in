---
description: commit, push, and deploy to production server after completing a feature
---

## Ground Rules (from .antigravityrules — always apply)

- **Senior engineer standard**: Write production-quality code. No shortcuts, no hacks.
- **Never ship bugs**: Before committing, verify the feature works locally and no existing functionality is broken. If there is any doubt, investigate and fix first.
- **Always use agents**: Use agents available at `/Users/sachinkumar/.claude/agents` for every task — don't do manually what an agent can handle.

---

## Pre-Deploy Quality Gate (mandatory before every commit)

Before staging files, confirm ALL of the following:

- [ ] The new feature works correctly in the local dev server (`npm run dev`)
- [ ] No existing pages/tools are broken (spot-check at least the active tab)
- [ ] No console errors introduced by the change
- [ ] Code follows the project's existing patterns (component structure, CSS variables, lazy loading)
- [ ] No `// TODO` or debug `console.log` left in production code

> ⚠️ If any check above fails — **stop, fix the issue first, then continue**.

---

## Deploy Steps

// turbo-all

1. Stage all changes
```
git add -A
```

2. Commit with a descriptive conventional commit message (e.g. `feat: Add X` or `fix: Resolve Y`)
```
git commit -m "<message>"
```

3. Push to GitHub
```
git push origin main
```

4. Deploy to production server
```
/Users/sachinkumar/Desktop/sachinserver.in/updatesachinserver.sh
```

Wait for PM2 to show `status: online` before declaring success. The build takes 2–4 minutes on the server.
