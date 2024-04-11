export const EmojiPicker = ({ onSelect }: { onSelect: Function }) => {
    const emojis = ['😀', '😂', '😊', '😍', '👍', '👌', '🎉', '❤️', '😎', '🙌'];
  
    const handleEmojiClick = (emoji: string) => {
      onSelect(emoji);
    };
  
    return (
      <div className="absolute max-w-[200px] overflow-x-auto top-[-50px]
      text-nowrap left-[-190%] bg-[rgb(51,51,51)] emoji rounded-xl p-1">
        {emojis.map((emoji, index) => (
          <span className="cursor-pointer mr-[5px] w-8 h-8 text-[20px]" 
          key={index} onClick={() => handleEmojiClick(emoji)}>
            {emoji}
          </span>
        ))}
      </div>
    );
};