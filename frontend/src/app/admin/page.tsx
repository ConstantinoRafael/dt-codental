"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Container, CssBaseline } from "@mui/material";

export default function AdminPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
          Painel Administrativo
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigation("/admin/clientes")}
          fullWidth
          sx={{ maxWidth: 300 }}
        >
          Gerenciar Clientes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleNavigation("/admin/compromissos")}
          fullWidth
          sx={{ maxWidth: 300 }}
        >
          Gerenciar Compromissos
        </Button>
      </Box>
    </Container>
  );
}
