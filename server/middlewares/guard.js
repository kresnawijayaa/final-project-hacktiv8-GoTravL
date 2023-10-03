const { getDataById } = require("../helpers/firestoreHelper");

const activityAuthorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
  } catch (error) {
    next(error);
  }
};



const TripAuthorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const findTrip = await getDataById("Trips", id);
    if (user_id !== findTrip.userId) {
      throw { name: "BadRequest", message: "Invalid Request" };
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = TripAuthorization;
