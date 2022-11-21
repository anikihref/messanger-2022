import React from 'react'
import { Link } from 'react-router-dom';
import { TailwindClass } from '../types';
import Avatar from './Avatar';
import StatusButton from './StatusButton';

interface ObjectLinkProps {
    title: {
        value: string
        fontSize?: string;
    };
    text: {
        value: string;
        fontSize?: string;
    };
    path: string;
    avatar?: string;
    status?: 'online' | 'offline';
    styles?: {
        bg?: TailwindClass
        padding: TailwindClass
    }
    
    children?: React.ReactNode;
}


const ObjectLink: React.FC<ObjectLinkProps> = ({ text, title, avatar, status, path, styles, children }) => {
  return (
    <div className={`${styles?.bg || 'bg-blue-200'} text-white min-w-full flex items-center`}>
        <Link to={path}>
            <div className={`${styles?.padding || 'p-3'} flex items-center`}>
                {/* avatar */}
                <div className={'aspect-square min-w-[50px] max-h-[100px] w-[20%] h-full max-w-[100px] relative mr-3'}>
                    <Avatar src='' size='w-full' />
                    {status &&  <StatusButton status={status || 'offline'} />}
                </div>
                
                {/* info */}
                <div className='flex py-1 flex-col justify-between'>
                    <h5 className={`font-title break-all ${title.fontSize || 'text-2xl'}`}>{title.value}</h5>
                    <div className={`${text.fontSize || 'text-lg'} break`}>{text.value}</div>
                </div>

                {children}
            </div>
        </Link>
    </div>
  )
}

export default ObjectLink