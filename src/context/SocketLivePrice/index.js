import { SERVER2 } from '../../config';
import { io } from "socket.io-client";
const URL = `${SERVER2}`;
// const socket = io(URL);
const socketLivePrice = io(URL, { autoConnect: false });
export default socketLivePrice;
