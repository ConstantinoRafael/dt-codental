import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null; // Variável para armazenar a instância do Socket.IO

export function configureSocket(server: HttpServer) {
  io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:3000", // Permitir conexões do frontend
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true, // Permitir cookies, se necessário
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
}

// Função para acessar a instância do Socket.IO em outros arquivos
export function getSocketIO(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
}
