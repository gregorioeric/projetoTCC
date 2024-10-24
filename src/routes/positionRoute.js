const express = require("express");
const PositionController = require("../controllers/admin/positionController");

const positionRoute = express.Router();

positionRoute.get("/", PositionController.getPosition);

positionRoute.post("/position", PositionController.postPosition);

positionRoute.post("/page", PositionController.postPositionPage);

module.exports = positionRoute;
