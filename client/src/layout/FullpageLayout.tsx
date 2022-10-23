import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarTrigger from '../components/NavbarTrigger';

const FullpageLayout = () => {
  return (
    <div className='h-full  min-h-screen bg-blue-500'>
      <div className='container h-full'>
        <Outlet />
      </div>

      {/* navbar trigger */}
      <NavbarTrigger />
    </div>
  );
};

export default FullpageLayout;
