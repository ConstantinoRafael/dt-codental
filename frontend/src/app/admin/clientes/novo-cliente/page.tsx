"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

export default function NovoClientePage() {
  const [formValues, setFormValues] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
    cpf: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Cliente cadastrado:", formValues);

    // Aqui você pode fazer uma requisição para sua API
  };

  return (
    <Paper sx={{ padding: 3, margin: "auto", maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de Novo Cliente
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
            required
            sx={{ gridColumn: "span 2" }} // Ocupa duas colunas
          />
          <TextField
            fullWidth
            label="Endereço"
            name="endereco"
            value={formValues.endereco}
            onChange={handleChange}
            required
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            label="Cidade"
            name="cidade"
            value={formValues.cidade}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Estado"
            name="estado"
            value={formValues.estado}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="CEP"
            name="cep"
            value={formValues.cep}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={formValues.telefone}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="CPF"
            name="cpf"
            value={formValues.cpf}
            onChange={handleChange}
            required
            sx={{ gridColumn: "span 2" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ gridColumn: "span 2" }}
          >
            Cadastrar Cliente
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
