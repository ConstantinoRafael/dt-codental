import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export default io;
