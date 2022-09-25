import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarTrigger from '../components/NavbarTrigger';

const FullpageLayout = () => {
  return (
    <div className='h-full  bg-neutral'>
      <div className='container max-h-[90%] flex'>
        <Outlet />
      </div>

      {/* navbar trigger */}
      <NavbarTrigger />
    </div>
  );
};

export default FullpageLayout;
