import { SanluAppPage } from './app.po';

describe('sanlu-app App', () => {
  let page: SanluAppPage;

  beforeEach(() => {
    page = new SanluAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
