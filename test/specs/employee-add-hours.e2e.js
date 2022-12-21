const LoginPage = require('../pageobjects/login.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');
const LandingPage = require('../pageobjects/landing.page');
const TimeSheetsListPage = require('../pageobjects/time-sheets-list.page');
const TimeSheetsFormPage = require('../pageobjects/time-sheets-form.page');

describe('Track hours', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('The employee should be able to charge their hours successfully..', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/auth/login'
    );
    await LoginPage.login('testemployee@radium.com', '12345employee');
    await expect(browser).toHaveUrlContaining('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectTimeSheets.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/time-sheets'
    );
    await TimeSheetsListPage.addTimeSheetButtom.click();
    await TimeSheetsFormPage.formDataTimeSheet.waitForDisplayed({ timeout: 2000 });
    await TimeSheetsFormPage.dataTimesheet('21-12-2022', 'Testing', '12');
  });
});
