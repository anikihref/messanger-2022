import React, { useState } from 'react';
import ContextMenu from '../components/ContextMenu';

interface WithContextMenuProps {
  children: React.ReactNode;
  triggerEvent: {
    type: 'hover' | 'click';
    cb?: (...arg: any) => any;
  };
  arrowDirection?: 'top' | 'bottom' | 'left' | 'right';
}

export const withContextMenu =
  <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & WithContextMenuProps> =>
  ({ triggerEvent, children, arrowDirection, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div  
          className='relative'
          onClick={() => triggerEvent.type === 'click' && setIsVisible(!isVisible)}
          onMouseEnter={() => triggerEvent.type === 'hover' && setIsVisible(true)}
          onMouseLeave={() => triggerEvent.type === 'hover' && setIsVisible(false)}
        >
          <Component {...(props as P)} />
          <ContextMenu arrowDirection={arrowDirection} isVisible={isVisible}>
            {children}
          </ContextMenu>
        </div>)
  };