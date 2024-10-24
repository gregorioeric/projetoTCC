const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LoginRegisterModel = require("../models/registerUserModels");

class LoginController {
  static async getLogin(req, res) {
    return res.render("login", {
      msgSuccess: req.query.msgSuccess,
      msgError: req.query.msgError,
      msgFieldsEmpty: req.query.msgFieldsEmpty,
      msgNameError: req.query.msgNameError,
      msgEmailError: req.query.msgEmailError,
      msgPasswordError: req.query.msgPasswordError,
      msgPassError: req.query.msgPassError,
      msgEmailExists: req.query.msgEmailExists,
      msgErrorRegister: req.query.msgErrorRegister,
    });
  }

  static async postLogin(req, res) {
    const { user_email, user_password } = req.body;
    const resultGetUser = await LoginRegisterModel.getUserByEmail(user_email);

    if (!user_email || !user_password) {
      return res.redirect(
        "/login?msgError=Campos Obrigatorios, por getileza informe um email e senha para acessar sua conta!"
      );
    }

    if (!resultGetUser) {
      return res.redirect(
        "/login?msgError=Email não cadastrado, por gentileza Cadastre-se!"
      );
    }

    const verifyPassword = await bcrypt.compare(
      user_password,
      resultGetUser.user_password
    );

    if (!verifyPassword) {
      return res.redirect("/login?msgError=A senha está errada!");
    }

    const token = jwt.sign(
      { user_id: resultGetUser.user_id },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 1000 }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true });

    req.session.logged = true;
    req.session.userProfile = resultGetUser;

    return res.redirect("/profile");
  }
}

module.exports = LoginController;
