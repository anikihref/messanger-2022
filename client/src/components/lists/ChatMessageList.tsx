import React from 'react'
import { messageApi } from '../../api/messageApi';
import { copyToClipboard } from '../../helpers/copyToClipboard';
import { withContextMenu } from '../../hoc/withContextMenu';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { chatMessageSlice } from '../../store/slices/chatMessageSlice';
import { MongooseIDType } from '../../types';
import { IChatMessage } from '../../types/chatMessage'
import messageWS from '../../websockets/messageWS';
import Avatar from '../Avatar';
import { ChatMessage } from '../chat';
import { Button } from '../inputs';

export interface ChatMessageListProps {
    messages: IChatMessage[];
    lastElementRef: React.RefObject<HTMLDivElement>;
    chatId: MongooseIDType;
}

const AvatarWithContextMenu = withContextMenu(Avatar)

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, lastElementRef, chatId }) => {
    const {user} = useTypedSelector(state => state.user);
    const dispatch = useTypedDispatch()

    function handleDeleteMessage(messageId: MongooseIDType) {
        if (!user) return;
        messageApi.deleteMessage(messageId)
          .then(() => {
            messageWS.deleteMessage({
              connectionId: user.id,
              content: messageId,
              roomId: chatId
            })
          })
    
        dispatch(chatMessageSlice.actions.delete(messageId))
      }
    

    return (
        <div className='grid grid-cols-[1fr_auto] pl-3'>
            {messages.map((message, index) => (
                <React.Fragment key={message.id}>
                    {/* message */}
                    <ChatMessage message={message} elementRef={lastElementRef} index={index} />

                    {/* avatar */}
                    <div 
                        className={`bg-blue-400 w-fit h-full flex items-center px-4 relative pb-4 
                        ${index === 0 ? 'pt-3 border-purple-100 border-t-4' : 'pt-0'} 
                        ${index === messages.length - 1 ? 'border-purple-100 border-b-4 pt-1' : ''}`}
                    >
                        <AvatarWithContextMenu 
                            src=''
                            triggerEvent={{type: 'click'}} 
                            arrowDirection='right'
                        >
                            {
                                message.creator.id === user?.id && (
                                    <Button onClick={() => handleDeleteMessage(message.id)} styles={{custom: 'w-full', bg: 'bg-blue-300'}}>
                                        Delete
                                    </Button>
                                )
                            }

                            <Button onClick={() => copyToClipboard(message.content)} styles={{custom: 'w-full', bg: 'bg-blue-300'}}>
                                Copy
                            </Button>
                        </AvatarWithContextMenu>
                    </div>

                </React.Fragment>
            ))}
        </div>
    )
}

export default ChatMessageList