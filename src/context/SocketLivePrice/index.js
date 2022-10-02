import { io } from "socket.io-client";
const URL = process.env.SERVER2_URL;
// const socket = io(URL);
const socketLivePrice = io(URL, { autoConnect: false });
export default socketLivePrice;
