import React, { useEffect, useState } from 'react'
import { } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import { useTypedSelector } from '../../hooks/redux';
import { MongooseIDType } from '../../types';
import { IUser } from '../../types/user';
import ObjectLink from '../ObjectLink';

interface FriendListProps {
    userId?: MongooseIDType;
}

const FriendList: React.FC<FriendListProps> = ({ userId }) => {
    const [friends, setFriends] = useState<IUser[]>([]);
    const {user} = useTypedSelector(state => state.user)

    useEffect(() => {
        if (!userId) {
            return setFriends(user?.friends || []);
        }

      userApi.getUserById(userId)
        .then(({data}) => setFriends(data.friends))
    }, [])
    

    return (
        <React.Fragment>
            {friends.toString() ? user?.friends.map(friend => (
                <React.Fragment key={friend.id}>
                    <ObjectLink
                        path={`/user/${friend.id}`}  
                        title={friend.username} 
                        status={friend.status} 
                    >{friend.name}</ObjectLink>
                </React.Fragment>
            )) : (
                <div className='text-center text-white opacity-70 text-2xl'>No friends yet</div>
            )}
        </React.Fragment>
    ) 
}

export default FriendList