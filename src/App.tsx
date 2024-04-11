/// <reference types="vite-plugin-svgr/client" />

import { useState } from 'react';
import { ChatRoom } from './pages/ChatRoom';
import { JoinForm } from './components/JoinForm';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [room, setRoom] = useState(localStorage.getItem('room') || '');

  const handleJoin = (user: string, room: string) => {
    setUsername(user);
    setRoom(room);
    localStorage.setItem('username', user);
    localStorage.setItem('room', room);
  };

  const handleLeave = () => {
    setUsername('');
    setRoom('');
    localStorage.removeItem('username');
    localStorage.removeItem('room');
  };

  return (
    <div className='text-[rgb(48,43,43)] h-[100vh] bg-[rgb(99,37,169)]'>
      {username && room ? (
        <ChatRoom username={username} room={room} onLeave={handleLeave} />
      ) : (
        <JoinForm onJoin={handleJoin} />
      )}
    </div>
  );
}

export default App;