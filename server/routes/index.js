const express = require("express");
const userController = require("../controllers/userController");
const { Authentication } = require("../middlewares");
const tripRouter = require("./trip");
const openAi = require("./openai");
const activity = require("./activity");
const location = require("./location");
const tripController = require("../controllers/tripController");
const router = express.Router();

router.post("/login", userController.loginAccount);
router.post("/register", userController.registerAccount);
router.get("/public", tripController.getPublicTrip);
router.use("/openai", openAi);

router.use(Authentication);
router.get("/me", userController.getMyAccount);
router.put("/update-account", userController.updateAccount);
router.use("/trip", tripRouter);
router.use("/activities", activity);
router.use("/location", location);

module.exports = router;
