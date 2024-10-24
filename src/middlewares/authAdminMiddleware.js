const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminModel");

module.exports = class AuthAdminMiddleware {
  static async adminAuthorization(req, res, next) {
    const { tokenAdmin } = req.cookies;

    if (!tokenAdmin) {
      return res.redirect(
        "/admin?msgError=Você precisa se autenticar para acessar essa pagina!"
      );
    }

    const verifyToken = jwt.verify(tokenAdmin, process.env.SECRET);

    const result = await AdminModel.selectAdminByEmail(verifyToken.admin_email);

    if (!result) {
      return res.redirect(
        "/admin?msgError=Você precisa se autenticar para acessar essa pagina!"
      );
    }

    next();
  }
};
