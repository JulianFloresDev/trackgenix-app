class ProfilePage {
  get formProfile() {
    return $('//*[@id="root"]/div/div/section/div');
  }
  get deleteButton() {
    return $('//*[@id="root"]/div/div/section/div/div[7]/button[3]');
  }
  get modalConfirmationDelete() {
    return $('//*[@id="root"]/div/div/section/div[1]/div');
  }
  get deleteButtonConfirmation() {
    return $('//*[@id="root"]/div/div/section/div[1]/div/div[2]/button[1]');
  }
  get succesMessage() {
    return $('//*[@id="root"]/div/div/section/div[1]/div');
  }
  get exitMessage() {
    return $('//*[@id="root"]/div/div/section/div[1]/div/div[1]/div');
  }
}
module.exports = new ProfilePage();
