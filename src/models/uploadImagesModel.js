const database = require("../database/database");

module.exports = class UploadImagesModel {
  static async getAllImages() {
    const selectAllImages = "SELECT * FROM user_images";
    const [results] = await database.query(selectAllImages);
    return results;
  }

  static async postImages(imgData) {
    const { user_image_name, user_image_date } = imgData;
    const insertImages =
      "INSERT INTO user_images (user_image_name, user_image_date) VALUES (?, ?)";
    const [result] = await database.query(insertImages, [
      user_image_name,
      user_image_date,
    ]);
    return result;
  }
};
