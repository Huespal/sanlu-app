import { SanlusAppPage } from './app.po';

describe('sanlus-app App', () => {
  let page: SanlusAppPage;

  beforeEach(() => {
    page = new SanlusAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
