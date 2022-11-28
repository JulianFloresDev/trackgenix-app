class SuperAdminPage {
    get selectAdmins () {
        return $('#root > div > div.layout_navBar__cBGea > header > nav > div > ul > li:nth-child(1) > a')
    }
}

module.exports = new SuperAdminPage();