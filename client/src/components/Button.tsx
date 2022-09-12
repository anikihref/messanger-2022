import React from 'react'

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({children}) => {
  return (
    <button className='bg-cold-300 relative z-[1] w-full
    before:-z-[1] before:content-[""] before:right-0 before:top-0 before:bottom-0
    before:bg-hot-100 before:absolute before:w-[20%] before:duration-500 hover:before:w-full'>
      {children}
    </button>
  )
}

export default Button