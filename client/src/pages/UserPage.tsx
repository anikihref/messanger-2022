import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../api/userApi';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { userSlice } from '../store/slices/userSlice';
import {MdKeyboardArrowDown} from 'react-icons/md'
import { chatApi } from '../api/chatApi';
import { MongooseIDType } from '../types';
import Loader from '../components/Loader';
import { UserPresentingInfo, UserInfo } from '../components/user';

const UserPage = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const { selectedUser, user } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState<boolean>();
  const [sharedChat, setSharedChat] = useState<MongooseIDType | null>();
  const [menuDroppedDown, setMenuDroppedDown] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data } = await userApi.getUserById(id);
      
      if (data?.id === user?.id) {
        navigate('/profile', {
          replace: true
        });
      }
        if (!selectedUser) {
          dispatch(userSlice.actions.select(data));
        }
      })();
      
    return () => {
      dispatch(userSlice.actions.resetSelected());
    };
  }, []);

  useEffect(() => {
    if (!user || !selectedUser) return;
    setIsFriend(user?.friends.some(friend => friend.id === selectedUser.id))

    chatApi.getAllChats(user.id, 999)
      .then(({data: chats}) => {
        chats.find(chat => {
          const membersId = chat.members.map(member => {
            return member.id
          })

          if (chat.members.length === 2 && membersId.includes(selectedUser.id!)) {
            setSharedChat(chat.id)
            return true;
          } else if (membersId.includes(selectedUser.id)) {
            setSharedChat(chat.id)
          } else {
            setSharedChat(null)
          }
        })
      }) 
  }, [user, selectedUser])

  const handleFriend = async () => {
    if (!user || !selectedUser) return;

    if (isFriend) {
      userApi.removeFriend(selectedUser?.id, user.id)
        .then(() => dispatch(userSlice.actions.toggleFriend(selectedUser)))
      setIsFriend(false)
    } else {
      await userApi.addFriend(selectedUser?.id, user.id)
        .then(() => dispatch(userSlice.actions.toggleFriend(selectedUser)))
      setIsFriend(true)
    }
  }

  const handleChat = async () => {
    if (!user || !selectedUser) return;

    if (sharedChat) {
      navigate(`/chat/${sharedChat}`)
    } else {
      const {data} = await chatApi.createChat({
        members: [user.id, selectedUser.id],
        title: `${user?.username} ${selectedUser?.username}`
      })

      navigate(`/chat/${data.id}`)
    }
  }
  
  return (
    <div className='min-h-screen py-10'>
      {selectedUser ? (
        <div className='grid grid-cols-[1fr_3fr] gap-5'>
            {/* user avatar block */}
            <UserPresentingInfo user={selectedUser} />
              
            {/* info */}
            <UserInfo user={selectedUser} />

            {/* Linked socials */}
            <div 
              className='bg-purple-200 text-white text-xl font-content py-3 px-4 flex justify-center cursor-pointer items-center relative'
              onClick={() => setMenuDroppedDown(prev => !prev)}
            >
              Linked socials

              <div className={`w-8 ml-2 duration-[500ms] ${menuDroppedDown ?  '-rotate-180' : 'rotate-0'}`}>
                <MdKeyboardArrowDown size={'100%'} />
              </div>

              {/* dropdown menu */}
              <div className={`absolute bottom-[-15px] flex flex-col gap-3 w-full duration-500 ${menuDroppedDown ? 'opacity-100 translate-y-full' : 'opacity-0 translate-y-[90%] invisible'}`}>
                <button className='bg-purple-100 w-full  py-2 px-4'>GitHub</button>
                <button className='bg-purple-100 w-full  py-2 px-4'>Telegram</button>
                <button className='bg-purple-100 w-full  py-2 px-4'>Instagram</button>
              </div>
            </div>

            {/* buttons */}
            <div className='flex justify-between gap-6'>
              <button 
                className='w-full bg-blue-300 text-white text-xl font-content py-3 px-4'
                onClick={handleFriend}
              >
                {isFriend ? 'Remove friend' : 'Add friend'}
              </button>

              <button 
                className='w-full bg-blue-300 text-white text-xl font-content py-3 px-4'
                onClick={handleChat}
              >
                {sharedChat ? `Chat with ${selectedUser.username}` : 'Create chat'}
              </button>
            </div>
          </div>
      ) : (
        <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default UserPage;
