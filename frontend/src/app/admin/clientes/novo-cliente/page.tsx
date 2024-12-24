"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";

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

    // Aqui você pode fazer uma requisição para sua API, como:
    // fetch('/api/clientes', { method: 'POST', body: JSON.stringify(formValues) })
  };

  return (
    <Paper sx={{ padding: 3, margin: "auto", maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de Novo Cliente
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={formValues.nome}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Endereço"
              name="endereco"
              value={formValues.endereco}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cidade"
              name="cidade"
              value={formValues.cidade}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Estado"
              name="estado"
              value={formValues.estado}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CEP"
              name="cep"
              value={formValues.cep}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Telefone"
              name="telefone"
              value={formValues.telefone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="CPF"
              name="cpf"
              value={formValues.cpf}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar Cliente
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
