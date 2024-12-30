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
    dataInicio: yup
      .date()
      .required("Data de início é obrigatória")
      .typeError("Data inválida"),
    dataFim: yup
      .date()
      .required("Data de fim é obrigatória")
      .typeError("Data inválida")
      .min(
        yup.ref("dataInicio"),
        "Data de fim deve ser posterior à data de início"
      ),
  })
  .required();

interface NewAppointmentFormProps {
  onSubmit: (newAppointment: any) => void;
  onCancel: () => void;
}

const NewAppointmentForm: React.FC<NewAppointmentFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitForm = async (data: any) => {
    const newAppointment = {
      name: data.nome,
      startDate: new Date(data.dataInicio),
      endDate: new Date(data.dataFim),
    };

    const token = localStorage.getItem("token");
    console.log(newAppointment);

    try {
      const response = await apiClient.post("/appointments", newAppointment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSubmit(response.data);
    } catch (error) {
      console.error("Erro ao adicionar compromisso:", error);
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

        {/* Data de Início */}
        <Controller
          name="dataInicio"
          control={control}
          render={({ field }) => (
            <TextField
              label="Data de Início"
              type="date"
              fullWidth
              {...field}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dataInicio}
              helperText={errors.dataInicio ? errors.dataInicio.message : ""}
            />
          )}
        />

        {/* Data de Fim */}
        <Controller
          name="dataFim"
          control={control}
          render={({ field }) => (
            <TextField
              label="Data de Fim"
              type="date"
              fullWidth
              {...field}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dataFim}
              helperText={errors.dataFim ? errors.dataFim.message : ""}
            />
          )}
        />

        <Box display="flex" gap={2}>
          <Button variant="contained" color="primary" type="submit">
            Adicionar Compromisso
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default NewAppointmentForm;
