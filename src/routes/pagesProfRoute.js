const express = require("express");
const PagesController = require("../controllers/admin/pagesProfController");

const pagesProfRoute = express.Router();

pagesProfRoute.get("/", PagesController.getPage);

module.exports = pagesProfRoute;

// const express = require("express");
// const PagesController = require("../controllers/admin/pagesContoller");
// const CreatePagesController = require("../controllers/admin/createPagesController");
// const EditPageController = require("../controllers/admin/editPageController");

// const pagesRoute = express.Router();

// pagesRoute.get("/", PagesController.getPages);

// // pagesRoute.post("/", PagesController.postPages);

// pagesRoute.get("/createPages", PagesController.getCreatePages);

// pagesRoute.post("/createPages", PagesController.postCreatePages);

// pagesRoute.get("/editPage/:id", PagesController.getEditPage);

// pagesRoute.post("/updatePage/:id", PagesController.putEditPage);

// pagesRoute.post("/deletePage/:id", PagesController.deletePage);

// module.exports = pagesRoute;
