const express = require("express");
const RegisterController = require("../controllers/registerController");

const registerRoute = express.Router();

registerRoute.get("/", RegisterController.getRegister);

registerRoute.post("/", RegisterController.postRegister);

module.exports = registerRoute;
