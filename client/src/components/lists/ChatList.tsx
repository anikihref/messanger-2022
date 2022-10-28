import React, { useEffect, useState } from 'react'
import { chatApi } from '../../api/chatApi';
import { useTypedSelector } from '../../hooks/redux';
import { MongooseIDType, TailwindClass } from '../../types';
import { IChat } from '../../types/chat';
import ObjectLink from '../ObjectLink'

interface ChatListProps {
    itemStyle?: {
        titleFontSize?: TailwindClass
        textFontSize?: TailwindClass
        bg?: TailwindClass
        padding?: TailwindClass
    };
    limit?: number;
    showMembers?: boolean;
    chatsFromUserId?: MongooseIDType;
}

const ChatList: React.FC<ChatListProps> = ({itemStyle, limit, chatsFromUserId, showMembers}) => {
    const {user} = useTypedSelector(state => state.user)
    const [chats, setChats] = useState<IChat[]>([]);

    useEffect(() => {
        if (!user) return
          chatApi.getAllChats(chatsFromUserId || user.id, limit || 3)
            .then(({data}) => setChats(data))
    }, [user])

    return (
        <React.Fragment>
            {chats.toString() ? chats.map(chat => (
                <React.Fragment key={chat.id}>
                    <ObjectLink 
                        path={'/chat/' + chat.id} 
                        title={{value: chat.title, fontSize: itemStyle?.titleFontSize || ''}} 
                        text={{
                            value: typeof chat.lastMessage === 'string' ? chat.lastMessage : chat.lastMessage.content,
                            fontSize: itemStyle?.textFontSize || ''
                        }}
                        styles={{
                            bg: itemStyle?.bg || '',
                            padding: itemStyle?.padding || ''
                        }}
                    >
                        {showMembers && (
                            <div className='ml-auto pl-3'>
                                <h5 className='font-title text-xl text-right'>Members:</h5>
                                
                                <ul className='opacity-70  text-right'>
                                    <li>{chat.members[0].username}</li>
                                    <li>{chat.members[1].username}</li>
                                    {chat.members[2] && (
                                        <li>and {chat.members.length - 2} more</li>
                                    )}
                                </ul>
                            </div>
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