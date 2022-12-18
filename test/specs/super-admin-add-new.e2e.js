const LandingPage = require('../pageobjects/landing.page');
const LoginPage = require('../pageobjects/login.page');
const HomePageLogged = require('../pageobjects/homepage-logged.page');
const AdminsListPage = require('../pageobjects/admins-list.page');
const FormPage = require('../pageobjects/form.page');

describe('Add new Admin', () => {
  beforeAll('Navigate URL', () => {
    browser.url('https://alfon-a-trackgenix-app.vercel.app/home');
  });

  it('should added admin successfully', async () => {
    await LandingPage.loginButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/auth/login');
    await LoginPage.login('ana@super-admin.com', '12345superadmin');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectAdmins.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/admins');
    await AdminsListPage.addButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/admins/form/0');
    await FormPage.createAdmin(
      'Test',
      'Automation',
      'algo@alguiyot.com',
      'Abcd1234',
      '47112225',
      '77547774',
      'Lugar 1234'
    );
    await expect(FormPage.successfullyMessage).toHaveTextContaining('Admin created successfully!');
    await FormPage.confirmButton.click();
    await HomePageLogged.logOutButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await browser.refresh();
  });

  it('should edited admin successfully', async () => {
    await LandingPage.loginButton.click();
    await LoginPage.login('ana@super-admin.com', '12345superadmin');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectAdmins.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/admins');
    await AdminsListPage.editButton.click();
    await FormPage.editAdmin(
      'Testeado',
      'Juan',
      'algo@alguien.com',
      '47112225',
      '77547774',
      'Lugar 1234'
    );
    await expect(FormPage.successfullyMessage).toHaveTextContaining('Admin edited successfully!');
    await FormPage.confirmButton.click();
    await HomePageLogged.logOutButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await browser.refresh();
  });

  it('should deleted admin successfully', async () => {
    await LandingPage.loginButton.click();
    await LoginPage.login('ana@super-admin.com', '12345superadmin');
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await HomePageLogged.selectAdmins.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/admins');
    await AdminsListPage.deleteButton.click();
    await AdminsListPage.modalDelete.waitForDisplayed({ timeout: 2000 });
    await AdminsListPage.confirmDelete.click();
    await AdminsListPage.successMessage.waitForDisplayed({ timeout: 3000 });
    await expect(AdminsListPage.successMessage).toHaveTextContaining('Admin Deleted Successfully!');
    await AdminsListPage.exitModal.click();
    await HomePageLogged.logOutButton.click();
    await expect(browser).toHaveUrl('https://alfon-a-trackgenix-app.vercel.app/home');
    await browser.refresh();
  });
});
