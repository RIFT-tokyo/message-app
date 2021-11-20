import MessageList from './MessageList'
import MessageForm from './MessageForm'
import { message } from '../types/message'
import { useState, useRef, useEffect } from 'react'
import { Socket, io } from 'socket.io-client';

type serverMessage = {id: string; sender: string; message: string; date: Date;};

const Chat = () => {
  const [messages, setMessages] = useState<message[]>([])
  const [input, setInput] = useState("")
  const [me, setMe] = useState<string | null>(null)
  const socket = useRef<Socket>();

  const handleSubmitNewMessage = () => {
    socket.current?.emit('new-message-to-server', {sender: me, message: input});
    setInput("")
  }

  useEffect(() => {
    if (me === null) {
      setMe(window.prompt("Type user name"))
    }

    socket.current = io("http://localhost:4000/message")

    socket.current.on('new-message-to-client', (data: {message: serverMessage}) => {
      const msg = data.message
      setMessages((prevMessages) => {
        return [...prevMessages, {id: msg.id, isOwner: me === msg.sender, user: msg.sender, body: msg.message}]
      });
    })

    socket.current.on('all-messages-to-client', (data: serverMessage[]) => {
      const msgs = data.map((item): message => {
        return {id: item.id, isOwner: me === item.sender, user: item.sender, body: item.message}
      })
      setMessages(msgs);
    })

    return () => {
      socket.current?.disconnect();
    }
  // eslint-disable-next-line
  }, [])

  return (
    <div>
      Chat
      <MessageList messages={messages}/>
      <MessageForm value={input} handleSubmit={handleSubmitNewMessage} onChange={e => setInput(e.target.value)}/>
    </div>
  )
}

export default Chat;
