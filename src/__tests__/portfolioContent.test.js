import portfolioContent from '../content/portfolioContent';

describe('portfolioContent — trustworthy personal claims surface', () => {
  it('exports the required editorial sections', () => {
    expect(portfolioContent.identity.name).toBe('Mohammad Aatif Shaikh');
    expect(portfolioContent.lede.body.length).toBeGreaterThan(0);
    expect(portfolioContent.experience.length).toBeGreaterThan(0);
    expect(portfolioContent.education.length).toBeGreaterThan(0);
    expect(portfolioContent.leadership.length).toBeGreaterThan(0);
    expect(portfolioContent.contact.email).toBe('mohammadaatif@usf.edu');
  });

  it('limits selected work to Reliu and NazScan', () => {
    expect(portfolioContent.selectedWork).toHaveLength(2);
    expect(portfolioContent.selectedWork.map((work) => work.name)).toEqual(['Reliu', 'NazScan']);
  });

  it('positions Reliu as zero to TestFlight-ready', () => {
    const reliu = portfolioContent.selectedWork.find((work) => work.id === 'reliu');

    expect(reliu.status).toMatch(/zero to testflight-ready/i);
    expect(reliu.summary).toMatch(/TestFlight-ready build in 3 days/i);
  });

  it('positions NazScan as a one-command scanner for vibe-coded repos', () => {
    const nazscan = portfolioContent.selectedWork.find((work) => work.id === 'nazscan');

    expect(nazscan.summary).toMatch(/one-command security scanner for vibe-coded repos/i);
    expect(nazscan.status).toMatch(/active development/i);
  });

  it('does not reintroduce unsupported selected-work placeholders', () => {
    const serialized = JSON.stringify(portfolioContent.selectedWork).toLowerCase();

    expect(serialized).not.toMatch(/medflow/);
    expect(serialized).not.toMatch(/rush/);
    expect(serialized).not.toMatch(/stock/);
    expect(serialized).not.toMatch(/linkedinwrapped/);
    expect(serialized).not.toMatch(/lawyerup/);
    expect(serialized).not.toMatch(/autoscaler/);
  });
});
