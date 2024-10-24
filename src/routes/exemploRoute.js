const express = require("express");

const exemploRoute = express.Router();

exemploRoute.get("/contato", (req, res) => {
  return res.render("contato");
});

module.exports = exemploRoute;
