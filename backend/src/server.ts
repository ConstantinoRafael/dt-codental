import app from "./app"; // Importando o app sem o listen()
import http from "http";
import dotenv from "dotenv";
import { configureSocket } from "./config/socket";

// Carregando variáveis de ambiente
dotenv.config();

// Criando o servidor HTTP com Express
const server = http.createServer(app);

// Configurando o Socket.IO
configureSocket(server);

// Iniciando o servidor na porta 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
