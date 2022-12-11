import React from 'react'
import { TailwindClass } from '../types';
import Triangle from './Triangle';

interface ContextMenuProps {
    children: React.ReactNode;
    arrowDirection?: 'right' | 'top' | 'bottom' | 'left'
    isVisible: boolean;
}

const ContextMenu : React.FC<ContextMenuProps> = ({children, isVisible, arrowDirection = 'top'}) => {
  // returns an array with arrow position [0] and context menu position[1] according to closest relative parent
  function getPosition(): [TailwindClass, TailwindClass] {
    switch(arrowDirection) {
      case 'top': {
        return [
          'left-1/2 top-0 -translate-y-[95%] -translate-x-1/2',
          '-translate-x-1/2 left-1/2 -bottom-[20px]'
        ]
      }

      case 'left': {
        return [
          'left-0 top-1/2 -translate-y-1/2 -translate-x-[95%]', 
          '-right-[25px] top-1/2 translate-x-full -translate-y-1/2'
        ]
      }

      case 'right': {
        return [
          'right-0 top-1/2 -translate-y-1/2 translate-x-[95%]', 
          '-left-[25px] top-1/2 -translate-x-full -translate-y-1/2'
        ]
      }

      case 'bottom': {
        return [
          'left-1/2 bottom-0 translate-y-[95%] -translate-x-1/2', 
          '-translate-x-1/2 left-1/2 -top-[20px]'
        ]
      }

      default: {
        return [
          'left-1/2 top-0 -translate-y-full -translate-x-1/2',
          '-translate-x-1/2 left-1/2 -bottom-[20px]'
        ]
      }
    }
  }

  return (
    <div className={`absolute z-[100] duration-500 min-w-[200px] 'bg-blue-100' max-w-[550px] w-fit ${getPosition()[1]} ${isVisible ? 'opacity-100 visible' : 'invisible opacity-0'}`}>
        <div className={`absolute ${getPosition()[0]}`}>
          <Triangle direction={arrowDirection} />
        </div>
        {children}
    </div>
  )
}

export default ContextMenu