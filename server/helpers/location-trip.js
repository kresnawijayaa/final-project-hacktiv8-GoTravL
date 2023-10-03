//helper for location and trip

const { convertDate } = require("./date");
const { getPlaceId, getPlaceDetail, getImageUrl } = require("./google-maps");
const { searchDestination } = require("./openai");

const generateItinerary = async (destination, startDate, endDate) => {
  try {
    const totalDay = convertDate(startDate, endDate);
    const resp = { Day: {} };
    const listDestination = await searchDestination(destination, totalDay);
    listDestination.forEach((el) => (resp.Day[el.Day] = []));
    await Promise.all(
      listDestination.map(async (destination) => {
        let tempObj = {};
        const place_id = await getPlaceId(destination.Destination);
        if (place_id) {
          const details = await getPlaceDetail(place_id);
          if (details) {
            const image_url = await getImageUrl(details.photos);
            delete details.photos;
            tempObj = { ...details };
            tempObj.images = image_url;
            resp.Day[destination.Day].push(tempObj);
          }
        }
      })
    );
    console.log(resp.Day)
    return resp;
  } catch (error) {
    return "Failed generate reason: ", error.message;
  }
};
// generateItinerary("balikpapan", "2023-02-15", "2023-02-17");
module.exports = { generateItinerary };
