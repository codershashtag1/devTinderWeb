import { io } from 'socket.io-client';
import { BASE_URL } from './constants';

const createSocketConnection = () => {
  try {
    if (location.hostname === 'localhost') {
      return io(BASE_URL)
    } else {
    return io("/", {
      path: "/api/socket.io"
    });
    }
    
  } catch(err) {
    console.error('Error creating socket connection:', err);
  }
}

export default createSocketConnection;