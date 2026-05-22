---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T03: Perform live browser verification

Start the local dev server with bg_shell, verify the page in browser tools, and record explicit browser assertions: key section text visible, no console errors, no failed network requests, contact links present, and keyboard focus visible. Use browser_assert and logs rather than prose-only inspection.

## Inputs

- `package.json`

## Expected Output

- `.gsd/runtime`

## Verification

npm run build

## Observability Impact

Browser timeline, console logs, network logs, and assertions become final evidence for handoff.
