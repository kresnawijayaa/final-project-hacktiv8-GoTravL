const express = require("express");
const openAiController = require("../controllers/openAiController");
const openAi = express.Router();

openAi.post("/ask", openAiController.searchBot);
// openAi.post("/destination", tripController.addTrip);

module.exports = openAi;
