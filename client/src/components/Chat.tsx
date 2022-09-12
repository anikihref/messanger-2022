import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../hooks/redux';
import { IChat } from '../types/chat'
import { IUser } from '../types/user';

interface ChatProps {
  chat: IChat;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  const [chatAvatar, setChatAvatar] = useState<string>('http://localhost:5000/static/empty_avatar.png');
  const [secondMember, setSecondMember] = useState<IUser>();
  const {user} = useTypedSelector(state => state.user)

  useEffect(() => {
    if(chat.members && chat.members.length <= 2) {
    
    }
  })

  return (
    <Link 
      to={`/chat/${chat.id}`}
      className='flex p-5  border-[3px] border-cold-200'
    >
      {/* avatar */}
      <div className='rounded-full w-[5%] aspect-square overflow-hidden'>
        {secondMember ? (
          <Link to={`/user/${secondMember.id}`} >
            <img className='min-w-full min-h-full' src={chatAvatar} alt="avatar" />
          </Link>
        ) : (
        <div>
          <img className='min-w-full min-h-full' src={chatAvatar} alt="avatar" />
        </div>
        )}
      </div>
      

      <div className='ml-5'>
        {/* title */}
        <h5 className='font-title font-[700] mb-1'>{chat.title}</h5>
        {/* last message */}
        <div className='font-content text-left'>{chat.lastMessage}</div>
      </div>

      {/* options */}
      <div></div>
    </Link>
  )
}

export default Chat