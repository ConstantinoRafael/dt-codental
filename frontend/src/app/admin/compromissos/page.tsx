"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import apiClient from "@/utils/apiClient";
import AppointmentsTable from "@/components/appointments/AppointmentsTable";
import AppointmentsModal from "@/components/appointments/AppointmentsModal";
import { Appointment } from "@/types/Appointment";

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await apiClient.get("/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
    handleCloseModal();
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Lista de Compromissos
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenModal}
        >
          Cadastrar Compromisso
        </Button>
      </Box>

      {appointments.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="textSecondary">
            Ainda não há compromissos cadastrados.
          </Typography>
        </Box>
      ) : (
        <AppointmentsTable appointments={appointments} />
      )}

      <AppointmentsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddAppointment={handleAddAppointment}
      />
    </Paper>
  );
};

export default AppointmentsPage;
