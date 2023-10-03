const express = require("express");
const tripController = require("../controllers/tripController");
const TripAuthorization = require("../middlewares/guard");
const tripRouter = express.Router();

tripRouter.get("/", tripController.getUserTrip);
tripRouter.post("/", tripController.addTrip);
tripRouter.post("/bot", tripController.addTripByAi);
tripRouter.get("/:id", TripAuthorization, tripController.getTripById);
tripRouter.put("/:id", TripAuthorization, tripController.editTrip);
tripRouter.delete("/:id", TripAuthorization, tripController.deleteTrip);

module.exports = tripRouter;
