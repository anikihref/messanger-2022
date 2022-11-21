import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { messageApi } from '../api/messageApi';
import Loader from '../components/Loader';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'
import { fetchMessages } from '../store/actions/fetchMessages';
import { chatMessageSlice } from '../store/slices/chatMessageSlice';
import { ImageType, JSONString } from '../types';
import {FiSend} from 'react-icons/fi';
import { usePrevious } from '../hooks/usePrevious';
import { scrollToBottom } from '../helpers/scrollToBottom';
import SvgSelector from '../components/SvgSelector';
import TextInput from '../components/inputs/TextInput';
import ImageInput from '../components/inputs/ImageInput';
import { ChatMessageAvatar, ChatMessage } from '../components/chat';
import { Button } from '../components/inputs';
import messageWS from '../websockets/messageWS';
import { WSResponse, WSSuccessResponseWithData } from '../types/ws';
import { userSlice } from '../store/slices/userSlice';
import { EVENT_TYPES } from '../types/ws/messageWS';

interface MessageInput {
  image: ImageType;
  message: string;
}

export enum MessageFetchCount {
  FetchStart = 10,
  FetchLoad = 5
}

const ChatPage = () => {
  const dispatch = useTypedDispatch();
  const {id} = useParams();
  const {messages, isLoading} = useTypedSelector(state => state.chatMessage);
  const {user, chatJoiningEnabled} = useTypedSelector(state => state.user);
  const [messageLimit, setMessageLimit] = useState<number>(MessageFetchCount.FetchStart);
  const [isSending, setIsSending] = useState(false);
  const [roomConnected, setRoomConnected] = useState(false);
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
    if (!user || !id) return;

    messageWS.handler = (evt) => handleWebSocketMessage(evt.data)

    if (chatJoiningEnabled) {
      handleJoin()
    } else {
      const interval = setInterval(() => {
        if (chatJoiningEnabled) {
          handleJoin()
          clearInterval(interval);
        }
      }, 5)
    }

    function handleJoin() {
      if (!user || !id) return;
      
      messageWS.joinRoom({
        connectionId: user.id,
        roomId: id,
      })
        .then(() => setRoomConnected(true))
    }

    return () => {
      dispatch(userSlice.actions.setChatJoiningEnabled(false))

      messageWS.leaveRoom({
        connectionId: user.id,
      }).then(() => {
        dispatch(userSlice.actions.setChatJoiningEnabled(true))
      })
    }
  }, [user, id])
  
  useEffect(() => {
    if (!id || !user) return;

    dispatch(fetchMessages({
      chatId: id,
      limit: messageLimit,
      from: fetchFromPoint! >= messageLimit ? 0 : fetchFromPoint
    }))
      .then(() => {
        scrollToBottom(messageList.current);
      });
      

    return () => {  
      dispatch(chatMessageSlice.actions.reset())
    }
  }, [id, user])

  useEffect(() => {
    if (!id) return;
    if (messageLimit === MessageFetchCount.FetchStart) return;

    // messageWS.webSocket?.addEventListener('message', () => )

    dispatch(fetchMessages({
      chatId: id,
      limit: messageLimit,
      from: fetchFromPoint
    }))
      .then(() => {
        lastMessageElement?.current?.scrollIntoView()
      })
  }, [messageLimit])

  function handleWebSocketMessage(data: JSONString) {
    const response: WSResponse = JSON.parse(data)

    if (response.responseState === 'error') {
      console.warn(`Error: ${response.message} happened in ${response.eventType}`)
      return;
    }

    if (response.eventType === EVENT_TYPES.send) {
      // assume that current response is response with chat message content
      const dataResponse = response as WSSuccessResponseWithData;

      // if it isn't then stop
      if (!dataResponse?.data) return;

      dispatch(chatMessageSlice.actions.addMessage(dataResponse.data))
      setTimeout(() => scrollToBottom(messageList.current), 0)
    }
  }

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
        messageWS.send({
          content: data,
          connectionId: user.id,
          roomId: id,
        })
          .then((asd) => {
            // console.log(asd)
            setIsSending(false);
            dispatch(chatMessageSlice.actions.addMessage(data))
            setTimeout(() => scrollToBottom(messageList.current), 0)
          });
      })

    reset();
  })

    return (
    <div className='flex flex-col justify-end bg-purple-400 h-full relative'>   
        
      {/* message list */}
      <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-purple-300 grow`} ref={messageList}>
        {/* load more */}
        {messages.length >= messageLimit && (
          <Button
            styles={{
              margins: 'my-4'
            }}
            onClick={() => setMessageLimit(prev => prev + MessageFetchCount.FetchLoad)}
          >
            Load more
          </Button>
        )}
        
        {/* messages */}
        <div className='grid grid-cols-[1fr_auto] pl-3'>
          {messages.toString() ? (
            messages.map((message, index) => (
              <React.Fragment key={message.id}>
                {/* message */}
                <ChatMessage message={message} elementRef={lastMessageElement} index={index} />

                {/* avatar */}
                <ChatMessageAvatar index={index} />
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
      

      {(isLoading && roomConnected) && <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><Loader /></div>}
      
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
      <form className='flex h-[60px] bg-purple-300 px-3.5 py-2.5 gap-x-5' onSubmit={onSend}>
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
        <Button type='submit'>Send</Button>
      </form>
    </div>
  )
}

export default ChatPage