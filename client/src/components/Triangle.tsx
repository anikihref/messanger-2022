import React from 'react'
import { TailwindClass } from '../types';

interface TriangleProps {
    className?: string;
    direction?: 'right' | 'top' | 'bottom' | 'left';
}



const Triangle: React.FC<TriangleProps> = ({ className, direction = 'top' }) => {
    function getTriangleDirection(): TailwindClass {
        switch(direction) {
            case 'bottom': {
                return 'border-l-[10px] border-t-[15px] border-r-[10px] border-l-transparent border-r-transparent border-t-blue-100'
            }

            case 'right': {
                return 'border-l-[15px] border-t-[10px] border-b-[10px] border-t-transparent border-b-transparent border-l-blue-100'
            }

            case 'top': {
                return 'border-b-[15px] border-r-[10px] border-l-[10px] border-l-transparent border-r-transparent  border-b-blue-100'
            }

            case 'left': {
                return 'border-r-[15px] border-t-[10px] border-b-[10px] border-t-transparent border-b-transparent border-r-blue-100'
            }

            default: {
                return ''
            }
        }
    }

  return (
    <div
        className={`
            w-0 h-0 ${getTriangleDirection()}
        `}
    >
    </div>
  )
}

export default Triangle