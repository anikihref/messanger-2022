import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Button from '../components/Button';
import Chat from '../components/Chat';
import NavbarTrigger from '../components/NavbarTrigger';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { fetchChats } from '../store/actions/fetchChats';
import {AiOutlineCloudDownload} from 'react-icons/ai'

const MainLayout = () => {
  const dispatch = useTypedDispatch();
  const { chats } = useTypedSelector((state) => state.chat);
  const { user } = useTypedSelector((state) => state.user);
  const [chatsLimit, setChatsLimit] = useState<number>(20);

  useEffect(() => {
    if (user) {
      dispatch(fetchChats({ userId: user.id, limit: chatsLimit }));
    }
  }, [user, chatsLimit]);

  return (
    <div className='h-full  bg-neutral'>
      <div className='container max-h-[90%] flex'>
        {/* Chatlist */}
        <div className='w-[40%] p-5 flex flex-col gap-y-2 overflow-y-auto'>
          {chats.toString() ? (
            chats.map((chat) => (
              <Button key={chat.id}>
                <Chat chat={chat} />
              </Button>
            ))
          ) : (
            <div>no chats yet</div>
          )}

            {/* load more button */}
            <div className='w-1/2 min-w-[50px] mx-auto mt-5 '>
              <Button>
                <div className='border-cold-200 border-2 flex items-center px-2'>
                  <div className='h-[50px] flex items-center tracking-wide text-lg'>Load more</div>
                  <div className='w-[2rem] ml-3'>
                    <AiOutlineCloudDownload size={'100%'}/>
                  </div>
                </div>
                
              </Button>
            </div>
            
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
