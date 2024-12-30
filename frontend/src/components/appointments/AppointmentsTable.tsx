import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Appointment } from "@/types/Appointment";

interface AppointmentsTableProps {
  appointments: Appointment[];
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Data de Início</TableCell>
            <TableCell>Data de Fim</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>
                {new Date(appointment.startDate).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(appointment.endDate).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsTable;
