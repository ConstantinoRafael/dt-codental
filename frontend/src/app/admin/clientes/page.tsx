"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Add, Upload, ArrowBack } from "@mui/icons-material"; // Importando a seta
import apiClient from "@/utils/apiClient";
import ClientesTable from "@/components/clients/ClientsTable";
import ClientesPagination from "@/components/clients/ClientsPagination";
import ClientesModal from "@/components/clients/ClientsModal";
import { Client } from "@/types/Client";
import ClientUploadCsvModal from "@/components/clients/ClientsUploadCSVModal";
import { useRouter } from "next/navigation"; // Importando useRouter para navegação

const ClientesPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("Nome");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState<boolean>(false);

  const router = useRouter(); // Para navegação

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

  useEffect(() => {
    fetchClients();
  }, [page, rowsPerPage, orderBy, order]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenCsvModal = () => setIsCsvModalOpen(true);
  const handleCloseCsvModal = () => {
    setIsCsvModalOpen(false);
    fetchClients(); // Atualiza os dados ao fechar o modal de CSV
  };

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

  const handleBackClick = () => {
    router.push("/admin"); // Redireciona para a página /admin
  };

  return (
    <Paper sx={{ padding: 2 }}>
      {/* Header com Título e Seta */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <ArrowBack
            sx={{ cursor: "pointer", marginRight: 2 }}
            onClick={handleBackClick} // Redireciona para /admin ao clicar
          />
          <Typography variant="h6" gutterBottom>
            Lista de Clientes
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Cadastrar Cliente
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<Upload />}
            onClick={handleOpenCsvModal}
          >
            Upload CSV
          </Button>
        </Box>
      </Box>

      {clients.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="textSecondary">
            Ainda não há clientes cadastrados.
          </Typography>
        </Box>
      ) : (
        <>
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
        </>
      )}

      <ClientesModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddCliente={handleAddCliente}
      />

      <ClientUploadCsvModal
        open={isCsvModalOpen}
        onClose={handleCloseCsvModal}
      />
    </Paper>
  );
};

export default ClientesPage;
