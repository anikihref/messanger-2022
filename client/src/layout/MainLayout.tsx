import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useTimeout from '../hooks/useTimeout';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const {clear, reset} = useTimeout(() => setSidebarOpen(false) , 1000);

  useEffect(() => {
    clear()
  })

  return (
    <div className='h-full  bg-neutral'>
      <div className='container'>
        <Outlet />

        {/* sidebar trigger */}
        <div
          className='fixed bottom-0 h-[10%] left-0 right-0'
          onMouseOver={() => {
            clear()
            setSidebarOpen(true)
          }}
          onMouseOut={() => {
            reset()
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
