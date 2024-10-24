// const btnCadastro = document.querySelector("#btn-cad button");

// btnCadastro.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("cliquei no botao");
// });

// setTimeout(function() {
//     window.location = "/login";
//   }, 3000);

// const home = document.querySelector("#home");

// console.log(home);

const inputCEP = document.querySelector('input[name="user_cep"]');
const inputCPF = document.querySelector('input[name="user_cpf"]');
const inputPhone = document.querySelector('input[name="user_phone"]');
const btnCEP = document.querySelector("#btn-cep");

if (inputCEP !== null) {
  inputCEP.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D+/g, "");
    let cepValue = e.target.value.replace(/\D+/g, "");

    cepValue = cepValue.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");

    e.target.value = cepValue;
  });
}

if (inputPhone !== null) {
  inputPhone.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D+/g, "");
    let value = e.target.value.replace(/\D+/g, "");
    const phoneArray = value.split("");

    if (phoneArray[2] == 9) {
      inputPhone.maxLength = 15;
    }

    if (phoneArray[2] != 9) {
      inputPhone.maxLength = 14;
    }

    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    return (e.target.value = value);
  });
}

if (inputCPF !== null) {
  inputCPF.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D+/g, "");
    let value = e.target.value.replace(/\D+/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    e.target.value = value;
  });
}

// if (inputCEP !== null) {
//   inputCEP.addEventListener("input", (e) => {
//     e.target.value = e.target.value.replace(/\D+/g, "");
//     let cepValue = e.target.value.replace(/\D+/g, "");
//     const cepArray = cepValue.split("");
//     let cepFormatted = "";

//     if (cepArray.length > 0) {
//       cepFormatted += `${cepArray.slice(0, 5).join("")}`;
//     }

//     if (cepArray.length > 5) {
//       cepFormatted += `-${cepArray.slice(5, 8).join("")}`;
//     }

//     e.target.value = cepValue;
//   });
// }

// if (inputCPF !== null) {
//   inputCPF.addEventListener("input", (e) => {
//     e.target.value = e.target.value.replace(/\D+/g, "");
//     let value = e.target.value;
//     let cpfArray = value.split("");
//     let cpfFormatado = "";

//     if (cpfArray.length > 0) {
//       cpfFormatado += `${cpfArray.slice(0, 3).join("")}`;
//     }

//     if (cpfArray.length > 3) {
//       cpfFormatado += `.${cpfArray.slice(3, 6).join("")}`;
//     }

//     if (cpfArray.length > 6) {
//       cpfFormatado += `.${cpfArray.slice(6, 9).join("")}`;
//     }

//     if (cpfArray.length > 9) {
//       cpfFormatado += `-${cpfArray.slice(9, 11).join("")}`;
//     }

//     e.target.value = cpfFormatado;
//   });
// }

// v = v.replace(/^(\d{2})(\d)/, "$1.$2")
//     v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
//     v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
//     v = v.replace(/(\d{4})(\d)/, "$1-$2")

const troca = document.querySelector("#troca");
const arroz = document.querySelector("#arroz");
const feijao = document.querySelector("#feijao");
const salgado = document.querySelector("#salgado");
// const optValue = troca.options[troca.selectedIndex].value;
// const opt = document.querySelector("#arroz");

if (troca !== null) {
  troca.addEventListener("change", () => {
    if (troca.value === "arroz") {
      arroz.style.display = "block";
      feijao.style.display = "none";
    }

    if (troca.value === "feijao") {
      arroz.style.display = "none";
      feijao.style.display = "block";
    }
  });
}

// const btn = document.querySelector
const getContentEditable = () => {
  const contentEditable = document.querySelector("#divEditable").innerText;
  document.querySelector("#content-text").value = contentEditable;
};
