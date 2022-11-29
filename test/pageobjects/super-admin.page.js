/* eslint-disable prettier/prettier */
class SuperAdminPage {
    get selectAdmins () {
        return $('#root > div > div.layout_navBar__cBGea > header > nav > div > ul > li:nth-child(1) > a')
    }

    get logOutButton () {
        return $('#root > div > div.layout_navBar__cBGea > header > nav > div > div > button')
    }
}

module.exports = new SuperAdminPage();