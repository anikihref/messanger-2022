import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className='h-full  bg-neutral'>
      <div className='container'>
        <Outlet />

        {/* sidebar trigger */}
        <div
          className='fixed bottom-0 h-[10%] left-0 right-0'
          onMouseOver={() => setSidebarOpen(true)}
          onMouseOut={() => {
            setSidebarOpen(false);
          }}    
        >
          {/* line */}
          <div className="container absolute opacity-50 bottom-[20%] h-[20px] left-5 right-5 bg-cold-300 rounded-xl"></div>
          <Navbar isOpened={sidebarOpen}></Navbar>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
