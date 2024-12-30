"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation"; // Para navegação
import apiClient from "@/utils/apiClient";
import { io } from "socket.io-client";

type ClientMetrics = {
  totalClients: number;
  totalClientsWithDuplicatedPhones: number;
  totalClientsByState: { Estado: string; count: number }[];
};

const Page = () => {
  const [metrics, setMetrics] = useState<ClientMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Para redirecionamento

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await apiClient.get("/clients/client-metrics");
        setMetrics(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    const socket = io(
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
      {
        transports: ["websocket"],
      }
    );

    socket.on("client-metrics", (updatedMetrics: ClientMetrics) => {
      console.log("Metrics updated", updatedMetrics);
      setMetrics(updatedMetrics);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleButtonClick = () => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage
    if (token) {
      router.push("/admin"); // Redireciona para o painel administrativo
    } else {
      router.push("/login"); // Redireciona para a página de login
    }
  };

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  // Verifica se o token existe
  const token = localStorage.getItem("token");

  return (
    <Container>
      {/* Header com Título e Botão */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" gutterBottom>
          Métricas de Clientes
        </Typography>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          {token ? "Ir para o Painel Administrativo" : "Fazer Login"}
        </Button>
      </Box>

      {/* Primeira linha: Total Clients e Clients with Duplicated Phones */}
      <Box display="flex" flexWrap="wrap" gap={4} mb={4}>
        <Box flex={1} minWidth="250px">
          <Card>
            <CardContent>
              <Typography variant="h6">Total de Clientes</Typography>
              <Typography variant="h4">{metrics?.totalClients}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box flex={1} minWidth="250px">
          <Card>
            <CardContent>
              <Typography variant="h6">
                Clientes com telefone duplicados
              </Typography>
              <Typography variant="h4">
                {metrics?.totalClientsWithDuplicatedPhones}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Card único para Clients by State */}
      <Box flex={1} minWidth="100%">
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Clientes por Estado
            </Typography>

            {/* Organizando os estados em múltiplas colunas */}
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(200px, 2fr))"
              gap={3}
            >
              {metrics?.totalClientsByState.map((state) => (
                <Box key={state.Estado}>
                  <Typography variant="body1">
                    {state.Estado}: {state.count}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Page;
