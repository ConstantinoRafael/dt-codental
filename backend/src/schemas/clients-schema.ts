import Joi from "joi";

export const clientSchema = Joi.object({
  Nome: Joi.string()
    .trim() // Remove espaços antes e depois
    .custom((value, helpers) => {
      const lowerCaseWords = [
        "da",
        "de",
        "do",
        "dos",
        "das",
        "e",
        "a",
        "o",
        "os",
        "as",
        "em",
        "para",
        "com",
      ];

      // Divide o nome em palavras
      const formattedName = value
        .split(" ")
        .map((part: any, index: any, array: any) => {
          const lowerPart = part.toLowerCase();

          // Se for uma das palavras que devem ficar em minúsculas
          if (
            lowerCaseWords.includes(lowerPart) &&
            index !== 0 &&
            index !== array.length - 1
          ) {
            return lowerPart; // Deixa a palavra em minúsculas, se não for a primeira ou última
          }

          // Caso contrário, coloca a primeira letra maiúscula e o restante em minúsculas
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        })
        .join(" ");

      return formattedName;
    }, "Formatador de Nome")
    .required(),

  Endereço: Joi.string().trim().required(),
  Cidade: Joi.string().trim().required(),
  Estado: Joi.string().trim().required(),
  CEP: Joi.string()
    .pattern(/^\d{5}-\d{3}$/) // Aceita apenas CEPs já no formato correto
    .messages({
      "string.pattern.base": "CEP must be in the format XXXXX-XXX.",
    })
    .custom((value, helpers) => {
      // Remove qualquer formatação existente e aplica o formato correto
      const digits = value.replace(/\D/g, ""); // Remove tudo que não for número
      if (digits.length !== 8) {
        return helpers.error("CEP must contain 8 digits.");
      }
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }, "Formatador de CEP")
    .required(),

  Telefone: Joi.string()
    .custom((value, helpers) => {
      const digits = value.replace(/\D/g, ""); // Remove tudo que não for número
      if (digits.length !== 10 && digits.length !== 11) {
        return helpers.error("Phone number must have 10 or 11 digits.");
      }
      return digits.length === 10
        ? `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
        : `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }, "Formatador de Telefone")
    .required(),

  CPF: Joi.string()
    .custom((value, helpers) => {
      const digits = value.replace(/\D/g, ""); // Remove tudo que não for número

      if (digits.length !== 11) {
        return helpers.error("CPF must contain 11 digits.");
      }

      const formattedCpf = `${digits.slice(0, 3)}.${digits.slice(
        3,
        6
      )}.${digits.slice(6, 9)}-${digits.slice(9)}`;

      return formattedCpf;
    }, "Formatador de CPF")
    .required(),
});
