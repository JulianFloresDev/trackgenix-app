// const LoginPage = require('../pageobjects/login.page');
// const HomePageLogged = require('../pageobjects/homepage-logged.page');
// const LandingPage = require('../pageobjects/landing.page');0

// describe('Employee view projects table', () => {
//   beforeAll('Navigate URL', () => {
//     browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
//   });

//   it('We see table of assigned projects.', async () => {
//     await LandingPage.loginButton.click();
//     await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
//     await LoginPage.login('emmy@gmail.com', '12345employee');
//     await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
//     await HomePageLogged.selectProjects.click();
//     await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/projects');
//     await HomePageLogged.projectTable.waitForDisplayed();
//   });
// });
