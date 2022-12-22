const LoginPage = require('../pageobjects/login.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');
const LandingPage = require('../pageobjects/landing.page');
const TimeSheetsListPage = require('../pageobjects/time-sheets-list.page');
const TimeSheetsFormPage = require('../pageobjects/time-sheets-form.page');

describe('Track hours', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('The employee should be able to added their hours successfully..', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/auth/login'
    );
    await LoginPage.login('aaron@radium.com', '12345employee');
    await expect(browser).toHaveUrlContaining('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectTimeSheets.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/time-sheets'
    );
    await TimeSheetsListPage.addTimeSheetButton.click();
    await TimeSheetsFormPage.formDataTimeSheet.waitForDisplayed({ timeout: 8000 });
    await TimeSheetsFormPage.dataTimesheet('21-12-2022', 'Testing', '12');
    await TimeSheetsFormPage.succesMessage.waitForDisplayed({ timeout: 8000 });
    await expect(TimeSheetsFormPage.succesMessage).toHaveTextContaining(
      'Time Sheet created successfully!'
    );
    await TimeSheetsFormPage.backTimeSheets.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/time-sheets'
    );
    await HomePageLogged.logOutButton.click();
  });

  it('The employee should be able to edited their hours successfully..', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/auth/login'
    );
    await LoginPage.login('aaron@radium.com', '12345employee');
    await expect(browser).toHaveUrlContaining('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectTimeSheets.click();
    await TimeSheetsFormPage.formDataTimeSheet.waitForDisplayed({ timeout: 8000 });
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/time-sheets'
    );
    await TimeSheetsListPage.editButton.click();
    await TimeSheetsFormPage.formDataTimeSheet.waitForDisplayed({ timeout: 3000 });
    await TimeSheetsFormPage.dataTimesheet('21-12-2022', 'Testing automation', '6');
    await TimeSheetsFormPage.succesMessage.waitForDisplayed({ timeout: 8000 });
    await expect(TimeSheetsFormPage.succesMessage).toHaveTextContaining(
      'Time Sheet edited successfully!'
    );
    await TimeSheetsFormPage.backTimeSheets.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/time-sheets'
    );
    await HomePageLogged.logOutButton.click();
  });

  it('The employee should be able to deleted their hours successfully..', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/auth/login'
    );
    await LoginPage.login('aaron@radium.com', '12345employee');
    await expect(browser).toHaveUrlContaining('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectTimeSheets.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/time-sheets'
    );
    await TimeSheetsListPage.deleteButton.click();
    await TimeSheetsListPage.confirmDeleteModal.waitForDisplayed({ timeout: 8000 });
    await TimeSheetsListPage.confirmDeleteButton.click();
    await TimeSheetsListPage.succesMessage.waitForDisplayed({ timeout: 8000 });
    await expect(TimeSheetsListPage.succesMessage).toHaveTextContaining(
      'Time Sheet deleted successfully!'
    );
    await TimeSheetsListPage.exitMessage.click();
    await expect(browser).toHaveUrlContaining(
      'https://alfon-a-trackgenix-app.vercel.app/time-sheets'
    );
    await HomePageLogged.logOutButton.click();
  });
});
