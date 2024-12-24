"use client";

import React, { useState } from "react";
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

const clientesData = [
  {
    nome: "João Silva",
    endereco: "Rua A, 123",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01001-000",
    telefone: "(11) 99999-9999",
    cpf: "123.456.789-00",
  },
  {
    nome: "Maria Oliveira",
    endereco: "Av. B, 456",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    cep: "20000-000",
    telefone: "(21) 88888-8888",
    cpf: "987.654.321-11",
  },
  {
    nome: "Carlos Souza",
    endereco: "Rua C, 789",
    cidade: "Belo Horizonte",
    estado: "MG",
    cep: "30000-000",
    telefone: "(31) 77777-7777",
    cpf: "111.222.333-44",
  },
];

export default function ClientesPage() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nome");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const sortedClientes = clientesData.sort((a, b) => {
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "nome",
                "endereco",
                "cidade",
                "estado",
                "cep",
                "telefone",
                "cpf",
              ].map((column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={() => handleRequestSort(column)}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClientes.map((cliente, index) => (
              <TableRow key={index}>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.endereco}</TableCell>
                <TableCell>{cliente.cidade}</TableCell>
                <TableCell>{cliente.estado}</TableCell>
                <TableCell>{cliente.cep}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell>{cliente.cpf}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={clientesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
