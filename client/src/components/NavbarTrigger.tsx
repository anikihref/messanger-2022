import React, { useState } from 'react';
import useTimeout from '../hooks/useTimeout';
import Navbar from './Navbar';

const NavbarTrigger = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { clear, reset } = useTimeout(() => setSidebarOpen(false), 1500);
  return (
    <div
      className='fixed h-[80vh] min-h-[250px] top-1/2 -translate-y-1/2 right-[20px] z-[100]'
      onMouseOver={() => {
        clear();
        setSidebarOpen(true);
      }}
      onMouseOut={() => {
        reset();
      }}
    >
      {/* line */}
      <div className='absolute w-[13px] h-full rounded bg-purple-100'></div>
      <Navbar isOpened={sidebarOpen}></Navbar>
    </div>
  );
};

export default NavbarTrigger;
