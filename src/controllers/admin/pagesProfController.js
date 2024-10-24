module.exports = class PagesProfController {
  static async getPage(req, res) {
    return res.render("pagesProf", {
      adminUser: req.session.adminUser,
      msgSuccess: req.query.msgSuccess,
      msgError: req.query.msgError,
    });
  }
};
