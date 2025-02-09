import React from 'react';
import styles from './Message.module.css';
import TailOut from '../SVG/TailOut';
import TailIn from '../SVG/TailIn';

const Message = ({isMe, text, withTail}) => {
    return <li className={`${styles.message} ${isMe ? styles.messageOutgoing : styles.messageIncoming} ${withTail && isMe ? styles.messageWithTailOut : withTail && !isMe ? styles.messageWithTailIn : ''}`}>
        {withTail && <span className={`${styles.messageTail} ${isMe ? styles.messageTailOut : styles.messageTailIn}`}>
            {isMe ? <TailOut /> : <TailIn />}
        </span>}
        {text}
        </li>;


};

export default Message;
