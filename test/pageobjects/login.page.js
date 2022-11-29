/* eslint-disable prettier/prettier */

class LoginPage {

    get loginButton () {
        return $('.navbar_buttonItem__IZsPX')
    }

    get inputUserName () {
        return $('#email')
    }

    get inputPassword () {
        return $('#password')
    }

    get confirmLoginButton () {
        return $('//*[@id="root"]/div/div[1]/header/nav/div[1]/div/div[2]/div/form/button')
    }

    async login (username, password)  {
        await this.inputUserName.setValue(username);
        await this.inputPassword.setValue(password);
        await this.confirmLoginButton.click();
    }
}

module.exports = new LoginPage();