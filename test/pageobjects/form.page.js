/* eslint-disable prettier/prettier */
class FormPage {

    get inputFirstName () {
        return $('#firstName');
    }

    get inputLastName () {
        return $('#lastName');
    }

    get inputEmail () {
        return $('#email');
    }

    get inputPassword () {
        return $('#password');
    }

    get inputDni () {
        return $('#dni');
    }

    get inputPhone () {
        return $('#phone');
    }

    get inputAddress () {
        return $('#location');
    }

    get submitButton () {
        return $('[type="submit"]');
    }

    get successfullyMessage () {
        return $('//*[@id="root"]/div/div/div/div/div[2]/h3');
    }

    get confirmButton () {
        return $('//*[@id="root"]/div/div/div/div/div[2]/div/button[2]');
    }

    async createAdmin (name, lastname, email, password, DNI, phone, Address) {
        await this.inputFirstName.setValue(name);
        await this.inputLastName.setValue(lastname);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.inputDni.setValue(DNI);
        await this.inputPhone.setValue(phone);
        await this.inputAddress.setValue(Address);
        await this.submitButton.click();
    }

    async editAdmin (name, lastname, email, DNI, phone, Address) {
        await this.inputFirstName.setValue(name);
        await this.inputLastName.setValue(lastname);
        await this.inputEmail.setValue(email);
        await this.inputDni.setValue(DNI);
        await this.inputPhone.setValue(phone);
        await this.inputAddress.setValue(Address);
        await this.submitButton.click();
    }
}

module.exports = new FormPage();