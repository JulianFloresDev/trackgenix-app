class AdminsListPage {
  get addButton() {
    return $('//*[@id="root"]/div/div/section/div/div/div[2]/img');
  }

  get editButton() {
    return $(
      '//*[@id="root"]/div/div/section/div/div[2]/div[1]/table/tbody/tr[5]/td[7]/div/img[1]'
    );
  }

  get deleteButton() {
    return $(
      '//*[@id="root"]/div/div/section/div/div[2]/div[1]/table/tbody/tr[5]/td[7]/div/img[2]'
    );
  }

  get confirmDelete() {
    return $('//*[@id="root"]/div/div/section/div[1]/div/div[2]/div/button[2]');
  }

  get modalDelete() {
    return $('//*[@id="root"]/div/div/section/div[1]/div');
  }

  get successMessage() {
    return $('//*[@id="root"]/div/div/section/div[1]/div/div[2]/h3');
  }

  get exitModal() {
    return $('//*[@id="root"]/div/div/section/div[1]/div/div[1]/div');
  }
}

module.exports = new AdminsListPage();
