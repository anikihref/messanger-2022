import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import { ChatPage, LoginPage, MainPage, ProfilePage, RegistrationPage, SearchPage, SettingsPage, UserPage } from './pages';


function App() {
  return (
    
    <Routes>
      <Route path='/auth/' element={<AuthLayout />}>
        <Route path='login' element={<LoginPage />}/>
        <Route path='registration' element={<RegistrationPage />}/>
      </Route>

      <Route path='/' element={<MainPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/user/:id' element={<UserPage />} />
      <Route path='/chat/:id' element={<ChatPage />} />
      <Route path='/settings' element={<SettingsPage />} />
      <Route path='/search' element={<SearchPage />} />
    </Routes>
  );
}

export default App;
