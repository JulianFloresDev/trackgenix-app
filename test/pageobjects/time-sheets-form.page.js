class TimeSheetsFormPage {
  get formDataTimeSheet() {
    return $('//*[@id="root"]/div/div/section/div');
  }
  get dateInput() {
    return $('#date');
  }
  get descriptionInput() {
    return $('#description');
  }
  get projectInput() {
    return $('//*[@id="project"]/option[2]');
  }
  get taskInput() {
    return $('//*[@id="task"]/option[2]');
  }
  get hoursInput() {
    return $('#hours');
  }
  get submitButton() {
    return $('//*[@id="root"]/div/div/section/div/form/div[6]/button[1]');
  }
  get succesMessage() {
    return $('//*[@id="root"]/div/div/div/div');
  }
  get backTimeSheets() {
    return $('//*[@id="root"]/div/div/div/div/div[2]/div/button[2]');
  }

  async dataTimesheet(date, description, hours) {
    await this.dateInput.setValue(date);
    await this.descriptionInput.setValue(description);
    await this.projectInput.click();
    await this.taskInput.click();
    await this.hoursInput.setValue(hours);
    await this.submitButton.click();
  }
}
module.exports = new TimeSheetsFormPage();
