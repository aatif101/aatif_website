---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T03: Guard against unsupported personal content

Add a content integrity test that imports portfolioContent and verifies the allowed project and experience names while rejecting known hallucinated companies from prior discussion: Equitar, Triedata, Fovus, and Blink. Also verify there is no standalone Skills section label in the content model.

## Inputs

- `src/content/portfolioContent.js`

## Expected Output

- `src/__tests__/portfolio-content.test.js`

## Verification

npm test -- --watchAll=false --testPathPattern=portfolio-content

## Observability Impact

The test names unsupported claims directly so future drift fails loudly.
