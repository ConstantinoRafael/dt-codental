"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Typography,
} from "@mui/material";
import apiClient from "@/utils/apiClient";

export default function ClientesPage() {
  const [clients, setClients] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Nome");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

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
        console.log(response.data.clients);
        setClients(response.data.clients);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClients();
  }, [page, rowsPerPage]);

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedClientes = clients.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedClientes = sortedClientes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Clientes
      </Typography>
      <a href="/admin/clientes/novo-cliente">+ Cadastrar novo Cliente</a>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Nome",
                "Endereco",
                "Cidade",
                "Estado",
                "CEP",
                "Telefone",
                "CPF",
                "createdAt",
              ].map((column) => (
                <TableCell key={column}>
                  {["Nome", "Estado", "createdAt"].includes(column) ? ( // Condição para exibir o TableSortLabel
                    <TableSortLabel
                      active={orderBy === column}
                      direction={orderBy === column ? order : "asc"}
                      onClick={() => handleRequestSort(column)}
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </TableSortLabel>
                  ) : (
                    column.charAt(0).toUpperCase() + column.slice(1) // Apenas o nome da coluna, sem ordenação
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {clients.map((cliente, index) => (
              <TableRow key={index}>
                <TableCell>{cliente.Nome}</TableCell>
                <TableCell>{cliente.Endereço}</TableCell>
                <TableCell>{cliente.Cidade}</TableCell>
                <TableCell>{cliente.Estado}</TableCell>
                <TableCell>{cliente.CEP}</TableCell>
                <TableCell>{cliente.Telefone}</TableCell>
                <TableCell>{cliente.CPF}</TableCell>
                <TableCell>{cliente.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
