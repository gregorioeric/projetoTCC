module.exports = class PhoneController {
  static async getPhone(req, res) {
    return res.render("telefone", {
      msgError: req.query.msgError,
      msgSuccess: req.query.msgSuccess,
    });
  }

  static async postPhone(req, res) {
    return res.redirect("/telefone");
  }
};
