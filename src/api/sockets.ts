import { io } from 'socket.io-client';
const URL = 'http://localhost:3033';

export const socket = io(URL);