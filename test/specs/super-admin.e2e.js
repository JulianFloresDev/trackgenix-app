const LoginPage = require ('../pageobjects/login.page')
const SuperAdminPage = require ('../pageobjects/super-admin.page')
const AdminsListPage = require ('../pageobjects/admins-list.page')

describe('Add new Admin', () => {
    beforeAll('Navigate URL', () => {
        browser.url('https://alfon-a-trackgenix-eejrv4lm4-basp-a2022.vercel.app/');
    })

    it('should added admin successfully', async () => {
       await LoginPage.loginButton.click();
       await LoginPage.login('orodrig9@hostgator.com', 'q3obMq4sAa0')
       await expect(browser).toHaveUrl('https://alfon-a-trackgenix-eejrv4lm4-basp-a2022.vercel.app/');
       await SuperAdminPage.selectAdmins.click();
       await expect(browser).toHaveUrl('https://alfon-a-trackgenix-eejrv4lm4-basp-a2022.vercel.app/admins');
       await AdminsListPage.addButton.click();
    });
});