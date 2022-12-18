import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import StatusButton from './StatusButton';

interface ObjectLinkProps {
    title: string;
    path: string;
    avatar?: string;
    status?: 'online' | 'offline';
    children: React.ReactNode;
}


const ObjectLink: React.FC<ObjectLinkProps> = ({ title, avatar, status, path, children }) => {
  return (
    <div className={`bg-blue-200 text-white min-w-full flex items-center`}>
        <Link to={path}>
            <div className={`p-3 flex items-center`}>
                {/* avatar */}
                <div className={'aspect-square min-w-[50px] max-h-[100px] w-[20%] h-full max-w-[100px] relative mr-3'}>
                    <Avatar src='' size='w-full' />
                    {status &&  <StatusButton status={status || 'offline'} />}
                </div>
                
                {/* info */}
                <div className='flex py-1 flex-col justify-between'>
                    <h5 className={`font-title break-all text-2xl`}>{title}</h5>
                    <div className={`text-lg break`}>{children}</div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ObjectLink