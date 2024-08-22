import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Địa chỉ server của bạn

export default socket;
