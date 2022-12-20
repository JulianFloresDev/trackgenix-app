class TimeSheetsListPage {
  get addTimeSheetButtom() {
    return $('//*[@id="root"]/div/div/section/div/div/div[2]/img');
  }
}
module.exports = new TimeSheetsListPage();
