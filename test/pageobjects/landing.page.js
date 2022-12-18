class LandingPage {
  get loginButton() {
    return $('#root > div > header > nav > div:nth-child(1) > ul > li:nth-child(3) > a');
  }

  get signupButton() {
    return $('//*[@id="root"]/div/header/nav/div[1]/ul/li[2]/a');
  }
}

module.exports = new LandingPage();
