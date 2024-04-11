import { useState } from 'react';

export const JoinForm = ({ onJoin }: {onJoin: Function}) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onJoin(username, room);
  };

  return (
    <div className='w-full h-full flex items-center justify-center flex-col'>
      <h1 className='text-[32px] text-center font-bold text-white mb-5'>
        Join
      </h1>
      <form className='flex flex-col gap-3'
      onSubmit={handleSubmit}>
        <input
          className='min-w-[320px] p-[12px_14px] bg-[rgb(48,43,43)] text-white rounded-xl
          outline-none'
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='min-w-[320px] p-[12px_14px] bg-[rgb(48,43,43)] text-white rounded-xl
          outline-none'
          type="text"
          placeholder="Enter room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button className='cursor-pointer bg-[#0d49d7] font-bold text-white
        rounded-xl p-[12px_14px] btn'
        type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}