const LoginPage = require('../pageobjects/login.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');
const LandingPage = require('../pageobjects/landing.page');
const ProfilePage = require('../pageobjects/profile.page');

describe('Delete account employee', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('The employee deletes his account', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('aaron@radium.com', '12345employee');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectProfile.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/profile');
    await ProfilePage.formProfile.waitForDisplayed();
    await ProfilePage.deleteButton.click();
    await ProfilePage.modalConfirmationDelete.waitForDisplayed();
    await ProfilePage.deleteButtonConfirmation.click();
    await ProfilePage.succesMessage.waitForDisplayed();
    await expect(ProfilePage.succesMessage).toHaveTextContaining('Employee deleted successfully!');
    await ProfilePage.exitMessage.click();
    await HomePageLogged.logOutButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('The employee deletes his account', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('baustista@radium.com', '12345employee');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectProfile.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/profile');
    await ProfilePage.formProfile.waitForDisplayed();
    await ProfilePage.deleteButton.click();
    await ProfilePage.modalConfirmationDelete.waitForDisplayed();
    await ProfilePage.deleteButtonConfirmation.click();
    await ProfilePage.succesMessage.waitForDisplayed();
    await expect(ProfilePage.succesMessage).toHaveTextContaining('Employee deleted successfully!');
    await ProfilePage.exitMessage.click();
    await HomePageLogged.logOutButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
  });
});
