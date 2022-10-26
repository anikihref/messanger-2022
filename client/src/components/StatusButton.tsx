import React from 'react'

interface StatusButtonProps {
    status: 'online' | 'offline'
}

const StatusButton: React.FC<StatusButtonProps> = ({status}) => {
  return (
    <div className={`${status === 'online' ? 'bg-green-300' : ''} w-[15%] min-w-[10px] rounded-full aspect-square absolute  right-[5%] bottom-[5%]`}>

    </div>
  )
}

export default StatusButton