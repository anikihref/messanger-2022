import React, { useEffect, useState } from 'react'
import { IUser } from '../types/user';
import UserAccountButton from './UserAccountButton';

interface FriendListProps {
    friends: string[];
}

const FriendList: React.FC<FriendListProps> = ({friends}) => {
    const [friendsInfo, setFriendsInfo] = useState<IUser[]>()

    useEffect(() => {
        (async () => {
            // fetch all friends
        })()
    })

  return (
    <div>
        {friendsInfo?.map(friend => (
            <UserAccountButton key={friend.id} user={friend}/>
        ))}
    </div>
  )
}

export default FriendList