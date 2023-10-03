const distanceInDays = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in one day

    const differenceInMilliseconds = endDate - startDate;
    const differenceInDays = Math.round(differenceInMilliseconds / oneDay);

    return differenceInDays;
}
export const generateDates = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};
export const generateDays = (numberOfDays) => {
    const days = [];
    for (let i = 1; i <= numberOfDays; i++) {
        days.push("Day" + i);
    }
    return days;
};
export default distanceInDays