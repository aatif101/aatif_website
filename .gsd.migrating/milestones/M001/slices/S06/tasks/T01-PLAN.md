---
estimated_steps: 1
estimated_files: 4
skills_used: []
---

# T01: Remove inactive legacy visual system from active path

Remove or quarantine old active visual-system components and dependencies that are no longer used by App.js, including MatrixRain, cosmic Header/Hero/About/Projects/Footer imports, FloatingSocialButtons active path, and framer-motion if no remaining code imports it. Use search to confirm no active imports before deleting or leaving legacy files inert.

## Inputs

- `package.json`
- `src/App.js`

## Expected Output

- `src/App.js`
- `package.json`
- `package-lock.json`

## Verification

npm run build

## Observability Impact

Build and dependency graph reveal accidental removal of still-used modules.
