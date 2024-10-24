const jwt = require("jsonwebtoken");
const AdminModel = require("../../models/adminModel");

class AdminController {
  static async getAdmin(req, res) {
    const msgSuccess = req.query.msgSuccess;
    const msgError = req.query.msgError;

    res.render("admin", {
      msgSuccess,
      msgError,
    });
  }

  static async postAdmin(req, res) {
    const { admin_email, admin_password } = req.body;
    const result = await AdminModel.selectAdminByEmail(admin_email);

    if (!admin_email || !admin_password) {
      return res.redirect(
        "/admin?msgError=Você precisa digitar email e senha validos para acessar o sistema!"
      );
    }

    if (!result) {
      return res.redirect(
        "/admin?msgError=Esse Email não está cadastrado, por gentileza procurar o admin do sistema!"
      );
    }

    if (result.admin_password !== admin_password) {
      return res.redirect(
        "/admin?msgError=Esse Email não está cadastrado, por gentileza procurar o admin do sistema!"
      );
    }

    const tokenAdmin = jwt.sign(
      { admin_email: result.admin_email },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 * 1000 }
    );

    res.cookie("tokenAdmin", tokenAdmin, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
    });

    req.session.logged = true;
    req.session.adminUser = result;

    return res.redirect("/dashboard?msgSuccess=Login realizado com sucesso!");
  }
}

module.exports = AdminController;
