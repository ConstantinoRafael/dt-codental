import React, { useState } from "react";
import { Modal, Paper, Typography, Button, Box } from "@mui/material";
import apiClient from "@/utils/apiClient";

interface UploadCsvModalProps {
  open: boolean;
  onClose: () => void;
}

const ClientUploadCsvModal: React.FC<UploadCsvModalProps> = ({
  open,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Selecione um arquivo primeiro.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("token");
      await apiClient.post("/clients/upload-csv", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Arquivo enviado com sucesso!");
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      alert("Erro ao enviar o arquivo.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">Upload de Arquivo CSV</Typography>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Enviar
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ClientUploadCsvModal;
