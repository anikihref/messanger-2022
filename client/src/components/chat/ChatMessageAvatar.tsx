import React from 'react'
import { useTypedSelector } from '../../hooks/redux';

interface ChatMessageAvatarProps {
    index: number;
}

const ChatMessageAvatar: React.FC<ChatMessageAvatarProps> = ({ index }) => {
  const {messages} = useTypedSelector(state => state.chatMessage)

  return (
    <div className={`bg-blue-400 w-fit flex items-center px-4 relative pb-4 ${index === 0 ? 'pt-3 border-purple-100 border-t-4' : 'pt-0'} ${index === messages.length - 1 ? 'border-purple-100 border-b-4 pt-1' : ''}`}>
        <div className='bg-gray-300 rounded-full w-[50px] aspect-square overflow-hidden z-[100]'>
            <img src="http://localhost:5000/static/empty_avatar.png" alt="avatar" />
        </div>
    </div>
  )
}

export default ChatMessageAvatar