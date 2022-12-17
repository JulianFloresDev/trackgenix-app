/* eslint-disable prettier/prettier */
class HomePageLogged {
    get selectAdmins () {
        return $('//*[@id="root"]/div/header/nav/ul/li[2]/a');
    }

    get selectProjects () {
        return $('//*[@id="root"]/div/header/nav/ul/li[2]/a');
    }

    get projectTable () {
        return $('//*[@id="root"]/div/div/section/div/div');
    }

    get logOutButton () {
        return $('//*[@id="root"]/div/header/nav/div/button');
    }
}

module.exports = new HomePageLogged();