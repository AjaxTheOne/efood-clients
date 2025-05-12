import { io } from 'socket.io-client';

const URL = "https://sockets.efood.pagonoudis.gr";
// const URL = import.meta.env.PROD 
//     ? "https://sockets.efood.pagonoudis.gr" 
//     : "http://localhost:3033";

export const socket = io(URL);