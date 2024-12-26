import Joi from "joi";

export const clientSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  address: Joi.string().trim().min(1).required(),
  city: Joi.string().trim().min(1).required(),
  state: Joi.string().trim().min(1).required(),
  zip: Joi.string()
    .trim()
    .pattern(/^\d{5}-\d{3}$|^\d{8}$/)
    .required(), // Validação do CEP
  phone: Joi.string()
    .trim()
    .pattern(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$|^\d{2}\s?\d{5}-\d{4}$|^\d{2}\s?\d{9}$/
    )
    .required(), // Validação do telefone
  cpf: Joi.string()
    .trim()
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/)
    .required(), // Validação do CPF
});
