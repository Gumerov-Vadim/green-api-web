import React, { useContext, useEffect, useState, useRef } from 'react';
import Editor from '../UI/Editor/Editor';
import useAuth from '../../hooks/useAuth';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './Chat.module.css';
import phoneFormatted from '../../util/phoneFormatted';
import MessageList from '../MessageList/MessageList';
import sendMessage from '../../api/sendMessage';

const Chat = ({ phone, messages, addMessage, getUserData }) => {
    const { authData } = useAuth();
    const { idInstance, apiToken } = authData;

    const [userData, setUserData] = useState(null);
    const chatBodyRef = useRef(null);

    // Флаг, чтобы первоначально прокрутить историю до конца один раз
    const scrollOnceRef = useRef(false);
    // Ref для хранения предыдущей высоты контейнера (для отслеживания добавленной высоты)
    const prevScrollHeightRef = useRef(0);

    // При смене контакта сбрасываем флаги для прокрутки
    useEffect(() => {
        scrollOnceRef.current = false;
        prevScrollHeightRef.current = 0;
    }, [phone]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await getUserData(phone);
                setUserData(data);
            } catch (error) {
                console.log(`Ошибка получения данных пользователя ${phone}: ${error}`);
            }
        }
        fetchUserData();
    }, [phone]);

    // Прокрутка вниз при изменении messages
    // Если история загружается впервые, прокручиваем до конца,
    // а при последующих изменениях добавляем прокрутку на разницу в высоте (высоту нового сообщения)
    useEffect(() => {
        if (chatBodyRef.current) {
            const currentScrollHeight = chatBodyRef.current.scrollHeight;
            if (!scrollOnceRef.current) {
                chatBodyRef.current.scrollTop = currentScrollHeight;
                scrollOnceRef.current = true;
            } else {
                const previousHeight = prevScrollHeightRef.current;
                const diff = currentScrollHeight - previousHeight;
                if (diff > 0) {
                    chatBodyRef.current.scrollTop += diff;
                }
            }
            prevScrollHeightRef.current = currentScrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (message) => {
        sendMessage(idInstance, apiToken, `${phone}@c.us`, message)
            .then(response => {
                addMessage({
                    id: response.idMessage,
                    withTail: messages.length === 0 || messages.at(-1).isMe !== true,
                    text: message,
                    isMe: true
                });
            })
            .catch(error => {
                console.log(`Ошибка отправки сообщения: ${error}`);
            });
    };

    return (
        <div className={styles.chat}>
            {phone && (
                <>
                    <div className={styles.chatHeader}>
                        <div className={styles.chatHeaderLeft}>
                            <div className={styles.chatHeaderLeftUser}>
                                <UserAvatar className={styles.chatHeaderLeftUserAvatar} avatar={userData?.avatar?.urlAvatar} />
                                <div className={styles.chatHeaderLeftUserName}>
                                    <p>{userData?.name || phoneFormatted(phone)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.chatBody} ref={chatBodyRef}>
                        <MessageList messages={messages||[]} />
                    </div>

                    <Editor className={styles.chatEditor} onSendMessage={handleSendMessage} />
                </>
            )}
        </div>
    );
};

export default Chat;
