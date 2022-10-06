import React from 'react'
import { IUser } from '../types/user';
import StatusButton from './StatusButton';

interface UserAccountButtonProps {
  user: IUser
}

const UserAccountButton: React.FC<UserAccountButtonProps> = ({ user }) => {
  return (
    <div>
      {/* Avatar */}
      <div>
        {/* status */}
        <StatusButton status={user.status} />
      </div>

      {/* username */}
      <div></div>
    </div>
  )
}

export default UserAccountButton;
