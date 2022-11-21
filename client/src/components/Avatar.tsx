import React from 'react'
import { TailwindClass } from '../types';

interface AvatarProps {
  src: string;
  size?: TailwindClass
}

const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <div className={`bg-gray-300 rounded-full aspect-square overflow-hidden z-[100] cursor-pointer ${size || 'w-[50px]'}`}>
        <img src={src || "http://localhost:5000/static/empty_avatar.png"} alt="avatar" />
    </div>
  )
}

export default Avatar