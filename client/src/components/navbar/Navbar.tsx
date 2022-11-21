import React from 'react';
import {NavbarLink} from './index';
import SvgSelector from '../SvgSelector';

interface NavbarProps {
  isOpened: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isOpened }) => {
  return (
    <nav className={`${isOpened ? 'right-3' : '-right-[100px]'} absolute flex flex-col items-center gap-4 p-4 top-1/2 -translate-y-1/2 rounded-[10px] bg-purple-200 duration-[800ms]`}>
      <NavbarLink to='/'>
        <SvgSelector id='home' />
      </NavbarLink>

      <NavbarLink to='/messages'>
        <SvgSelector id='message' />
      </NavbarLink>

      <NavbarLink to='/search'>
        <SvgSelector id='search' />
      </NavbarLink>

      <NavbarLink to='/settings'>
        <SvgSelector id='settings' />
      </NavbarLink>

      <NavbarLink to='/profile'>
        <SvgSelector id='profile' />
      </NavbarLink>
    </nav>
  );
};

export default Navbar;
