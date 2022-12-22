const LandingPage = require('../pageobjects/landing.page');
const LoginPage = require('../pageobjects/login.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');
const AdminsListPage = require('../pageobjects/admins-list.page');

describe('Super admins delete functionalitie', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('should deleted admin successfully', async () => {
    await LandingPage.loginButton.click();
    await LoginPage.login('ana@super-admin.com', '12345superadmin');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectAdmins.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/admins');
    await AdminsListPage.deleteButton.click();
    await AdminsListPage.modalDelete.waitForDisplayed({ timeout: 8000 });
    await AdminsListPage.confirmDelete.click();
    await AdminsListPage.successMessage.waitForDisplayed({ timeout: 8000 });
    await expect(AdminsListPage.successMessage).toHaveTextContaining('Admin Deleted Successfully!');
    await AdminsListPage.exitModal.click();
    await HomePageLogged.logOutButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await browser.refresh();
  });
});
