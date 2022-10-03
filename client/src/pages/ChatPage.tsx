import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { messageApi } from '../api/messageApi';
import ChatMessage from '../components/ChatMessage';
import Loader from '../components/Loader';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'
import { fetchMessages } from '../store/actions/fetchMessages';
import { chatMessageSlice } from '../store/slices/chatMessageSlice';
import { ImageType, MongooseIDType } from '../types';
import {BiImageAdd} from 'react-icons/bi'
import {FiSend} from 'react-icons/fi';
import Button from '../components/Button';
import { usePrevious } from '../hooks/usePrevious';
import { IChatMessage } from '../types/chatMessage';

interface MessageInput {
  image: ImageType;
  message: string;
}

interface WSMessage {
  type: 'message' | 'connectionMessage' | 'closeMessage';
  roomId?: MongooseIDType; // chat id
  connectionId: MongooseIDType; // user id
  message?: IChatMessage;
}

enum MessageFetch {
  FetchStart = 10,
  FetchLoad = 15
}


const ChatPage = () => {
  const dispatch = useTypedDispatch();
  const {id} = useParams();
  const {messages, isLoading} = useTypedSelector(state => state.chatMessage);
  const {user} = useTypedSelector(state => state.user);
  const [messageLimit, setMessageLimit] = useState<number>(MessageFetch.FetchStart);
  const [isSending, setIsSending] = useState(false);
  const messageList = useRef<HTMLDivElement>(null);
  const lastMessageElement = useRef<HTMLDivElement>(null)
  const fetchFromPoint = usePrevious(messageLimit);
  const [socket, setSocket] = useState<WebSocket | null>()

  const {
    register,
    handleSubmit,
    reset
  } = useForm<MessageInput>()

  useEffect(() => {
    if (!id || !user) return;
    let socket = new WebSocket('ws://localhost:8000')
    setSocket(socket)
    
    dispatch(fetchMessages({
      chatId: id,
      limit: messageLimit,
      from: fetchFromPoint
    }))
      .then(() => {
        scrollToBottom();
      });
      
      socket.addEventListener('open', () => {
        socket?.send(JSON.stringify({
          type: 'connectionMessage',
          roomId: id,
          connectionId: user?.id,
        } as WSMessage))
      })

    socket?.addEventListener('message', ({ data }) => {
      const {message} = JSON.parse(data)
      
      dispatch(chatMessageSlice.actions.addMessage(message))
      setTimeout(scrollToBottom, 0)
    })

    return () => {
      dispatch(chatMessageSlice.actions.reset())

      socket?.send(JSON.stringify({
        connectionId: user?.id,
        type: 'closeMessage'
      } as WSMessage))
      
      socket?.close();
    }
  }, [id])

  useEffect(() => {
    if (!id) return;
    if (messageLimit === MessageFetch.FetchStart) return;

    dispatch(fetchMessages({
      chatId: id,
      limit: messageLimit,
      from: fetchFromPoint
    }))
      .then(() => {
        lastMessageElement?.current?.scrollIntoView()
      })

  }, [messageLimit])

  const onSend = handleSubmit((data) => {
    let messageType: 'image' | 'text' = data.image.length ? 'image' : 'text';

    // if there is no user or id
    if (!id || !user) return;
    // if field is empty
    if ((messageType === 'image' && !data.image.length) || (messageType==='text' && !data.message)) return;
    
    messageApi.createMessage({
      chat: id,
      content: data.image.length ? data.image : data.message,
      creator: user.id,
      type: messageType
    })
      .then(({data}) => {
        setIsSending(false);
        dispatch(chatMessageSlice.actions.addMessage(data))
        setTimeout(scrollToBottom, 0)

        socket?.send(JSON.stringify({
          type: 'message',
          message: data,
          connectionId: user.id,
          roomId: id
        } as WSMessage))
      })

    reset();
  })

  function scrollToBottom() {
    messageList.current?.scrollTo({
      top: messageList.current?.scrollHeight
    });
  }
  
  return (
    <div className='flex flex-col justify-end h-full max-h-full'>     
      {/* message list */}
      <div className={`flex flex-col grow gap-5 mt-3 overflow-auto`} ref={messageList}>
        {/* load more */}
        <div className='w-[30%] mx-auto'>
          {messages.length >= messageLimit && (
            <Button onClick={() => setMessageLimit(prev => prev + MessageFetch.FetchLoad)}>
              <div className='py-3 flex items-center ml-[10%] text-lg'>Load more</div>
            </Button>
          )}
        </div>

        {messages.toString() ? (
          messages.map((message, index) => (
            <div ref={index === MessageFetch.FetchLoad ? lastMessageElement : null} key={message.id}>
              <ChatMessage  message={message}/>
            </div>
          ))
        ) : 
          !isLoading && <div>no messages yet</div>
        }
      </div>
      

      {isLoading && <div className='mx-auto'><Loader /></div>}
      {isSending && (
        <div className='text-center font-title text-lg mt-5 mx-auto gap-4 flex'>
          <div>
            sending
          </div>
          <div className='w-[25px]'>
            <FiSend size={'100%'} />
          </div>
        </div>
      )
      }
      {/* send message form */}
      <form className='flex h-[60px] border-[3px] border-cold-200 mt-7' onSubmit={onSend}>
        <div className='h-full flex grow items-center '>
          <label htmlFor='message'></label>
          <input className='px-2 py-1 w-full bg-cold-300 h-full text-white outline-none duration-500 focus:bg-hot-100 focus:text-cold-300' {...register('message')}  name='message' id='message' type={'text'} />
        </div>

        <div className='aspect-square h-full overflow-hidden bg-hot-300'>
          <input className='absolute opacity-0 -z-[1] max-w-full overflow-hidden'  {...register('image')} name='image' id='image' type='file' alt='image' />

          {/* custom image picker */}
          <label htmlFor='image' className='w-full h-full flex items-center justify-center text-cold-100 cursor-pointer'>
            <BiImageAdd size={'60%'}  />
          </label>
        </div>

        <button className='aspect-[2/1] bg-hot-200 ' type='submit'>send</button>
      </form>
    </div>
  )
}

export default ChatPage