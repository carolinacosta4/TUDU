export const getLeftActivationDays = (finishDate: Date) => {
  var endDate = new Date(finishDate);
  var today = new Date();
  var oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((today.getTime() - endDate.getTime())/ oneDay));
}