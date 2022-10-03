import { io } from "socket.io-client";
const URL = process.env.SERVER1_URL;
// const socket = io(URL);
const socket = io(URL, { autoConnect: false });
export default socket;
