/* eslint-disable prettier/prettier */
class SuperAdminPage {
    get selectAdmins () {
        return $('//*[@id="root"]/div/div[1]/header/nav/div/ul/li[2]/a');
    }

    get logOutButton () {
        return $('#root > div > div.layout_navBar__cBGea > header > nav > div > div > button');
    }
}

module.exports = new SuperAdminPage();