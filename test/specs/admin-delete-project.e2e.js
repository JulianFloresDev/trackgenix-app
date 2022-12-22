const LandingPage = require('../pageobjects/landing.page');
const LoginPage = require('../pageobjects/login.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');
const ProjectsListPage = require('../pageobjects/projects-list.page');

describe('Delete Project', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });
  it('should deleted project successfully', async () => {
    await LandingPage.loginButton.click();
    await LoginPage.login('agus@admin.com', 'agus12345');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectProjects.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/projects');
    await ProjectsListPage.deleteButton.click();
    await ProjectsListPage.modalDeleteConfirmation.waitForDisplayed({ timeout: 8000 });
    await expect(ProjectsListPage.modalDeleteConfirmation).toHaveTextContaining(
      'You are trying to delete some PROJECT'
    );
    await ProjectsListPage.deleteButtonConfirmation.click();
    await ProjectsListPage.deleteSuccessfully.waitForDisplayed({ timeout: 8000 });
    await expect(ProjectsListPage.deleteSuccessfully).toHaveTextContaining(
      'Project Deleted Successfully!'
    );
    await ProjectsListPage.exitModal.click();
    await HomePageLogged.logOutButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await browser.refresh();
  });
});
