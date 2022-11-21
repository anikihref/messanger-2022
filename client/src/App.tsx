import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import AuthLayout from './layout/AuthLayout';
import FullpageLayout from './layout/FullpageLayout';
import MainLayout from './layout/MainLayout';
import { ChatPage, LoginPage, MainPage, ProfilePage, RegistrationPage, SearchPage, SettingsPage, UserPage } from './pages';
import MessagesPage from './pages/MessagesPage';
import { fetchUser } from './store/actions/fetchUser';
import messageWS from './websockets/messageWS';



function App() {
  const dispatch = useTypedDispatch();
  const {user} = useTypedSelector(state => state.user)

  useEffect(() => {
    if (user?.id) {
      messageWS.connect('ws://localhost:8000', user.id)
    }
  }, [user])

  useEffect(() => {
    dispatch(fetchUser(window.confirm() ? 'grandwar319a@gmail.com' : 'grandwar39@gmail.com'))
  }, [])

  return (
    
    <Routes>
      <Route path='/auth/' element={<AuthLayout />}>
        <Route path='login' element={<LoginPage />}/>
        <Route path='registration' element={<RegistrationPage />}/>
      </Route>

      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />}></Route>
        <Route path='search' element={<SearchPage />} />
        <Route path='chat/:id' element={<ChatPage />} />
      </Route>

      <Route path='/' element={<FullpageLayout />}>
        <Route path='user/:id' element={<UserPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='settings' element={<SettingsPage />} />
        <Route path='messages' element={<MessagesPage />} />
        <Route path='user/:id' element={<UserPage />} />
        <Route path='search' element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
