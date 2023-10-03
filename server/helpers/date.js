const convertDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInMilliseconds = end - start;

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const totalDays = Math.round(differenceInMilliseconds / oneDayInMilliseconds);
  return totalDays;
};
const generateDates = (start, end) => {
  const dates = [];
  let currentDate = new Date(start);
  const endDate = new Date(end);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
const generateDays = (numberOfDays) => {
  const days = [];
  for (let i = 1; i <= numberOfDays; i++) {
    days.push("Day" + i);
  }
  return days;
};

module.exports = { convertDate, generateDates, generateDays };
