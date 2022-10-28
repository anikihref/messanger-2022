import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { messageApi } from '../api/messageApi';
import ChatMessage from '../components/ChatMessage';
import Loader from '../components/Loader';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'
import { fetchMessages } from '../store/actions/fetchMessages';
import { chatMessageSlice } from '../store/slices/chatMessageSlice';
import { ImageType, JSONString, WSMessage } from '../types';
import {FiSend} from 'react-icons/fi';
import { usePrevious } from '../hooks/usePrevious';
import { socket } from '../layout/MainLayout';
import { scrollToBottom } from '../helpers/scrollToBottom';
import SvgSelector from '../components/SvgSelector';
import TextInput from '../components/TextInput';
import ImageInput from '../components/ImageInput';

interface MessageInput {
  image: ImageType;
  message: string;
}

enum MessageFetchCount {
  FetchStart = 50,
  FetchLoad = 30
}

const ChatPage = () => {
  const dispatch = useTypedDispatch();
  const {id} = useParams();
  const {messages, isLoading} = useTypedSelector(state => state.chatMessage);
  const {user} = useTypedSelector(state => state.user);
  const [messageLimit, setMessageLimit] = useState<number>(MessageFetchCount.FetchStart);
  const [isSending, setIsSending] = useState(false);
  const messageList = useRef<HTMLDivElement>(null);
  const lastMessageElement = useRef<HTMLDivElement>(null);
  const fetchFromPoint = usePrevious(messageLimit);

  const {
    setFocus,
    register,
    handleSubmit,
    reset
  } = useForm<MessageInput>()


  useEffect(() => {
    socket?.addEventListener('message', handleWebSocketMessage)

    return () => {
      socket?.removeEventListener('message', handleWebSocketMessage)
    }
  }, [])


  
  useEffect(() => {
    if (!id || !user) return;

    dispatch(fetchMessages({
      chatId: id,
      limit: messageLimit,
      from: fetchFromPoint! >= messageLimit ? 0 : fetchFromPoint
    }))
      .then(() => {
        scrollToBottom(messageList.current);
        handleWebSocketOpen()

        socket?.send(JSON.stringify({
          connectionId: user.id,
          roomId: id,
          type: 'changeRoom'
        } as WSMessage))
      });
      

    return () => {  
      dispatch(chatMessageSlice.actions.reset())
    }
  }, [id, user])

  useEffect(() => {
    if (!id) return;
    if (messageLimit === MessageFetchCount.FetchStart) return;

    dispatch(fetchMessages({
      chatId: id,
      limit: messageLimit,
      from: fetchFromPoint
    }))
      .then(() => {
        lastMessageElement?.current?.scrollIntoView()
      })
  }, [messageLimit])

  function handleWebSocketMessage({data}: {data: JSONString}) {
    const {message} = JSON.parse(data)
      console.log(1)
    dispatch(chatMessageSlice.actions.addMessage(message))
    setTimeout(() => scrollToBottom(messageList.current), 0)
  }

  function handleWebSocketOpen() {
    socket?.send(JSON.stringify({
      type: 'connectionMessage',
      roomId: id,
      connectionId: user?.id,
    } as WSMessage))
  }

  const onSend = handleSubmit((data) => {
    let messageType: 'image' | 'text' = data.image.length ? 'image' : 'text';
    
    // if there is no user or id
    if (!id || !user) return;
    // if field is empty
    console.log(data.message)
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
        setTimeout(() => scrollToBottom(messageList.current), 0)

        socket?.send(JSON.stringify({
          type: 'message',
          message: data,
          connectionId: user.id,
          roomId: id
        } as WSMessage))
      })

    reset();
  })

    return (
    <div className='flex flex-col justify-end bg-purple-400 h-full relative'>   
        
      {/* message list */}
      <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-purple-300 grow`} ref={messageList}>
        {/* load more */}
        {messages.length >= messageLimit && (
          <button 
            className='mx-auto bg-purple-100 text-white font-title w-1/4 py-2 text-lg mb-4'
            onClick={() => setMessageLimit(prev => prev + MessageFetchCount.FetchLoad)}
          >
            Load more
          </button>
        )}
        
        {/* messages */}
        <div className='grid grid-cols-[1fr_auto] pl-3 pr-2'>
          {messages.toString() ? (
            messages.map((message, index) => (
              <React.Fragment key={message.id}>
                {/* message */}
                <div 
                  className={`mr-5 mb-4 ${index === 0 ? 'mt-4' : 'mt-0'}`} 
                  ref={index === MessageFetchCount.FetchLoad ? lastMessageElement : null}
                >
                  <ChatMessage  message={message}/>
                </div>

                {/* avatar */}
                <div className={`bg-blue-400 w-fit flex items-center px-4 relative pb-4 ${index === 0 ? 'pt-4' : 'pt-0'} ${index === 0 ? 'before:absolute before:bg-blue-400 before:w-full before:h-screen before:right-0 before:top-0' : ''}`}>
                  <div className='bg-gray-300 rounded-full w-[50px] aspect-square overflow-hidden z-[100]'>
                    <img src="http://localhost:5000/static/empty_avatar.png" alt="avatar" />
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : 
          !isLoading && (
            <div className='text-3xl font-content text-white text-center mt-[50%] -translate-y-1/2'>
              <div className='mb-2'>No messages yet</div>
              <button className='text-xl text-white opacity-70' onClick={() => setFocus('message')}>Click me and start typing...</button>
            </div>
          )
        }
        </div>
      </div>
      

      {isLoading && <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><Loader /></div>}
      
      {isSending && (
        <div className='text-center font-title text-lg mt-5 mx-auto gap-4 flex'>
          <div>
            sending
          </div>
          <div className='w-[25px]'>
            <FiSend size={'100%'} />
          </div>
        </div>
      )}

      {/* Send message form */}
      <form className='flex h-[70px] bg-purple-300 px-3.5 py-2.5 gap-x-5' onSubmit={onSend}>
        <ImageInput
          name='image'
          id='image'
          register={register}
        >
          <div className='w-[30px] flex justify-center items-center'>
            <SvgSelector id='image' />
          </div>
        </ImageInput>

        <TextInput register={register} name='message' placeholder='Type message...' id='message' />
        <button className=' bg-purple-100 text-xl text-white font-title w-[15%]' type='submit'>Send</button>
      </form>
    </div>
  )
}

export default ChatPage