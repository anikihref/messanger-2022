import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../api/userApi';
import StatusButton from '../components/StatusButton';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { userSlice } from '../store/slices/userSlice';
import {MdKeyboardArrowDown} from 'react-icons/md'
import { chatApi } from '../api/chatApi';
import { MongooseIDType } from '../types';

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
            <div className='bg-purple-100 aspect-square flex flex-col justify-center items-center p-4'>
              {/* avatar */}
              <div className='aspect-square w-[135px] relative'>
                <div className='w-full aspect-square rounded-full bg-gray-300 overflow-hidden'>
                  <img src='http://localhost:5000/static/empty_avatar.png' alt='avatar' />
                </div>
                <StatusButton status={selectedUser.status} />
              </div>

              {/* username */}
              <div className='text-4xl mt-8 text-white font-title'>
                {selectedUser.username}
              </div>
            </div>
              
            {/* info */}
            <div className='bg-blue-200 p-2 flex flex-col'>
              {/* name */}
              <div className='font-content text-4xl text-white mb-4'>
                {selectedUser.name || 'Name was not provided'} 
              </div>

              {/* bio */}
              <div className='text-white font-content text-xl grow'>
                {selectedUser.bio || 'Bio was not provided'}
              </div>
              
              {/* email phone */}
              <div className='opacity-70 text-lg text-white'>
                {/* email */}
                <div>
                  {selectedUser.email || 'Email was not provided'}
                </div>

                {/* phone */}
                <div>
                  {selectedUser.phoneNumber  || 'Phone was not provided'}
                </div>
              </div>
            </div>

            {/* Linked socials */}
            <button 
              className='bg-purple-200 text-white text-xl font-content py-3 px-4 flex justify-center items-center relative'
              onClick={() => setMenuDroppedDown(prev => !prev)}
            >
              Linked socials

              <div className={`w-8 ml-2 duration-[500ms] ${menuDroppedDown ?  '-rotate-180' : 'rotate-0'}`}>
                <MdKeyboardArrowDown size={'100%'} />
              </div>

              {/* dropdown menu */}
              <div className={`absolute bottom-[-15px] flex flex-col gap-3 w-full duration-500 ${menuDroppedDown ? 'opacity-100 translate-y-full' : 'opacity-0 translate-y-[90%]'}`}>
                <button className='bg-purple-100 w-full  py-2 px-4'>GitHub</button>
                <button className='bg-purple-100 w-full  py-2 px-4'>Telegram</button>
                <button className='bg-purple-100 w-full  py-2 px-4'>Instagram</button>
              </div>
            </button>

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
        <div>user not found</div>
      )}
    </div>
  );
};

export default UserPage;
