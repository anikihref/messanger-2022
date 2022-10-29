import React from 'react';
import { IUser } from '../../types/user';

interface UserInfoProps {
    user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className='flex flex-col'>
      {/* name */}
      <div className='font-content text-4xl text-white text-center bg-purple-200 py-4 px-4'>
        {user.name || 'Name was not provided'}
      </div>

      {/* bio */}
      <div className='text-white font-content text-xl grow my-5 px-5 flex items-center justify-center'>
        {user.bio || 'Bio was not provided'}
      </div>

      {/* email phone */}
      <div className='text-xl text-white bg-blue-300 border-b-purple-100 border-b-4 flex justify-evenly itens-center flex-wrap py-4 px-4'>
        {/* email */}
        <div className='opacity-70'>
          {user.email || 'Email was not provided'}
        </div>

        {/* phone */}
        <div className='opacity-70'>
          {user.phoneNumber || 'Phone was not provided'}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
