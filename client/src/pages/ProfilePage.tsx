import React from 'react';
import { Link } from 'react-router-dom';
import {FriendList, ChatList} from '../components/lists/index';
import { UserInfo, UserPresentingInfo } from '../components/user/index';
import { useTypedSelector } from '../hooks/redux';


const ProfilePage = () => {
  const { user } = useTypedSelector((state) => state.user);

  return (
    <div className='py-10'>
      {user && (
        <>
          <div className='grid grid-cols-[1fr_3fr] gap-5'>
            {/* user avatar block */}
            <UserPresentingInfo user={user} />

              
            {/* info */}
            <UserInfo user={user} />

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
