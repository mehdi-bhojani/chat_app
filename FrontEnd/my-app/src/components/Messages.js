import React, { useEffect ,useRef} from 'react'
import useListenMessages from '../hooks/useListenMessages';
 
import Message from "./Message";
import useGetMessages from '../hooks/useGetMessages';

const Messages = () => {
	const {messages,loading}=useGetMessages();
	useListenMessages();
	const lastMessageRef=useRef();

  useEffect(()=>{
	setTimeout(()=>{
		lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
	},50)
  },[messages])

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length>0 && messages.map((message)=>(
				<div key={message._id} ref={lastMessageRef}>
					<Message key={message._id} message={message}/>
					</div>
				
			))}
		</div>
	);
};
export default Messages;