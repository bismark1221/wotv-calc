import { WotvCalcPage } from './app.po';

describe('wotv-chain App', () => {
  let page: WotvCalcPage;

  beforeEach(() => {
    page = new WotvCalcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
