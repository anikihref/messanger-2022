import React from 'react'
import { IUser } from '../types/user'
import StatusButton from './StatusButton'

interface UserInfoProps {
    user: IUser
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div>
        {/* Avatar | Username */}
        <div>
            {/* Avatar */}
            <div>

                {/* Status */}
                <StatusButton status={user.status} />
            </div>

            {/* Username */}
            <div></div>
        </div>

        {/* Phone | Email |  Bio | Name */}
        <div>
            {/* Name */}
            <div></div>

            {/* Phone | Email */}
            <div>
                {/* Phone */}
                <div></div>

                {/* Email */}
                <div></div>
            </div>

            {/* Bio */}
            <div></div>
        </div>
    </div>
  )
}

export default UserInfo