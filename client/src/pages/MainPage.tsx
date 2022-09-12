import React, { useEffect } from 'react';
import Chat from '../components/Chat';
import { useTypedSelector } from '../hooks/redux';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const MainPage = () => {
  const { chats } = useTypedSelector((state) => state.chat);

  useEffect(() => {
    // fetchChats()
  });

  return (
    <div
      className={`pt-10 ${
        !chats ? 'flex items-center justify-center h-full' : ''
      }`}
    >
      {/* chat list */}
      <div className='flex flex-col gap-10'>
        {chats ? (
          chats.map((chat) => (
            <Button>
              <Chat
                key={chat.id}
                chat={chat}
              />
            </Button>
          ))
        ) : (
          <div className='-translate-y-1/2 '>
            <div className='mb-5 text-center font-title text-neutral text-[3rem] bg-hot-200 w-full py-2 px-4'>
              No chats started yet
            </div>

            <Button>
              <Link
                to={'/search'}
                className='text-center text-hot-100 text-xl h-[50px] flex items-center justify-center font-title duration-500 hover:text-cold-300'
              >
                Start chatting
              </Link>
            </Button>

            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
