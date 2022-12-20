class ProjectsFormPage {
  get nameProject() {
    return $('#name');
  }

  get descriptionProject() {
    return $('#description');
  }

  get startDate() {
    return $('#startDate');
  }

  get endDate() {
    return $('#endDate');
  }

  get clientName() {
    return $('#clientName');
  }
  get selectPm() {
    return $('//*[@id="teamMembers"]/tbody/tr[1]/td[1]/select/option[27]');
  }
  get ratePm() {
    return $('//*[@id="teamMembers"]/tbody/tr[1]/td[3]/input');
  }
  get selectEmployee() {
    return $('//*[@id="teamMembers"]/tbody/tr[2]/td[1]/select/option[26]');
  }
  get selectRole() {
    return $('//*[@id="teamMembers"]/tbody/tr[2]/td[2]/select/option[3]');
  }
  get rateEmployee() {
    return $('//*[@id="teamMembers"]/tbody/tr[2]/td[3]/input');
  }
  get submitButton() {
    return $('//*[@id="root"]/div/div/section/div/form/div[8]/button[1]');
  }
  async newProject(name, description, startdate, enddate, client, rate, rateEmployee) {
    await this.nameProject.setValue(name),
      await this.descriptionProject.setValue(description),
      await this.startDate.setValue(startdate),
      await this.endDate.setValue(enddate),
      await this.clientName.setValue(client);
    await this.selectPm.click();
    await this.ratePm.setValue(rate);
    await this.selectEmployee.click();
    await this.selectRole.click();
    await this.rateEmployee.setValue(rateEmployee);
    await this.submitButton.click();
  }
}
module.exports = new ProjectsFormPage();
