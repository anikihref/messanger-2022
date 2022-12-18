import React, { useEffect, useState } from 'react'
import { chatApi } from '../../api/chatApi';
import { useTypedSelector } from '../../hooks/redux';
import { MongooseIDType } from '../../types';
import { IChat } from '../../types/chat';
import ObjectLink from '../ObjectLink'

interface ChatListProps {
    limit?: number;
    userId?: MongooseIDType;
}

const ChatList: React.FC<ChatListProps> = ({limit, userId}) => {
    const {user} = useTypedSelector(state => state.user)
    const [chats, setChats] = useState<IChat[]>([]);


    useEffect(() => {
        if (!user) return
          chatApi.getAllChats(userId || user.id, limit || 3)
            .then(({data}) => setChats(data))
    }, [user])

    return (
        <React.Fragment>
            {chats.toString() ? chats.map(chat => (
                <React.Fragment key={chat.id}>
                    <ObjectLink 
                        path={'/chat/' + chat.id} 
                        title={chat.title} 
                    >
                        {typeof chat.lastMessage === 'string' ?(
                            chat.lastMessage
                        ) : (
                            chat.lastMessage.type === 'image' ? (
                                <img src={chat.lastMessage.content} className='max-h-[50px]' alt='message' />
                            ) : (
                                chat.lastMessage.content
                            )
                        )}             
                    </ObjectLink>
                </React.Fragment>
                
            )) : (
                <div className='text-center text-white opacity-70 text-2xl'>No chats</div>
            )}
        </React.Fragment>
    )
}

export default ChatList