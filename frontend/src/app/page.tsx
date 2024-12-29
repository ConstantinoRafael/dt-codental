"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
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

    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socket.on("client-metrics", (updatedMatrics: ClientMetrics) => {
      console.log("Metrics updated", updatedMatrics);
      setMetrics(updatedMatrics);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Client Metrics
      </Typography>

      <Stack
        direction="row"
        spacing={4}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1, minWidth: "250px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Clients</Typography>
              <Typography variant="h4">{metrics?.totalClients}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1, minWidth: "250px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Clients with Duplicated Phones
              </Typography>
              <Typography variant="h4">
                {metrics?.totalClientsWithDuplicatedPhones}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1, minWidth: "250px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Clients by State</Typography>
              {metrics?.totalClientsByState.map((state) => (
                <Typography key={state.Estado}>
                  {state.Estado}: {state.count}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
};

export default Page;
