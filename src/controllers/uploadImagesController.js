const path = require("path");
const UploadImagesModel = require("../models/uploadImagesModel");

module.exports = class UploadImagesController {
  static async getUploadImages(req, res) {
    const results = await UploadImagesModel.getAllImages();
    // const messages = req.flash("message");
    // const success = req.flash("success");

    return res.render("uploadImages", {
      errorMessage: req.query.errorMessage,
      successMessage: req.query.successMessage,
      error: req.query.error,
      results,
    });
  }
  static async postUploadImages(req, res) {
    const user_image_date = new Date().toJSON().slice(0, 19).replace("T", " ");
    console.log(req.file);

    if (!req.file) {
      // req.flash(
      //   "message",
      //   "Opa você precisa selecionar uma imagem para realizar o Upload"
      // );
      return res.redirect(
        "/uploadImages?message=Opa você precisa selecionar uma imagem para realizar o Upload!&error=false"
      );
    }

    const user_image_name = req.file.filename;
    const imgData = {
      user_image_name,
      user_image_date,
    };

    const results = await UploadImagesModel.postImages(imgData);

    if (!results) {
      return res.redirect(
        "/uploadImages?errorMessage=Não Foi possivel fazer Upload da imagem!&error=false"
      );
    }

    return res.redirect(
      "/uploadImages?successMessage=Upload da imagem realizado com sucesso!&error=true"
    );
  }
};
