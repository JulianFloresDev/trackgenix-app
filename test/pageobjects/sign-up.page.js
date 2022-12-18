class SignUpPage {
  get firstNameInput() {
    return $('#firstName');
  }

  get lastNameInput() {
    return $('#lastName');
  }

  get emailInput() {
    return $('#email');
  }

  get passwordInput() {
    return $('#password');
  }

  get dniInput() {
    return $('#dni');
  }

  get phoneInput() {
    return $('#phone');
  }

  get addressInput() {
    return $('#location');
  }

  get submitButton() {
    return $('//*[@id="root"]/div/div/section/form/div[8]/button');
  }

  async signUp(name, lastname, email, password, DNI, phone, Address) {
    await this.firstNameInput.setValue(name);
    await this.lastNameInput.setValue(lastname);
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.dniInput.setValue(DNI);
    await this.phoneInput.setValue(phone);
    await this.addressInput.setValue(Address);
    await this.submitButton.click();
  }
}

module.exports = new SignUpPage();
