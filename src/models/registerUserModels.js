const database = require("../database/database");

module.exports = class LoginRegisterModel {
  static async getUserByEmail(getEmailFromUserController) {
    const selectEmail = "SELECT * FROM users WHERE user_email = ?";
    const [[result]] = await database.query(selectEmail, [
      getEmailFromUserController,
    ]);
    return result;
  }

  static async getUserById(getIdFromUserController) {
    const selectEmail = "SELECT * FROM users WHERE user_id = ?";
    const [[result]] = await database.query(selectEmail, [
      getIdFromUserController,
    ]);
    return result;
  }

  static async postUser(userData) {
    const { user_name, user_email, user_password, user_date } = userData;
    const insert =
      "INSERT INTO users(user_name, user_email, user_password, user_date) VALUES (?, ?, ?, ?);";

    const [result] = await database.query(insert, [
      user_name,
      user_email,
      user_password,
      user_date,
    ]);

    return result;
  }
};
