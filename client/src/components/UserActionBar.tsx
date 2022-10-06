import React from 'react'
import { MongooseIDType } from '../types'

interface UserActionBarProps {
    userId: MongooseIDType;
}

const UserActionBar: React.FC<UserActionBarProps> = ({ userId }) => {
    

  return (
    <div>
        {/* Add friend or Remove friend button */}
        <div></div>

        {/* Start chating button */}
        <div></div>
    </div>
  )
}

export default UserActionBar