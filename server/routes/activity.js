const express = require("express");
const activitiesController = require("../controllers/activitiesController");
const router = express.Router();

router.post("/", activitiesController.addActivity);
router.put("/:id", activitiesController.updateActivity);
router.put("/insertLocation/:id", activitiesController.inserLocationIdToActivity);
router.delete("/:id", activitiesController.deleteActivityById);

module.exports = router;
