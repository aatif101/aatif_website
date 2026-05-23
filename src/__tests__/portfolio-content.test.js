import portfolioContent from '../content/portfolioContent';

const flattenContentText = (value) => JSON.stringify(value).toLowerCase();

describe('portfolio content integrity guard', () => {
  it('keeps selected work constrained to the approved project names', () => {
    expect(portfolioContent.selectedWork.map((work) => work.name)).toEqual(['Reliu', 'NazScan']);
  });

  it('keeps experience constrained to the approved organization names', () => {
    expect(portfolioContent.experience.map((item) => item.organization)).toEqual([
      'Pfizer',
      'CacheAi',
      'USF IT',
      'Mozilla',
      'Infrastructure Docs Collective',
    ]);
  });

  it('rejects hallucinated companies from prior placeholder drafts', () => {
    const contentText = flattenContentText(portfolioContent);

    ['equitar', 'triedata', 'fovus', 'blink'].forEach((unsupportedCompany) => {
      expect(contentText).not.toContain(unsupportedCompany);
    });
  });

  it('does not expose a standalone Skills section label in the content model', () => {
    const allStringValues = [];

    const collectStringValues = (value) => {
      if (typeof value === 'string') {
        allStringValues.push(value);
        return;
      }

      if (Array.isArray(value)) {
        value.forEach(collectStringValues);
        return;
      }

      if (value && typeof value === 'object') {
        Object.values(value).forEach(collectStringValues);
      }
    };

    collectStringValues(portfolioContent);

    expect(allStringValues).not.toContain('Skills');
  });
});
