import React from 'react';
import {AiOutlineHome, AiOutlineSearch, AiOutlineSetting, AiOutlineUser} from 'react-icons/ai'
import NavbarLink from './NavbarLink';

interface NavbarProps {
  isOpened: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isOpened }) => {
  return (
    <nav className={`${isOpened ? 'bottom-[8%]' : '-bottom-[100px]'} fixed w-[33%] rounded-[4rem] flex justify-between items-center py-2 px-3 duration-[800ms] bg-cold-100 left-1/2 -translate-x-1/2`}>
      <NavbarLink to='/'>
        <AiOutlineHome size={'1.8rem'} />
      </NavbarLink>
      <NavbarLink to='/search'>
        <AiOutlineSearch size={'1.8rem'} />
      </NavbarLink>
      <NavbarLink to='/settings'>
        <AiOutlineSetting size={'1.8rem'} />
      </NavbarLink>
      <NavbarLink to='/profile'>
        <AiOutlineUser size={'1.8rem'} />
      </NavbarLink>
    </nav>
  );
};

export default Navbar;
