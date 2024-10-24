const express = require("express");
const ValidaCPFController = require("../controllers/validaCPFController");

const validaCPFRoute = express.Router();

validaCPFRoute.get("/", ValidaCPFController.getValidaCPF);

validaCPFRoute.post("/", ValidaCPFController.postValidaCPF);

module.exports = validaCPFRoute;
