import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../hooks/redux';
import { IChatMessage } from '../types/chatMessage';

interface ChatMessageProps {
  message: IChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message: { chat, content, createdAt, creator, updatedAt, type },
}) => {
  const user = useTypedSelector((state) => state.user.user);

  return (
    <div className='relative'>
      <div
        className={`bg-blue-200 max-w-[45%] p-2.5 relative ${
          creator.id === user?.id ? 'ml-auto' : ''
        }`}
      >
        {/* arrow */}
        <div className='absolute w-0 h-0 border-l-[15px] border-t-[10px] border-b-[10px] border-b-transparent border-t-transparent  border-l-blue-200 right-0 top-1/2 -translate-y-1/2 translate-x-[92%]'></div>
        <div className='flex justify-between'>
          {/* username */}
          <h4 className='text-white text-base font-title'>
            <Link to={`/user/${creator.id}`}>{creator.username}</Link>
          </h4>

          {/* created at */}
          <div className='text-xs text-white opacity-70'>
            {moment(createdAt).format('LTS')}
          </div>
        </div>

        {/* content */}
        <div className='text-white font-content text-sm min-h-[50px] mt-2'>
          {content}
        </div>
      </div>

      <div className='absolute -right-[14%] top-1/2 -translate-y-1/2 w-[50px] aspect-square bg-gray-300 rounded-full overflow-hidden z-[10]'>
        
        <img src={'http://localhost:5000/static/empty_avatar.png'} alt='avatar'/>
        {/* <img src={creator.avatar || 'http://localhost:5000/static/empty_avatar.png'} alt='avatar'/> */}
      </div>
    </div>
      

  );
};

export default ChatMessage;
