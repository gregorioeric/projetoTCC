module.exports = class CheckCEPController {
  static async getCEP(req, res) {
    const cep = req.session.cep;
    const msgErrorCEP = req.query.msgErrorCEP;
    const msgSuccessCEP = req.query.msgSuccessCEP;
    console.log(cep);
    console.log("page cep");

    return res.render("checkCEP", { msgErrorCEP, msgSuccessCEP, cep });
  }

  static async postCEP(req, res) {
    const { user_cep } = req.body;
    const clearCEP = user_cep.replace(/\D+/g, "");

    if (!user_cep) {
      req.session.cep = "";
      return res.redirect(
        "/checkCEP?msgErrorCEP=Por gentileza, informe um CEP válido!"
      );
    }

    const request = await fetch(`https://viacep.com.br/ws/${clearCEP}/json/`);
    const response = await request.json();
    console.log(response);

    if (!response.cep) {
      req.session.cep = "";
      return res.redirect(
        "/checkCEP?msgErrorCEP=Ohhhh esse CEP que você informou é inválido!"
      );
    }

    req.session.cep = response;
    return res.redirect("/checkCEP?msgSuccessCEP=CEP é válido!");
  }
};
