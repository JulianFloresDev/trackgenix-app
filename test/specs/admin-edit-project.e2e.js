const LandingPage = require('../pageobjects/landing.page');
const LoginPage = require('../pageobjects/login.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');
const ProjectsFormPage = require('../pageobjects/form-projects.page');
const ProjectsListPage = require('../pageobjects/projects-list.page');

describe('Edit projects', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('Edited a project successfully.', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('agus@admin.com', 'agus12345');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectProjects.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/projects');
    await ProjectsListPage.editButton.click();
    await ProjectsFormPage.formData.waitForDisplayed({ timeout: 3000 });
    await ProjectsFormPage.dataProject(
      'test',
      'edited',
      '20-12-2022',
      '30-12-2022',
      'Pedro',
      '500',
      '100'
    );
    await ProjectsFormPage.modalConfirmation.waitForDisplayed({ timeout: 6000 });
    await expect(ProjectsFormPage.modalConfirmation).toHaveTextContaining(
      'Project edited successfully!'
    );
    await ProjectsFormPage.backProjects.click();
    await HomePageLogged.logOutButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
  });
});
