import { io } from "socket.io-client";

const socket = io(
  "https://community-dabba-service-manager.onrender.com"
);

export default socket;