import io from 'socket.io-client';

const socket = io('http://192.168.10.10:3000');

export default socket;
