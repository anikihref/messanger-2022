import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Chat from '../components/Chat';
import NavbarTrigger from '../components/NavbarTrigger';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { fetchChats } from '../store/actions/fetchChats';
import { WSMessage } from '../types';

export let socket: WebSocket | null;

const MainLayout = () => {
  const dispatch = useTypedDispatch();
  const { chats } = useTypedSelector((state) => state.chat);
  const { user } = useTypedSelector((state) => state.user);
  const [chatsLimit, setChatsLimit] = useState<number>(20);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      socket?.send(JSON.stringify({
        connectionId: user?.id,
        type: 'closeMessage'
      } as WSMessage))
      
      socket?.close()
    })
  })

  useEffect(() => {
    socket = new WebSocket('ws://localhost:8000');

    return () => {
      socket?.send(JSON.stringify({
        connectionId: user?.id,
        type: 'closeMessage'
      } as WSMessage))
      
      socket?.close();
      socket = null
    }
  }, [])

  useEffect(() => {

    if (user) {
      dispatch(fetchChats({ userId: user.id, limit: chatsLimit }));
    }
  }, [user, chatsLimit]);

 

  return (
    <div className='h-full bg-blue-500'>
      <div className='container h-full flex'>
        {/* Chatlist */}
        <div className='w-[35%] flex flex-col gap-y-6 p-5 overflow-y-auto bg-blue-400'>
          {chats.toString() ? (
            chats.map((chat) => (
              <Chat key={chat.id} chat={chat} />
            ))
          ) : (
            <div>no chats yet</div>
          )}

            {/* load more button */}
            <div className='w-1/2 min-w-[50px] mx-auto mt-5 '>
              
            </div>
            
        </div>

        {/* Custom content */}
        <div className='grow h-full'>
          <Outlet />
        </div>
      </div>

      {/* navbar trigger */}
      <NavbarTrigger />
    </div>
  );
};

export default MainLayout;
