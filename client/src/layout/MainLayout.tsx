import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Button from '../components/Button';
import Chat from '../components/Chat';
import Navbar from '../components/Navbar';
import NavbarTrigger from '../components/NavbarTrigger';
import { useTypedSelector } from '../hooks/redux';
import useTimeout from '../hooks/useTimeout';

const MainLayout = () => {

  const {chats} = useTypedSelector(state => state.chat)

  useEffect(() => {

  })

  return (
    <div className='h-full  bg-neutral'>
      <div className='container max-h-[90%] flex'>
        {/* Chatlist */}
        <div className='w-[40%] p-5 flex flex-col gap-y-2 overflow-y-auto'>
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
          <div className='grow overflow-y-auto p-2'>
            <Outlet />  
          </div>


        </div>
        {/* navbar trigger */}
        <NavbarTrigger />
    </div>
  );
};

export default MainLayout;
