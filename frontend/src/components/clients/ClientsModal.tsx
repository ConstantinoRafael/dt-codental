import React from "react";
import { Modal, Paper, Typography } from "@mui/material";
import NovoClienteForm from "./NewClientForm";
import { Client } from "@/types/Client";

interface ClientesModalProps {
  open: boolean;
  onClose: () => void;
  onAddCliente: (newClient: Client) => void;
}

const ClientesModal: React.FC<ClientesModalProps> = ({
  open,
  onClose,
  onAddCliente,
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
        Cadastrar novo Cliente
      </Typography>

      {/* Formulário */}
      <NovoClienteForm onSubmit={onAddCliente} onCancel={onClose} />
    </Paper>
  </Modal>
);

export default ClientesModal;
