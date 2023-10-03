const express = require("express");
const LocationController = require("../controllers/locationController");
const router = express.Router();

router.post("/", LocationController.createLocation);
router.delete("/:id", LocationController.deleteLocation);

module.exports = router;
