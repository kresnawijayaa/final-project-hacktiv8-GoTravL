const { Client } = require("@googlemaps/google-maps-services-js");
const axios = require("axios");
const API_KEY = "AIzaSyAGbMR0JMGpMMy6HmuFJ5YID7Ne0WSOOeM";
const client = new Client();
const args = {
  params: {
    key: API_KEY,
  },
};
//
const getPlaceId = async (name) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=place_id&input=${name}&inputtype=textquery&key=` +
        API_KEY
    );
    const { place_id } = data.candidates[0];
    return place_id;
  } catch (error) {
    console.log(error);
    console.log("error at get Place Id");
    return;
  }
};
const getPlaceDetail = async (place_id) => {
  try {
    const response = {};
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=name,formatted_address,geometry,photo,url,opening_hours,place_id&place_id=${place_id}&key=${API_KEY}`
    );
    // console.log(data.result);
    args.params.place_id = place_id;
    response.name = data.result.name;
    response.address = data.result.formatted_address;

    response.place_id = data.result.place_id;

    response.url = data.result.url;
    response.geometry = data.result.geometry;

    response.photos = data.result.photos;
    const sleep = (ms) => new Promise((r) => setTimeout(r, 500));

    return response;
  } catch (error) {
    console.log("Error on getPlaceDetail", error);
    return;

    // console.log(error);
  }
};
const getImageUrl = async (photos) => {
  if (!Array.isArray(photos)) {
    return [];
  }

  const photoUrls = photos.map((photo) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`;
  });

  return photoUrls;
};

module.exports = {
  getPlaceId,
  getPlaceDetail,
  getImageUrl,
};
