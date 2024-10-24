module.exports = class ValidaCPFController {
  static getValidaCPF(req, res) {
    res.render("validaCPF", { message: "" });
  }

  static postValidaCPF(req, res) {
    const { user_cpf } = req.body;
    const clearCPF = user_cpf.replace(/\D+/g, "");
    const sliceCPF = clearCPF.slice(0, -2);
    const totalDigito = clearCPF.length;
    const regexCPF = /([0-9]{2,3})\1/g;

    if (!user_cpf) {
      req.message = {
        msgErrorCPF: "Você precisa informa uma cpf Válido!",
      };
      return res.render("validaCPF", { message: req.message });
    }

    if (regexCPF.test(clearCPF)) {
      req.message = {
        msgErrorCPF: "Esse CPF não é válido",
      };
      return res.render("validaCPF", { message: req.message });
    }

    const criarDigito = (cpfParcial) => {
      const arrayCPF = [...cpfParcial];
      let tamanho = arrayCPF.length + 1;
      const calculaDigito = arrayCPF.reduce((acumulador, valor) => {
        acumulador += tamanho * Number(valor);
        tamanho--;
        return acumulador;
      }, 0);

      const digitoCPF = totalDigito - (calculaDigito % totalDigito);
      const verificarDigito = digitoCPF > 9 ? "0" : String(digitoCPF);

      return verificarDigito;
    };

    const primeiroDigito = criarDigito(sliceCPF);
    const segundoDigito = criarDigito(sliceCPF + primeiroDigito);
    // const resultado = sliceCPF + primeiroDigito;
    const realCPF = sliceCPF + primeiroDigito + segundoDigito;

    if (realCPF !== clearCPF) {
      req.message = {
        msgErrorCPF: "Ooooopa esse CPF é invalido!",
      };
      return res.render("validaCPF", { message: req.message });
    }

    req.message = {
      msgCPF: "CPF valido",
    };
    return res.render("validaCPF", { message: req.message });
  }
};
