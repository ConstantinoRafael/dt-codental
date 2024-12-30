import React from "react";
import { Modal, Paper, Typography } from "@mui/material";
import { Appointment } from "@/types/Appointment";
import NewAppointmentForm from "./NewAppointmentForm";

interface AppointmentsModalProps {
  open: boolean;
  onClose: () => void;
  onAddAppointment: (newAppointment: Appointment) => void;
}

const AppointmentsModal: React.FC<AppointmentsModalProps> = ({
  open,
  onClose,
  onAddAppointment,
}) => (
  <Modal open={open} onClose={onClose}>
    <Paper
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        padding: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Título do Modal */}
      <Typography variant="h6" gutterBottom>
        Cadastrar novo Compromisso
      </Typography>

      {/* Formulário */}
      <NewAppointmentForm onSubmit={onAddAppointment} onCancel={onClose} />
    </Paper>
  </Modal>
);

export default AppointmentsModal;
