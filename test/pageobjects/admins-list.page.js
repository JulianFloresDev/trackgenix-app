/* eslint-disable prettier/prettier */
class AdminsListPage {
  get addButton() {
        return $('[src="/assets/images/add.svg"]');
    }

    get editButton () {
        return $('//*[@id="root"]/div/div[2]/section/div/div/div[1]/table/tbody/tr[1]/td[7]/div/img[1]');
    }

    get deleteButton () {
        return $('//*[@id="root"]/div/div[2]/section/div/div/div[1]/table/tbody/tr[1]/td[7]/div/img[2]');
    }

    get confirmDelete () {
        return $('//*[@id="root"]/div/div[2]/section/div[1]/div/div[2]/div/button[2]');
    }

    get modalDelete () {
        return $('//*[@id="root"]/div/div[2]/section/div[1]/div');
    }

    get successMessage () {
        return $('//*[@id="root"]/div/div[2]/section/div[1]/div/div[2]/h3');
    }

    get exitModal () {
        return $('//*[@id="root"]/div/div[2]/section/div[1]/div/div[1]/div');
    }
}

module.exports = new AdminsListPage();