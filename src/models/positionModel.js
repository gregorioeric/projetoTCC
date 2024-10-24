const database = require("../database/database");

module.exports = class PositionModel {
  static async selectAllPosition() {
    const selectAllPosition = "SELECT * FROM position;";
    const [result] = await database.query(selectAllPosition);

    return result;
  }

  static async insertPosition(positionData) {
    const { position_name } = positionData;
    const insertPosition = `INSERT INTO position SET position_name = ?;`;
    const [result] = await database.query(insertPosition, [position_name]);

    return result;
  }
};
