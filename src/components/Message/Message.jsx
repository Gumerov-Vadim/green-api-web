import React from 'react';
import styles from './Message.module.css';

const Message = ({isMe, text, withTail}) => {
    return <li className={styles.message}>{text}</li>;
};

export default Message;
