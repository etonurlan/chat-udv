import ArrowQuote from "../img/arrow-turn-up-solid.svg?react"

type MessageListProps = {
  messages: Message[];
  user: string;
  setQuotedMessage: Function;
}
export type Message = {
  username: string;
  text: string;
  timestamp: string;
  image: string | null;
  quotedMessage: Message | null;
}

export const MessageList = ({ messages, user, setQuotedMessage }: MessageListProps) => {
  const handleQuoteMessage = (message: Message) => {
    setQuotedMessage(message);
  };
  
  return (
    <ul className="flex-grow flex-col flex overflow-y-auto
    w-full text-[18px] bg-[rgb(35,35,35)] p-8 gap-2">
      {messages.map((message, index) => (
        <li className={`flex ${user == message.username && "flex-row-reverse"}`}
        key={index}>
          <div className={`flex flex-col ${user == message.username && "items-end"}`}>
            <span className={`text-[rgb(176,176,176)] flex 
            ${user == message.username && 'justify-end'}`}>
              {message.username}
            </span>
            {message.quotedMessage && (
              <div className="bg-gray-300 p-2 mb-2 rounded-md">
                <span className="font-bold">{message.quotedMessage.username}: </span>
                <span>{message.quotedMessage.text}</span>
              </div>
            )}
            {message.image && (
              <img className="w-[50%] mb-2"
              src={message.image} alt="Uploaded" />
            )} 
            <div className={`flex items-center
            ${user == message.username && "justify-end"}`}>
              {user == message.username ? (
                <>
                  <ArrowQuote height="25" width="20"
                  className="mr-2 opacity-0 hover:opacity-100
                  cursor-pointer *:fill-gray-300 btn hover:-rotate-90"
                  onClick={() => handleQuoteMessage(message)} />
                  <p className={`rounded-xl p-[10px] bg-[#0d49d7]`}>
                    {message.text}
                  </p>
                </>
              ) : (
                <>
                  <p className={`rounded-xl p-[10px] mr-2 bg-[#514c4c]`}>
                    {message.text}
                  </p>
                  <ArrowQuote height="25" width="20" 
                  className="opacity-0 hover:opacity-100
                  cursor-pointer *:fill-gray-300 btn hover:-rotate-90"
                  onClick={() => handleQuoteMessage(message)} />
                </>
              )}
            </div>
          </div>  
        </li>
      ))}
    </ul>
  );
}