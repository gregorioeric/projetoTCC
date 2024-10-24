const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LoginRegisterModel = require("../models/registerUserModels");

class LoginRegisterController {
  static async getLoginRegister(req, res) {
    return res.render("loginRegister", {
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
    const verifyPassword = await bcrypt.compare(
      user_password,
      resultGetUser.user_password
    );

    if (!resultGetUser) {
      return res.redirect(
        "/loginRegister?msgError=Email não cadastrado, por gentileza Cadastre-se!"
      );
    }

    if (!verifyPassword) {
      return res.redirect("/loginRegister?msgError=A senha está errada!");
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

  static async postRegister(req, res) {
    const { ...data_user } = req.body;
    const user_date = new Date().toJSON().slice(0, 19).replace("T", " ");

    const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regex_senha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$#@%*&!?])/;

    const regex_maiuscula = /^(?=.*[A-Z])/;
    const regex_minuscula = /^(?=.*[a-z])/;
    const regex_numero = /^(?=.*[0-9])/;
    const regex_caracter_especial = /^(?=.*[$#@%*&!?])/;

    if (
      !data_user.user_name ||
      !data_user.user_email ||
      !data_user.user_password ||
      !data_user.userConfirmPassword
    ) {
      return res.redirect(
        "/loginRegister?msgFieldsEmpty=Os campos não podem ser vazios!"
      );
    }

    if (data_user.user_name.length < 3) {
      return res.redirect(
        "/loginRegister?msgNameError=Nome precisa ter no minino 3 caracteres!"
      );
    }

    if (!regex_email.test(data_user.user_email)) {
      return res.redirect(
        "/loginRegister?msgEmailError=Digite um email valido!"
      );
    }

    if (!regex_senha.test(data_user.user_password)) {
      return res.redirect(
        "/loginRegister?msgPasswordError=Senha precisa ter Letras Maiusculas, Minusculas, Numeros e Caracteres especiais!"
      );
    }

    if (data_user.user_password !== data_user.userConfirmPassword) {
      return res.redirect("/loginRegister?msgPassError=Senha não são iguais");
    }

    const recebeEmailFromModel = await LoginRegisterModel.getUserByEmail(
      data_user.user_email
    );

    if (recebeEmailFromModel) {
      return res.redirect(
        "/loginRegister?msgEmailExists=Email já está cadastrado em nosso sistema!"
      );
    }

    const passwordHashed = await bcrypt.hash(data_user.user_password, 10);

    const userData = {
      user_name: data_user.user_name,
      user_email: data_user.user_email,
      user_password: passwordHashed,
      user_date,
    };

    const resultInsert = await LoginRegisterModel.postUser(userData);

    if (!resultInsert) {
      return res.redirect(
        "/loginRegister?msgErrorRegister=Não foi possivel realizar o cadastro, Tente novamente!"
      );
    }

    return res.redirect(
      "/loginRegister?msgSuccess=Cadastro realizado com sucesso!"
    );
  }
}

module.exports = LoginRegisterController;
