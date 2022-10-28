import React from 'react';
import { Link } from 'react-router-dom';
import ChatList from '../components/lists/ChatList';
import FriendList from '../components/lists/FriendList';
import StatusButton from '../components/StatusButton';
import { useTypedSelector } from '../hooks/redux';


const ProfilePage = () => {
  const { user } = useTypedSelector((state) => state.user);

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
              <button className='w-full bg-blue-300 text-white text-xl font-content py-3 px-4'>
                <Link to={'/'}>Home</Link>
              </button>
            </div>
          </div>

          <div className='grid grid-cols-[1fr_1fr] gap-6 mt-20'>
            <div className='pt-[7rem]'>
              {/* title */}
              <h3 className={'text-white text-4xl font-content mb-4 relative before:absolute before:w-full before:h-[2px] before:bg-white before:-bottom-[5px] before:opacity-50' }>Friend list</h3>

              {/* friend list */}
              <div className='grid grid-cols-[1fr_1fr] gap-3'>
                <FriendList/>
              </div>
            </div>

            {/* chat list */}
            <div>
              {/* title */}
              <h3 className={'text-white text-4xl font-content mb-4 relative before:absolute before:w-full before:h-[2px] before:bg-white before:-bottom-[5px] before:opacity-50'}>Last chats</h3>

              {/* list */}
              <div className='grid gap-3'>
                <ChatList limit={3} showMembers={true} itemStyle={{
                  bg: 'bg-purple-300'
                }}/>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
