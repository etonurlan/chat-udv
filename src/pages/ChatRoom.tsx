import { useState, useEffect } from 'react';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import { Message } from '../components/MessageList';

type ChatRoomProps = {
  username: string;
  room: string;
  onLeave: React.MouseEventHandler<HTMLButtonElement>;
}

export const ChatRoom = ({ username, room, onLeave }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [quotedMessage, setQuotedMessage] = useState(null);
  const [image, setImage] = useState(null); 

  useEffect(() => {
    const storedMessages = localStorage.getItem(`${room}-messages`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [room]);

  const handleMessageSubmit = (text: string, quotedMessage: Message, image: string) => {
    const newMessage = {
      username,
      text,
      timestamp: new Date().toISOString(),
      quotedMessage: quotedMessage,
      image: image ? image : null 
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem(`${room}-messages`, JSON.stringify(updatedMessages));
    setQuotedMessage(null);
  };

  useEffect(() => {
    return () => {
      messages.forEach(message => {
        if (message.image) {
          URL.revokeObjectURL(message.image);
        }
      });
    };
  }, [messages]);

  return (
    <>
        <div className='w-full h-[100vh] flex items-center p-[20px] flex-col text-white'>
          <div className='bg-[#333] flex text-white
          px-5 w-full items-center justify-between'>
            <h2 className='text-center text-[20px] font-bold h-[60px]
            items-center justify-center flex'>
              Welcome, {username} to room: {room}
            </h2>
            <button className='bg-[rgb(253,73,73)] rounded-md p-[10px]
            font-semibold btn'
            onClick={onLeave}>
              Leave Room
            </button>
          </div>
          <MessageList messages={messages} user={username} setQuotedMessage={setQuotedMessage} />
          <MessageInput onMessageSubmit={handleMessageSubmit} quotedMessage={quotedMessage}
          setQuotedMessage={setQuotedMessage} image={image} setImage={setImage} />
        </div>
    </>
  );
}