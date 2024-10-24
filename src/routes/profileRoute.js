const express = require("express");
const ProfileController = require("../controllers/profileController");
const AuthMiddleware = require("../middlewares/authMiddleware");

const profileRoute = express.Router();

profileRoute.get(
  "/",
  AuthMiddleware.authorization,
  ProfileController.getProfile
);

module.exports = profileRoute;
