class TimeSheetsListPage {
  get addTimeSheetButton() {
    return $('//*[@id="root"]/div/div/section/div/div[2]/div[2]/img');
  }
  get editButton() {
    return $('//*[@id="root"]/div/div/section/div/div[2]/div[1]/table/tbody/tr/td[6]/div/img[1]');
  }
  get deleteButton() {
    return $('//*[@id="root"]/div/div/section/div/div[2]/div[1]/table/tbody/tr/td[6]/div/img[2]');
  }
  get confirmDeleteModal() {
    return $('//*[@id="root"]/div/div/section/div[1]/div');
  }
  get confirmDeleteButton() {
    return $('//*[@id="root"]/div/div/section/div[1]/div/div[2]/div/button[2]');
  }
  get succesMessage() {
    return $('//*[@id="root"]/div/div/section/div[1]/div');
  }
  get exitMessage() {
    return $('//*[@id="root"]/div/div/section/div[1]/div/div[1]/div');
  }
}
module.exports = new TimeSheetsListPage();
