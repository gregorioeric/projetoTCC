const express = require("express");
const EditableHtmlController = require("../controllers/editableHtmlController");

const editableRoute = express.Router();

editableRoute.get("/", EditableHtmlController.getEditable);

editableRoute.post("/", EditableHtmlController.postEditable);

module.exports = editableRoute;
