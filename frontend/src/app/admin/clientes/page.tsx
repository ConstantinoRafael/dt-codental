"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import apiClient from "@/utils/apiClient";
import ClientesTable from "@/components/clients/ClientsTable";
import ClientesPagination from "@/components/clients/ClientsPagination";
import ClientesModal from "@/components/clients/ClientsModal";
import { Client } from "@/types/Client";

const ClientesPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("Nome");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await apiClient.get("/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page + 1,
            limit: rowsPerPage,
            sortBy: orderBy,
            order: order,
          },
        });

        setClients(response.data.clients);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClients();
  }, [page, rowsPerPage, orderBy, order]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddCliente = (newClient: Client) => {
    setClients((prev) => [...prev, newClient]);
    setTotalCount((prev) => prev + 1);
    handleCloseModal();
  };

  const handleRequestSort = (property: string) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Lista de Clientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenModal}
        >
          Cadastrar Cliente
        </Button>
      </Box>

      <ClientesTable
        clients={clients}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />

      <ClientesPagination
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={setPage}
        onChangeRowsPerPage={(value) => {
          setRowsPerPage(value);
          setPage(0);
        }}
      />

      <ClientesModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddCliente={handleAddCliente}
      />
    </Paper>
  );
};

export default ClientesPage;
