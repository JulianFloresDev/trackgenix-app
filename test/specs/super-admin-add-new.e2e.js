/* eslint-disable prettier/prettier */
const LoginPage = require ('../pageobjects/login.page');
const SuperAdminPage = require ('../pageobjects/super-admin.page');
const AdminsListPage = require ('../pageobjects/admins-list.page');
const FormPage = require ('../pageobjects/form.page');

describe('Add new Admin', () => {
    beforeAll('Navigate URL', () => {
        browser.url('https://alfon-a-trackgenix-eejrv4lm4-basp-a2022.vercel.app/');
    });

    it('should added admin successfully', async () => {
       await LoginPage.loginButton.click();
       await LoginPage.login('orodrig9@hostgator.com', 'q3obMq4sAa0')
       await expect(browser).toHaveUrl('https://alfon-a-trackgenix-eejrv4lm4-basp-a2022.vercel.app/');
       await SuperAdminPage.selectAdmins.click();
       await expect(browser).toHaveUrl('https://alfon-a-trackgenix-eejrv4lm4-basp-a2022.vercel.app/admins');
       await AdminsListPage.addButton.click();
       await expect(browser).toHaveUrl('https://alfon-a-trackgenix-eejrv4lm4-basp-a2022.vercel.app/admins/form/0');
       await FormPage.dataadmin('Test', 'Automation', 'algo@algo.com', 'Abcd1234', '47112225', '77547774', 'Lugar 1234');
       await expect(FormPage.successfullyMessage).toHaveTextContaining('Admin created successfully!');
       await FormPage.confirmButton.click();
       await SuperAdminPage.logOutButton.click();
       await browser.refresh();
    });
});