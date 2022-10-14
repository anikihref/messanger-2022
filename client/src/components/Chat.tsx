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
      className='flex p-4  bg-blue-200 h-[100px]'
    >
      {/* avatar */}

        {otherMember &&
          <div className='w-[70px] aspect-square flex items-center'>
            <img className='max-w-full max-h-full rounded-full' src={'http://localhost:5000/static/empty_avatar.png'} alt="avatar" />
          </div>
        }
    
      

      <div className='text-left flex flex-col justify-around ml-3.5'>
        {/* title */}
        <h5 className='font-title text-2xl text-white'>{chat.title}</h5>
        {/* last message */}
        <div className='font-content text-left text-lg text-white'>{chat.lastMessage}</div>
      </div>  
    </Link>
  )
}

export default Chat