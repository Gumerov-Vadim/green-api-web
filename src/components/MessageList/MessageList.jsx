import React from 'react';
import Message from '../Message/Message';
const MessageList = ({messages}) => {
    return (
    <ul>
        {messages.map(message => (
            <Message 
            key={message.idMessage}
            isMe={message.isMe}
            text={message.text}
            withTail={message.withTail}
            />
        ))}
    </ul>

    );

};

export default MessageList;
