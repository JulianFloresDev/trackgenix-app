class AdminsListPage {

    get addButton () {
        return $('[src="/assets/images/add.svg"]')
    }
}

module.exports = new AdminsListPage();