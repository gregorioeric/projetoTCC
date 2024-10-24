const database = require("../database/database");

module.exports = class PositionPageModel {
  static async selectAllPosition() {
    const selectAllPosition = `SELECT * FROM position;`;
    const [result] = await database.query(selectAllPosition);

    return result;
  }

  static async insertPosition(position_name) {
    const insertPosition = "INSERT INTO position SET position_name = ?;";
    const [result] = await database.query(insertPosition, [position_name]);

    return result;
  }
};
