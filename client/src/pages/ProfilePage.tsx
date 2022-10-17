import React from 'react'
import FriendList from '../components/FriendList'
import UserInfo from '../components/UserInfo'
import { useTypedSelector } from '../hooks/redux'

const ProfilePage = () => {
  const {user} = useTypedSelector(state => state.user)

  return (
    <div>
      {user && (
        <>
          <UserInfo user={user} />

          <FriendList friends={user.friends} />
        </>
      )}
    </div>
  )
}

export default ProfilePage