import { message } from "../types/message";
import Message from "./Message";

const MessageList: React.VFC<{messages: message[]}> = ({messages}) => {
	return (
    <ul>
      {messages.map((msg) => {
        return <Message key={msg.id} isOwner={msg.isOwner} body={msg.body} id={msg.id} user={msg.user}/>
      })}
    </ul>
  )
}

export default MessageList;
