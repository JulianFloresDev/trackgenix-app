class LoginPage {
  get inputUserName() {
    return $('//*[@id="root"]/div/div/div/form/div[2]/input');
  }
  get inputPassword() {
    return $('//*[@id="root"]/div/div/div/form/div[3]/input');
  }
  get errorEmailEmptyOne() {
    return $('//*[@id="root"]/div/div/div/form/div[3]/p');
  }
  get errorPasswordEmptyOne() {
    return $('//*[@id="root"]/div/div/div/form/div[5]/p');
  }
  get passwordErrorMessage() {
    return $('//*[@id="root"]/div/div/div/form/div[4]/p');
  }
  get errorFormatEmail() {
    return $('//*[@id="root"]/div/div/div/form/div[3]/p');
  }
  get errorFormatPassword() {
    return $('//*[@id="root"]/div/div/div/form/div[4]/p');
  }
  get errorFormatPasswordTwo() {
    return $('//*[@id="root"]/div/div/div/form/div[5]/p');
  }
  get modalErrorCredentials() {
    return $('//*[@id="root"]/div/div/div/div/div');
  }
  get confirmLoginButton() {
    return $('//*[@id="root"]/div/div/div/form/button');
  }
  get exitModal() {
    return $('//*[@id="root"]/div/div/div/div/div/div[1]/div');
  }

  async login(username, password) {
    await this.inputUserName.setValue(username);
    await this.inputPassword.setValue(password);
    await this.confirmLoginButton.click();
  }
}

module.exports = new LoginPage();
