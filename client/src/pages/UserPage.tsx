import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../api/userApi';
import FriendList from '../components/FriendList';
import UserActionBar from '../components/UserActionBar';
import UserInfo from '../components/UserInfo';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { userSlice } from '../store/slices/userSlice';

const UserPage = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const { selectedUser, user } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data } = await userApi.getUserById(id);

      if (data.id === user?.id) {
        navigate('/profile');
      }

      dispatch(userSlice.actions.select(data));
    })();

    return () => {
      dispatch(userSlice.actions.resetSelected());
    };
  }, [user]);

  return (
    <div>
      {selectedUser ? (
        <>
          <UserInfo user={selectedUser} />

          <FriendList friends={selectedUser.friends} />

          <UserActionBar />
        </>
      ) : (
        <div>user not found</div>
      )}
    </div>
  );
};

export default UserPage;
