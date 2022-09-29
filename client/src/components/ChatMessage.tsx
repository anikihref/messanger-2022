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
    <div className={`max-w-[45%] min-w-[20%] flex flex-col mr-2 px-2 pt-2 pb-1 border-2 border-cold-300  ${creator.id === user?.id ? 'ml-auto' : ''}`}>

      {/* username */}
      <h4 className={`text-cold-200 mb-3 ${creator.id === user?.id ? 'ml-auto' : ''}`}>
        <Link to={`/user/${creator.id}`}>
          {creator.username}
        </Link>
      </h4>
      


      {/* message info */}
      <div className={`${creator.id === user?.id ? 'ml-auto' : ''}`}>
        {/* content */}
        <div className={`${creator.id === user?.id ? 'text-right' : ''} mb-2`}>
          {content}
        </div>

        <div className='flex justify-between gap-5 text-xs text-gray-600 opacity-80'>
          {/* create at */}
          <div>{moment(createdAt).format('LTS')}</div>
          {/* updated at */}
          <div>{moment(updatedAt).format('LTS')}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
