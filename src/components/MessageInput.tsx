import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import Cancel from "../img/xmark-solid.svg?react"
import Attach from "../img/paperclip-solid.svg?react"
import { EmojiPicker } from './EmojiPicker';

type quotedMessageProps = {
  username: string;
  text: string;
}

type MessageInputProps = {
  onMessageSubmit: Function;
  quotedMessage: quotedMessageProps | null;
  setQuotedMessage: Function;
  setImage: Function;
  image: string | null;
}

export const MessageInput = ({ onMessageSubmit, quotedMessage, setQuotedMessage,
setImage, image }: MessageInputProps) => {
  const [text, setText] = useState('');

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
    }

    const compressedFile = await imageCompression(file, options);
    const compressedImageBase64 = await convertToBase64(compressedFile);

    setImage(compressedImageBase64);
  };

  const convertToBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleEmojiSelect = (emoji: string) => {
    setText(text + emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (text.trim() !== '' || image) {
      onMessageSubmit(text, quotedMessage, image); 
      setText('');
      setImage(null); 
    }
  };

  return (
    <>
      {quotedMessage && (
        <div className='bg-[rgb(51,51,51)] w-full px-[20px] border-b
        border-b-[rgb(32,32,32)] max-h-[40px] h-full flex items-center'>
          <span className='mr-auto'>
            Quoting: {quotedMessage.username}: {quotedMessage.text}
          </span>
          <Cancel className='h-6 w-6 cursor-pointer btn *:fill-gray-300'
          onClick={() => setQuotedMessage(null)} />
        </div>
      )}
      <form className='w-full bg-[rgb(51,51,51)] flex justify-between px-[20px]
      rounded-b-xl max-h-[80px] h-full' 
      onSubmit={handleSubmit}>
        <input className='flex-grow bg-[rgb(51,51,51)] outline-none
        text-[18px] font-medium'
          type="text"
          placeholder="Enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {image && (
          <div className='flex items-center mr-5'>
            <p className='text-green-700 text-[20px] mr-2'>
              Image uploaded
            </p>
            <Cancel className='h-6 w-6 cursor-pointer btn *:fill-gray-300'
            onClick={() => setImage(null)} />
          </div>
        )}
        <label className='flex items-center mr-5'
        htmlFor="attach">
          <Attach className='h-8 w-8 cursor-pointer hover:-rotate-45 btn *:fill-gray-300' />
        </label>
        <input
        title="Select image"
        className='hidden'
        type="file"
        id="attach"
        accept="image/*"
        onChange={handleImageChange}
        />
        <div className='flex items-center mr-5 relative'>
          {showEmojiPicker && <EmojiPicker onSelect={handleEmojiSelect} />}
          <span className='cursor-pointer text-[31px]'
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            😊
          </span>
        </div>
        <button className='text-[18px] btn'
        type="submit">
          Send
        </button>
      </form>
    </> 
  );
}