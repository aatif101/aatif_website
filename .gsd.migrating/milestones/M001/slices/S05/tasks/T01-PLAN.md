---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T01: Create maintainable cool things content

Create editable cool-items content with 3 tasteful placeholder seed entries marked as replaceable until the user sends the real list. Keep the content model simple: title, url, caption, optional kind. Do not hard-code the entries across components.

## Inputs

- None specified.

## Expected Output

- `src/content/coolThings.js`

## Verification

npm run build

## Observability Impact

Single content file lets future agents or the user replace placeholder taste links safely.
