const {
  getDataById,
  addData,
  deleteById,
  getFilteredDataByRefference,
  getFilteredData,
  addDataWithRefference,
  updateDataWithRefference
} = require("../helpers/firestoreHelper");
const collectionName = "Activities";
class ActivityController {
  static async updateActivity(req, res, next) {
    try {
      const { body } = req;
      if(!body.tripId) throw {name: "BlankForm", message: "tripId cannot blank"}
      if(!body.name) throw {name: "BlankForm", message: "Name cannot blank"}
      if(!body.date) throw {name: "BlankForm", message: "Date cannot blank"}
      const { id } = req.params;
      const result = await updateData(collectionName, body, id);
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }
  static async inserLocationIdToActivity(req, res, next) {
    try {
      const { body } = req;
      if(!body.locationId) throw {name: "BlankForm", message: "locationId cannot blank"}
      const { id } = req.params; //activityId
      const result = await updateDataWithRefference(collectionName, id, "Locations/"+body.locationId, "LocationId")
      res.status(200).json({
        message: "Location added successfully to activity "+id,
        data: result,
      });
    } catch (error) {
      next(error)
    }
  }
  static async addActivity(req, res, next) {
    try {
      //required params tripId,name,date
      const { body } = req;
      if(!body.name) throw {name: "BlankForm", message: "Name cannot blank"}
      if(!body.tripId) throw {name: "BlankForm", message: "tripId cannot blank"}
      if(!body.date) throw {name: "BlankForm", message: "Date cannot blank"}
      const result = await addDataWithRefference(collectionName, body, "Trips/"+body.tripId, "TripId");
      res.status(201).json({
        message: "Activity added successfully",
        data: result,
      });
    } catch (error) {
      next(error)
    }
  }
  static async deleteActivityById(req, res, next) {
    try {
      //required params params
      const { id } = req.params;
      const result = await deleteById(collectionName, id);
      res.status(200).json({
        message: "Activity deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ActivityController;
