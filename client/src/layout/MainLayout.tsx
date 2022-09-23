import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Button from '../components/Button';
import Chat from '../components/Chat';
import Navbar from '../components/Navbar';
import { useTypedSelector } from '../hooks/redux';
import useTimeout from '../hooks/useTimeout';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const {clear, reset} = useTimeout(() => setSidebarOpen(false) , 1000);
  const {chats} = useTypedSelector(state => state.chat)

  useEffect(() => {

  })

  return (
    <div className='h-full  bg-neutral'>
      <div className='container max-h-[90%] flex'>
        {/* Chatlist */}
        <div className='w-[40%] p-5 flex flex-col gap-y-2 overflow-y-scroll'>
        {chats.toString() ? chats.map((chat) => (
            <Button
            key={chat.id}>
              <Chat
                
                chat={chat}
              />
            </Button>
          )) : <div>
              no chats yet
            </div>}
        </div>


          {/* Custom content */}
          <div className='grow overflow-auto p-2'>
            <Outlet />  
          </div>


        </div>
        {/* sidebar trigger */}
        <div
          className='fixed bottom-0 h-[10%] left-0 right-0 z-[100]'
          onMouseOver={() => {
            clear()
            setSidebarOpen(true)
          }}
          onMouseOut={() => {
            reset()
          }}    
        >
          {/* line */}
          <div className="container absolute opacity-50 bottom-[20%] h-[20px] left-5 right-5 bg-cold-300 rounded-xl"></div>
          <Navbar isOpened={sidebarOpen}></Navbar>
        </div>
    </div>
  );
};

export default MainLayout;
