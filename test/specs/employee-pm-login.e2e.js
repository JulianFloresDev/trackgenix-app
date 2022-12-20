const LoginPage = require('../pageobjects/login.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');
const LandingPage = require('../pageobjects/landing.page');

describe('The admin should log in.', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('Login with all empty fields', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('', '');
    await LoginPage.errorEmailEmptyOne.waitForDisplayed({ timeout: 1000 });
    await expect(LoginPage.errorEmailEmptyOne).toHaveTextContaining('Email is required');
    await LoginPage.errorPasswordEmptyOne.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.errorPasswordEmptyOne).toHaveTextContaining('Password is required');
  });

  it('Login with email empty field', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('', 'tester12345');
    await LoginPage.errorEmailEmptyOne.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.errorEmailEmptyOne).toHaveTextContaining('Email is required');
  });

  it('Login with password empty field', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('test@tester.com', '');
    await LoginPage.passwordErrorMessage.waitForDisplayed();
    await expect(LoginPage.passwordErrorMessage).toHaveTextContaining('Password is required');
  });

  it('Login with email invalid format', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('asda @as!!', 'tester12345');
    await LoginPage.errorFormatEmail.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.errorFormatEmail).toHaveTextContaining('Invalid email format');
  });

  it('Login with password invalid format', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('test@tester.com', 'test 123 @!');
    await LoginPage.errorFormatPassword.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.errorFormatPassword).toHaveTextContaining(
      'Password must be letters and numbers only'
    );
  });

  it('Login with all invalid format fields', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('asda @as!!', 'test 123 @!');
    await LoginPage.errorFormatEmail.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.errorFormatEmail).toHaveTextContaining('Invalid email format');
    await LoginPage.errorFormatPasswordTwo.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.errorFormatPasswordTwo).toHaveTextContaining(
      'Password must be letters and numbers only'
    );
  });

  it('Login with unregistered email', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('juanperez@radium.com', 'tester12345');
    await LoginPage.modalErrorCredentials.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.modalErrorCredentials).toHaveTextContaining(
      'There was an error whit Login data!!'
    );
    await LoginPage.exitModal.click();
  });

  it('Login with unregistered password', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('test@tester.com', 'test1234567');
    await LoginPage.modalErrorCredentials.waitForDisplayed({ timeout: 2000 });
    await expect(LoginPage.modalErrorCredentials).toHaveTextContaining(
      'There was an error whit Login data!!'
    );
    await LoginPage.exitModal.click();
  });

  it('Login successfully', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('pepito@employee.com', '12345employee');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.namePersonLogged.waitForDisplayed({ timeout: 2000 });
    await expect(HomePageLogged.namePersonLogged).toHaveTextContaining('Pepito Pepito');
    await HomePageLogged.entityLogged.waitForDisplayed({ timeout: 2000 });
    await expect(HomePageLogged.entityLogged).toHaveTextContaining('Employee');
    await HomePageLogged.logOutButton.click();
  });
});
