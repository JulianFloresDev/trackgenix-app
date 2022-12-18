const LandingPage = require('../pageobjects/landing.page');
const SignUpPage = require('../pageobjects/sign-up.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');

describe('Create new employee', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('A successful employee should be created.', async () => {
    await LandingPage.signupButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/sign-up');
    await SignUpPage.signUp(
      'Test',
      'Testtest',
      'test@algo.com',
      '12345employee',
      '1234567',
      '123456789',
      'test 1234'
    );
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.logOutButton.click();
  });
});
