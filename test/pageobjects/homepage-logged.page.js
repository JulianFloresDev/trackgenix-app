class HomePageLogged {
  get selectAdmins() {
    return $('//*[@id="root"]/div/header/nav/ul/li[2]/a');
  }

  get selectProjects() {
    return $('//*[@id="root"]/div/header/nav/ul/li[3]/a');
  }

  get projectTable() {
    return $('//*[@id="root"]/div/div/section/div/div');
  }
  get entityLogged() {
    return $('//*[@id="root"]/div/header/nav/div[1]/h4');
  }
  get namePersonLogged() {
    return $('//*[@id="root"]/div/header/nav/div[1]/h3');
  }
  get logOutButton() {
    return $('//*[@id="root"]/div/header/nav/div/button');
  }
}

module.exports = new HomePageLogged();
