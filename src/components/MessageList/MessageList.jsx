import React from 'react';
import Message from '../Message/Message';
import styles from './MessageList.module.css';
const MessageList = ({messages}) => {
    return (
    <ul className={styles.messageList}>

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
