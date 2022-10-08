import { SERVER1 } from "../../config";
import { io } from "socket.io-client";
const URL = `${SERVER1}`;
const socket = io(URL, { autoConnect: false });
export default socket;