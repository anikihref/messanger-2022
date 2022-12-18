import React from 'react'
import { TailwindClass } from '../../types';

interface ButtonProps {
    styles?: {
        bg?: TailwindClass;
        margins?: TailwindClass;
        paddings?: TailwindClass;
        custom?: TailwindClass;
    };
    type?: 'submit' | 'button' | 'reset';
    children?: React.ReactNode;
    onClick?: (event?: React.MouseEvent<any>) => void;
}

const Button: React.FC<ButtonProps> = ({ children, styles, type, onClick }) => {
  return (
    <button 
        type={type || 'button'}
        onClick={onClick} 
        className={`
            ${styles?.bg || 'bg-purple-100'} 
            ${styles?.margins || ''} 
            ${styles?.paddings || 'py-2 px-5'}
            text-white font-title text-lg ${styles?.custom}`
        }
    >
        {children}
    </button>
  )
}

export default Button