import React from 'react';
import { NavLink } from 'react-router-dom';
import {AiOutlineHome, AiOutlineSearch, AiOutlineSetting, AiOutlineUser} from 'react-icons/ai'

interface NavbarProps {
  isOpened: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isOpened }) => {
  return (
    <nav className={`${isOpened && 'bottom-[8%]'} fixed w-[33%] rounded-[4rem] flex justify-between items-center py-2 px-3 duration-[800ms] bg-blue-100 left-1/2 -translate-x-1/2 -bottom-[80px]`}>
      
      <NavLink to={'/'} className={({isActive}) => isActive ? 'bg-red-200 duration-500 rounded-full p-2' : 'p-2'}>
        <AiOutlineHome size={'1.8rem'} />
      </NavLink>
      <NavLink to={'/search'} className={({isActive}) => isActive ? 'bg-red-200 duration-500 rounded-full p-2' : 'p-2'}>
        <AiOutlineSearch size={'1.8rem'} />
      </NavLink>
      <NavLink to={'/settings'} className={({isActive}) => isActive ? 'bg-red-200 duration-500 rounded-full p-2' : 'p-2'}>
        <AiOutlineSetting size={'1.8rem'}  />
      </NavLink>
      <NavLink to={'/profile'} className={({isActive}) => isActive ? 'bg-red-200 duration-500 rounded-full p-2' : 'p-2'}>
        <AiOutlineUser size={'1.8rem'}/>
      </NavLink>

    </nav>
  );
};

export default Navbar;
