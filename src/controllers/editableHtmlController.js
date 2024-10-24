module.exports = class EditableHtmlController {
  static async getEditable(req, res) {
    return res.render("editableHtml", {
      msgSuccess: req.query.msgSuccess,
      msgError: req.query.msgError,
    });
  }

  static async postEditable(req, res) {
    const editavel = req.body;
    console.log(editavel);

    return res.redirect("editableHtml?msgSuccess=Dados editavel salvos");
  }
};
