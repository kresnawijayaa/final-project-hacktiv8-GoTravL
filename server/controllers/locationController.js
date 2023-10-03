const {
  getDataById,
  addData,
  deleteById,
  getFilteredData,
  updateData
} = require("../helpers/firestoreHelper");
const collectionName = "Locations";

class LocationController {
  static async createLocation(req, res, next) {
    try {
      let { body } = req;
      let {address, geometry, images, name, place_id, url } = body;  
      if(!address) throw {name: "BlankForm", message: "Address cannot blank"}
      if(!geometry) throw {name: "BlankForm", message: "Geometry cannot blank"}
      if(!images) throw {name: "BlankForm", message: "Images cannot blank"}
      if(!name) throw {name: "BlankForm", message: "Name cannot blank"}
      if(!place_id) throw {name: "BlankForm", message: "Place_id cannot blank"}
      if(!url) throw {name: "BlankForm", message: "Url cannot blank"}
      if(!geometry.includes(",")) throw {name: "BlankForm", message: "Geometry must be lat,lng"}
      if(!images.includes(",")) throw {name: "BlankForm", message: "Images must be url,url,url"}
      let splgeo = geometry.split(",");
      let splimages = images.split(",");
      body.geometry = {location: {lat: splgeo[0], lng: splgeo[1]}} //lat lng
      body.images = splimages
      const add = await addData(collectionName, body);
      res.status(200).json({
        message: "Location added successfully",
        data: add,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteLocation(req, res, next) {
    try {
      const locationId = req.params.id;
      console.log(locationId)
      const deleteData = await deleteById(collectionName, locationId);
      res.status(200).json({
        message: "Location deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = LocationController;
