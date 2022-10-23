import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { chatApi } from '../api/chatApi';
import StatusButton from '../components/StatusButton';
import { useTypedSelector } from '../hooks/redux';
import { IChat } from '../types/chat';
import { IUser } from '../types/user';

const ProfilePage = () => {
  const { user } = useTypedSelector((state) => state.user);
  const [lastChats, setLastChats] = useState<IChat[]>([]);

  useEffect(() => {
    if (!user) return
      chatApi.getAllChats(user.id, 3)
        .then(({data}) => setLastChats(data))
    }, [user])

  return (
    <div className='py-10'>
      {user && (
        <>
          <div className='grid grid-cols-[1fr_3fr] gap-5'>
            {/* user avatar block */}
            <div className='bg-purple-100 aspect-square flex flex-col justify-center items-center p-4'>
              {/* avatar */}
              <div className='aspect-square w-[135px] relative'>
                <div className='w-full aspect-square rounded-full bg-gray-300 overflow-hidden'>
                  <img src='http://localhost:5000/static/empty_avatar.png' alt='avatar' />
                </div>
                <StatusButton status={user.status} />
              </div>

              {/* username */}
              <div className='text-4xl mt-8 text-white font-title'>
                {user.username}
              </div>
            </div>
              
            {/* info */}
            <div className='bg-blue-200 p-2 flex flex-col'>
              {/* name */}
              <div className='font-content text-4xl text-white mb-4'>
                {user.name || 'Name was not provided'} 
              </div>

              {/* bio */}
              <div className='text-white font-content text-xl grow'>
                {user.bio || 'Bio was not provided'}
              </div>
              
              {/* email phone */}
              <div className='opacity-70 text-lg text-white'>
                {/* email */}
                <div>
                  {user.email || 'Email was not provided'}
                </div>

                {/* phone */}
                <div>
                  {user.phoneNumber  || 'Phone was not provided'}
                </div>
              </div>
            </div>

            {/* Link socials */}
            <button className='bg-purple-200 text-white text-xl font-content py-3 px-4'>Link your socials</button>

            {/* buttons */}
            <div className='flex justify-between gap-6'>
              <button className='w-full bg-blue-300 text-white text-xl font-content py-3 px-4'>Edit info</button>
              <button className='w-full bg-blue-300 text-white text-xl font-content py-3 px-4'>Home</button>
            </div>
          </div>

          <div className='grid grid-cols-[1fr_1fr] gap-6 mt-20'>
            {/* friend list */}
            <div className='pt-[7rem]'>
              {/* title */}
              <h3 className='text-white text-4xl font-content mb-4 relative before:absolute before:w-full before:h-[2px] before:bg-white before:-bottom-[5px] before:opacity-50'>Friend list</h3>

              {/* list */}
              <div className='grid grid-cols-[1fr_1fr] gap-3'>
                {user.friends.toString() ? user.friends.map(friend => (
                  <React.Fragment key={friend.id}>
                    <div className='bg-blue-200 text-white flex items-center'>
                      <Link to={`/user/${friend.id}`}>
                        <div className='p-3 flex items-center'>
                          {/* avatar */}
                          <div className='aspect-square w-[50px] min-h-[50px] relative mr-3'>
                            <div className='w-full aspect-square rounded-full bg-gray-300 overflow-hidden '>
                              <img src='http://localhost:5000/static/empty_avatar.png' alt='avatar' />
                            </div>
                            <StatusButton status={user.status} />
                          </div>

                          {/* info */}
                          <div className='flex py-1 flex-col justify-between'>
                            <h5 className='font-title text-xl'>{friend.username}</h5>
                            <div>{user.name || 'Name was not provided'}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </React.Fragment>
                )) : (
                  <div className='text-center text-white opacity-70 text-2xl'>No friends yet</div>
                )}
              </div>
            </div>

            {/* chat list */}
            <div>
              {/* title */}
              <h3 className='text-white text-4xl font-content mb-4 relative before:absolute before:w-full before:h-[2px] before:bg-white before:-bottom-[5px] before:opacity-50'>Last chats</h3>

              {/* list */}
              <div className='grid gap-4'>
                {lastChats.toString() ? lastChats.map(chat => (
                  <React.Fragment key={chat.id}>
                    <Link to={`/chat/${chat.id}`}>
                      {/* Chat element */}
                      <div className='bg-purple-300 text-white p-3 flex items-center'>
                        {/* chat picture */}
                        <div className='bg-gray-300 rounded-full w-[95px] aspect-square overflow-hidden'>
                          <img src="http://localhost:5000/static/empty_avatar.png" alt="chat" />
                        </div>

                        {/* Chat title & message */}
                        <div className='ml-3 flex flex-col justify-between py-1 max-w-[55%] grow'>
                          {/* title */}
                          <h4 className='font-title text-2xl mb-2'>{chat.title}</h4>

                          {/* last message */}
                          <div className='font-content text-lg break-words'>{typeof chat.lastMessage === 'string' ? chat.lastMessage : chat.lastMessage.content}</div>
                        </div>

                        {/* members */}
                        <div className='ml-4'>
                          {/* title */}
                          <h5 className='font-title text-xl text-right'>Members:</h5>

                          <ul className='opacity-70  text-right'>
                            {/* chat.members is an array of user IDs or User Objects. We check is the array is an object */}
                            <li>{chat.members[0].username}</li>
                            <li>{chat.members[1].username}</li>
                            {chat.members[2] ? (
                              <li>and {chat.members.length - 2} more</li>
                            ) : <li />}
                          </ul>
                        </div>
                      </div>
                    </Link>
                  </React.Fragment>
                )) : (
                  <div className='text-center text-white opacity-70 text-2xl'>No chats</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
