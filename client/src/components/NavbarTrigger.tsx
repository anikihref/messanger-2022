import React, { useState } from 'react';
import useTimeout from '../hooks/useTimeout';
import Navbar from './Navbar';

const NavbarTrigger = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { clear, reset } = useTimeout(() => setSidebarOpen(false), 1000);
  return (
    <div
      className='fixed bottom-0 h-[10%] left-0 right-0 z-[100]'
      onMouseOver={() => {
        clear();
        setSidebarOpen(true);
      }}
      onMouseOut={() => {
        reset();
      }}
    >
      {/* line */}
      <div className='container absolute opacity-50 bottom-[20%] h-[20px] left-5 right-5 bg-cold-300 rounded-xl'></div>
      <Navbar isOpened={sidebarOpen}></Navbar>
    </div>
  );
};

export default NavbarTrigger;
