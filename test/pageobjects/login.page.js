/* eslint-disable prettier/prettier */

class LoginPage {

    get loginButton () {
        return $('#root > div > header > nav > div:nth-child(1) > ul > li:nth-child(3) > a');
    }

    get inputUserName () {
        return $('//*[@id="root"]/div/div/div/form/div[2]/input');
    }

    get inputPassword () {
        return $('//*[@id="root"]/div/div/div/form/div[3]/input');
    }

    get confirmLoginButton () {
        return $('//*[@id="root"]/div/div/div/form/button');
    }

    async login (username, password)  {
        await this.inputUserName.setValue(username);
        await this.inputPassword.setValue(password);
        await this.confirmLoginButton.click();
    }
}

module.exports = new LoginPage();