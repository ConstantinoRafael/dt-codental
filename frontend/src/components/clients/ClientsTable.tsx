import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Client } from "@/types/Client";

interface ClientesTableProps {
  clients: Client[];
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: (property: string) => void;
}

const ClientesTable: React.FC<ClientesTableProps> = ({
  clients,
  order,
  orderBy,
  onRequestSort,
}) => {
  const columns = [
    "Nome",
    "Endereco",
    "Cidade",
    "Estado",
    "CEP",
    "Telefone",
    "CPF",
    "createdAt",
  ];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>
                {["Nome", "Estado", "createdAt"].includes(column) ? (
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={() => onRequestSort(column)}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableSortLabel>
                ) : (
                  column.charAt(0).toUpperCase() + column.slice(1)
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
  );
};

export default ClientesTable;
