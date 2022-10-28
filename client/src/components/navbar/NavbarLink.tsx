import React from 'react'
import { NavLink } from 'react-router-dom';

interface NavabarLinkProps {
  children: React.ReactNode;
  to: string;
}

const NavbarLink: React.FC<NavabarLinkProps> = ({to, children}) => {
  return (
    <NavLink to={to} className={({isActive}) => isActive ? 'duration-500 rounded-full p-2' : 'duration-500 rounded-full p-2'}>
      {children}
    </NavLink>
  )
}

export default NavbarLink;