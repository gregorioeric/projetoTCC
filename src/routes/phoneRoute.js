const express = require("express");
const PhoneController = require("../controllers/phoneController");

const phoneRoute = express.Router();

phoneRoute.get("/", PhoneController.getPhone);

phoneRoute.post("/", PhoneController.postPhone);

module.exports = phoneRoute;
