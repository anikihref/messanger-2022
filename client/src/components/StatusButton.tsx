import React from 'react'

interface StatusButtonProps {
    status: 'online' | 'offline'
}

const StatusButton: React.FC<StatusButtonProps> = ({status}) => {
  return (
    <div>
        {status}
    </div>
  )
}

export default StatusButton