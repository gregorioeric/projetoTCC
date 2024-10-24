const express = require("express");
const LoginRegisterCtrl = require("../controllers/loginRegisterController");

const loginRegisterRoute = express.Router();

loginRegisterRoute.get("/", LoginRegisterCtrl.getLoginRegister);

loginRegisterRoute.post("/login", LoginRegisterCtrl.postLogin);

loginRegisterRoute.post("/register", LoginRegisterCtrl.postRegister);

module.exports = loginRegisterRoute;
