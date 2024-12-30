import React from "react";
import { Button, TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import apiClient from "@/utils/apiClient";

// Definindo o schema de validação com yup
const validationSchema = yup
  .object({
    nome: yup.string().required("Nome é obrigatório"),
    endereco: yup.string().required("Endereço é obrigatório"),
    cidade: yup.string().required("Cidade é obrigatória"),
    estado: yup.string().required("Estado é obrigatório"),
    cep: yup
      .string()
      .required("CEP é obrigatório")
      .length(8, "CEP deve ter 8 dígitos"),
    telefone: yup
      .string()
      .required("Telefone é obrigatório")
      .min(10, "Telefone deve ter no mínimo 10 caracteres"),
    cpf: yup
      .string()
      .required("CPF é obrigatório")
      .length(11, "CPF deve ter 11 dígitos"),
  })
  .required();

interface NovoClienteFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (newClient: any) => void;
  onCancel: () => void;
}

const NovoClienteForm: React.FC<NovoClienteFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  // Configurando o React Hook Form com schema de validação
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  /// Função de submissão do formulário
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitForm = async (data: any) => {
    const newClient = {
      Nome: data.nome,
      Endereço: data.endereco,
      Cidade: data.cidade,
      Estado: data.estado,
      CEP: data.cep,
      Telefone: data.telefone,
      CPF: data.cpf,
    };

    // Pegando o token armazenado no localStorage
    const token = localStorage.getItem("token");

    try {
      // Enviando o POST para o backend
      const response = await apiClient.post(
        "/clients", // URL para o seu backend
        newClient, // Dados do cliente
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
          },
        }
      );
      // Chamando a função onSubmit que foi passada como prop
      onSubmit(response.data); // Passando os dados recebidos na resposta
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Nome */}
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <TextField
              label="Nome"
              fullWidth
              {...field}
              error={!!errors.nome}
              helperText={errors.nome ? errors.nome.message : ""}
            />
          )}
        />

        {/* Endereço */}
        <Controller
          name="endereco"
          control={control}
          render={({ field }) => (
            <TextField
              label="Endereço"
              fullWidth
              {...field}
              error={!!errors.endereco}
              helperText={errors.endereco ? errors.endereco.message : ""}
            />
          )}
        />

        {/* Cidade */}
        <Controller
          name="cidade"
          control={control}
          render={({ field }) => (
            <TextField
              label="Cidade"
              fullWidth
              {...field}
              error={!!errors.cidade}
              helperText={errors.cidade ? errors.cidade.message : ""}
            />
          )}
        />

        {/* Estado */}
        <Controller
          name="estado"
          control={control}
          render={({ field }) => (
            <TextField
              label="Estado"
              fullWidth
              {...field}
              error={!!errors.estado}
              helperText={errors.estado ? errors.estado.message : ""}
            />
          )}
        />

        {/* CEP */}
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <TextField
              label="CEP"
              fullWidth
              {...field}
              error={!!errors.cep}
              helperText={errors.cep ? errors.cep.message : ""}
            />
          )}
        />

        {/* Telefone */}
        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <TextField
              label="Telefone"
              fullWidth
              {...field}
              error={!!errors.telefone}
              helperText={errors.telefone ? errors.telefone.message : ""}
            />
          )}
        />

        {/* CPF */}
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <TextField
              label="CPF"
              fullWidth
              {...field}
              error={!!errors.cpf}
              helperText={errors.cpf ? errors.cpf.message : ""}
            />
          )}
        />

        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" type="submit">
            Adicionar Cliente
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default NovoClienteForm;
