import { io } from 'socket.io-client';
import { BASE_URL } from './constants';

const createSocketConnection = () => {
  try {
    return io(BASE_URL)
  } catch(err) {
    console.error('Error creating socket connection:', err);
  }
}

export default createSocketConnection;