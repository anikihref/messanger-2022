import React from 'react'
import { IUser } from '../types/user';

interface UserAccountButtonProps {
  user: IUser
}

const UserAccountButton: React.FC<UserAccountButtonProps> = ({ user }) => {
  return (
    <div>
      {/* Avatar */}
      <div>
        {/* status */}
        <div></div>
      </div>

      {/* username */}
      <div></div>
    </div>
  )
}

export default UserAccountButton;
