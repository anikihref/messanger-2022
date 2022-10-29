import React, { useEffect, useState } from 'react'
import { } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import { useTypedSelector } from '../../hooks/redux';
import { MongooseIDType, TailwindClass } from '../../types';
import { IUser } from '../../types/user';
import ObjectLink from '../ObjectLink';

interface FriendListProps {
    itemStyle?: {
        titleFontSize?: TailwindClass
        textFontSize?: TailwindClass
        bg?: TailwindClass
        padding?: TailwindClass
    };
    friendsFromUserId?: MongooseIDType;
}

const FriendList: React.FC<FriendListProps> = ({ friendsFromUserId, itemStyle }) => {
    const [friends, setFriends] = useState<IUser[]>([]);
    const {user} = useTypedSelector(state => state.user)

    useEffect(() => {
        if (!friendsFromUserId) {
            return setFriends(user?.friends || []);
        }

      userApi.getUserById(friendsFromUserId)
        .then(({data}) => setFriends(data.friends))
    }, [])
    

    return (
        <React.Fragment>
            {friends.toString() ? user?.friends.map(friend => (
                <React.Fragment key={friend.id}>
                    <ObjectLink
                        path={`/user/${friend.id}`} 
                        styles={{
                            padding: itemStyle?.padding || '',
                            bg: itemStyle?.bg || ''
                        }}
                        text={{value: friend.name, fontSize: itemStyle?.textFontSize || ''}} 
                        title={{value: friend.username, fontSize: itemStyle?.titleFontSize || ''}} 
                        status={friend.status} 
                    />
                </React.Fragment>
            )) : (
                <div className='text-center text-white opacity-70 text-2xl'>No friends yet</div>
            )}
        </React.Fragment>
    ) 
}

export default FriendList