import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Button from '../components/Button';
import Chat from '../components/Chat';
import NavbarTrigger from '../components/NavbarTrigger';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { fetchChats } from '../store/actions/fetchChats';

const MainLayout = () => {
  const dispatch = useTypedDispatch();
  const {chats} = useTypedSelector(state => state.chat)
  const {user} = useTypedSelector(state => state.user)

  useEffect(() => {
    if (user) {
      dispatch(fetchChats(user.id))
    }
  }, [user])

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
