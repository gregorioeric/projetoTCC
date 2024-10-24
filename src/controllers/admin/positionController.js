const PositionModel = require("../../models/positionModel");
const PositionPageModel = require("../../models/positionPageModel");

module.exports = class PositionController {
  static async getPosition(req, res) {
    const adminUser = req.session.adminUser;
    const results = await PositionModel.selectAllPosition();
    return res.render("position", {
      msgError: req.query.msgError,
      msgSuccess: req.query.msgSuccess,
      position: results,
      adminUser,
    });
  }

  static async postPositionPage(req, res) {
    const { position_name } = req.body;

    if (!position_name) {
      return res.redirect(
        `/pages/createPages?msgError=Não é possivel criar uma Posição em branco.
        Crie uma Posição com no minimo 3 caracteres!`
      );
    }

    const result = await PositionPageModel.insertPosition(position_name);
    console.log(result);

    return res.redirect(
      "/pages/createPages?msgSuccess=Cadastro da Position realizado com sucesso."
    );
  }

  static async postPosition(req, res) {
    const { position_name } = req.body;

    if (!position_name) {
      return res.redirect(
        `/position?msgError=Não é possivel criar uma Posição em branco.
        Crie uma Posição com no minimo 3 caracteres!`
      );
    }

    const position = {
      position_name,
    };

    const result = await PositionModel.insertPosition(position);

    return res.redirect(
      "/position?msgSuccess=Cadastro da Position realizado com sucesso."
    );
  }
};
