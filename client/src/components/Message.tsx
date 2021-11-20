import { message } from "../types/message";

const Message: React.VFC<message> = (data) => {
	return (
		<li className={data.isOwner ? "sent" : "received"}>
			<span>{data.user}: {data.id}</span>
			<p>{data.body}</p>
		</li>
	)
}

export default Message;
