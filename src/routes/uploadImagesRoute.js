const express = require("express");
const multer = require("multer");
const UploadImagesController = require("../controllers/uploadImagesController");
const storage = require("../middlewares/uploadImageMiddleware");

const uploadImagesRoute = express.Router();

const upload = multer({ storage: storage });

uploadImagesRoute.get("/", UploadImagesController.getUploadImages);

uploadImagesRoute.post(
  "/",
  upload.single("user_upload"),
  UploadImagesController.postUploadImages
);

module.exports = uploadImagesRoute;
