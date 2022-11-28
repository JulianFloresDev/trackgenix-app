
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
        return $('#root > div > div.layout_navBar__cBGea > header > nav > div.modal_modalOverlay__4lnsf > div > div.modal_content__-hSQp > div > form > button')
    }

    async login (username, password)  {
        await this.inputUserName.setValue(username);
        await this.inputPassword.setValue(password);
        await this.confirmLoginButton.click();
    }
}

module.exports = new LoginPage();