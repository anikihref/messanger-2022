import React from 'react'
import { IUser } from '../../types/user'
import Avatar from '../Avatar'
import StatusButton from '../StatusButton'

interface UserPresentingInfoProps {
    user: IUser
}

const UserPresentingInfo: React.FC<UserPresentingInfoProps> = ({ user }) => {
  return (
    <div className='bg-purple-100 aspect-square flex flex-col justify-center items-center p-4'>
    {/* avatar */}
    <div className='aspect-square w-[135px] relative'>
      <Avatar src='' size='w-full' />
      <StatusButton status={user.status} />
    </div>

    {/* username */}
    <div className='text-4xl mt-8 text-white font-title'>
      {user.username}
    </div>
  </div>
  )
}

export default UserPresentingInfo