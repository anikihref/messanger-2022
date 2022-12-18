import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/redux';
import { MessageFetchCount } from '../../pages/chat/ChatPage';
import { IChatMessage } from '../../types/chatMessage';

interface ChatMessageProps {
  message: IChatMessage;
  elementRef: React.RefObject<HTMLDivElement>;
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message: { chat, content, createdAt, creator, updatedAt, type },
  elementRef,
  index
}) => {
  const user = useTypedSelector((state) => state.user.user);

  return (
    <div 
      className={`mr-5 mb-4 ${index === 0 ? 'mt-4' : 'mt-0'}`}
      ref={index === MessageFetchCount.FetchLoad ? elementRef : null}>
      <div
        className={`bg-blue-200 max-w-[65%] w-fit min-w-[50%] p-2.5 relative ${
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
          {type === 'image' ? (
            <img src={content} alt="message" />
          ) : (<p>{content}</p>)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
