const MessageForm: React.VFC<{value: string, handleSubmit: React.MouseEventHandler<HTMLButtonElement>, onChange: React.ChangeEventHandler<HTMLInputElement>}> = ({value, handleSubmit, onChange}) => {
  return (
    <div className="input_msg_write">
      <input className="write_msg" type="text" id="message-input" placeholder="type a message" value={value} onChange={onChange}/>
      <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default MessageForm;
