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
    { label: "Nome", value: "name" },
    { label: "Endereco", value: "address" },
    { label: "Cidade", value: "city" },
    { label: "Estado", value: "state" },
    { label: "CEP", value: "zip" },
    { label: "Telefone", value: "phone" },
    { label: "CPF", value: "cpf" },
    { label: "Data de Criação", value: "created_at" },
  ];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.value}>
                {["name", "state", "created_at"].includes(column.value) ? (
                  <TableSortLabel
                    active={orderBy === column.value}
                    direction={orderBy === column.value ? order : "asc"}
                    onClick={() => onRequestSort(column.value)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((cliente, index) => (
            <TableRow key={index}>
              <TableCell>{cliente.name}</TableCell>
              <TableCell>{cliente.address}</TableCell>
              <TableCell>{cliente.city}</TableCell>
              <TableCell>{cliente.state}</TableCell>
              <TableCell>{cliente.zip}</TableCell>
              <TableCell>{cliente.phone}</TableCell>
              <TableCell>{cliente.cpf}</TableCell>
              <TableCell>{cliente.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientesTable;
