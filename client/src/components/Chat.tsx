import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { userApi } from '../api/userApi';
import { useTypedSelector } from '../hooks/redux';
import { IChat } from '../types/chat'
import { IUser } from '../types/user';

interface ChatProps {
  chat: IChat;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  const [otherMember, setOtherMember] = useState<IUser>();
  const {user} = useTypedSelector(state => state.user)

  useEffect(() => {
    const otherMemberId = chat.members.find(member => member !== user?.id);
    if (!otherMemberId) return;

    userApi.getUserById(otherMemberId)
      .then(({data}) => {
        setOtherMember(data)
      })
    
  })

  return (
    <Link 
      to={`/chat/${chat.id}`}
      className='flex p-5  border-[3px] border-cold-200'
    >
      {/* avatar */}

        {otherMember &&
          <div className='min-w-[40px] max-w-[15%] flex items-center'>
            <img className='max-w-full max-h-full rounded-full' src={'http://localhost:5000/static/empty_avatar.png'} alt="avatar" />
          </div>
        }
    
      

      <div className='ml-5 text-left'>
        {/* title */}
        <h5 className='font-title font-[700] mb-1'>{chat.title}</h5>
        {/* last message */}
        <div className='font-content text-left w-[220px] truncate'>{chat.lastMessage}</div>
      </div>

      {/* options */}
      <div></div>
    </Link>
  )
}

export default Chat