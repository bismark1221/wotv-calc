import { FfbeChainPage } from './app.po';

describe('ffbe-chain App', () => {
  let page: FfbeChainPage;

  beforeEach(() => {
    page = new FfbeChainPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
