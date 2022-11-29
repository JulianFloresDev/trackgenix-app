class AdminsListPage {

    get addButton () {
        return $('[src="/assets/images/add.svg"]')
    }

    get editButton () {
        return $('//*[@id="root"]/div/div[2]/section/div/div/div[1]/table/tbody/tr[1]/td[7]/div/img[1]')
    }

    get deleteButton () {
        return $('//*[@id="root"]/div/div[2]/section/div/div/div[1]/table/tbody/tr[1]/td[7]/div/img[2]')
    }

    get confirmDelete () {
        return $('#root > div > div.layout_bodyContainer__ImN\+9 > section > div.modal_modalOverlay__4lnsf > div > div.modal_content__-hSQp > div > button.modal_confirmBtn__\+Ytuo');
    }

    get modalDelete () {
        return $('//*[@id="root"]/div/div[2]/section/div[1]/div')
    }
}

module.exports = new AdminsListPage();