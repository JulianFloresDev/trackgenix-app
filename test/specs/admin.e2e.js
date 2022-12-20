const LandingPage = require('../pageobjects/landing.page');
const LoginPage = require('../pageobjects/login.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');
const ProjectsFormPage = require('../pageobjects/form-projects.page');
const ProjectsListPage = require('../pageobjects/projects-list.page');

describe('Create a new project', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('Create a new project.', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('agus@admin.com', 'agus12345');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectProjects.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/projects');
    await ProjectsListPage.addProjectsButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/projects/form/0');
    await ProjectsFormPage.newProject(
      'test',
      'tester',
      '20-12-2022',
      '30-12-2022',
      'Ramon',
      '200',
      '200'
    );
  });
});
