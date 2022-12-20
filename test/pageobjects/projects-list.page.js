class ProjectsListPage {
  get addProjectsButton() {
    return $('//*[@id="root"]/div/div/section/div/div/div[2]/img');
  }
  get deleteButton() {
    return $('//*[@id="root"]/div/div/section/div/div/div[1]/table/tbody/tr[1]/td[9]/div/img[2]');
  }
  get editButton() {
    return $('//*[@id="root"]/div/div/section/div/div/div[1]/table/tbody/tr[1]/td[9]/div/img[1]');
  }
  get modalDeleteConfirmation() {
    return $('//*[@id="root"]/div/div/section/div[1]/div');
  }
  get deleteButtonConfirmation() {
    return $('//*[@id="root"]/div/div/section/div[1]/div/div[2]/div/button[2]');
  }
  get deleteSuccessfully() {
    return $('//*[@id="root"]/div/div/section/div[1]/div');
  }
  get exitModal() {
    return $('//*[@id="root"]/div/div/section/div[1]/div/div[1]/div');
  }
}
module.exports = new ProjectsListPage();
