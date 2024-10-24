const express = require("express");
const CheckCEPController = require("../controllers/checkCEPController");

const checkCEPRoute = express.Router();

checkCEPRoute.get("/", CheckCEPController.getCEP);

checkCEPRoute.post("/", CheckCEPController.postCEP);

module.exports = checkCEPRoute;
