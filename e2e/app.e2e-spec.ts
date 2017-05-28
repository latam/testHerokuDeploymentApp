import { TetHerokuDeploymentAppPage } from './app.po';

describe('tet-heroku-deployment-app App', () => {
  let page: TetHerokuDeploymentAppPage;

  beforeEach(() => {
    page = new TetHerokuDeploymentAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
