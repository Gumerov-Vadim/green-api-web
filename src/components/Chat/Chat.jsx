import React, { useContext, useEffect, useState, useRef } from 'react';
import { getContactInfo } from '../../api/getContactInfo';
import Editor from '../UI/Editor/Editor';
import useAuth from '../../hooks/useAuth';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './Chat.module.css';
import getAvatar from '../../api/getAvatar';
import phoneFormatted from '../../util/phoneFormatted';
import MessageList from '../MessageList/MessageList';
import { getChatHistory } from '../../api/getChatHistory';
import receiveNotification from '../../api/receiveNotification';
import deleteNotification from '../../api/deleteNotification';
import sendMessage from '../../api/sendMessage';

const Chat = ({ phone }) => {
    const { authData } = useAuth();
    const { idInstance, apiToken } = authData;

    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
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
        getContactInfo(idInstance, apiToken, `${phone}@c.us`)
            .then(data => setUserData(data))
            .catch(error => {
                console.log(`Ошибка получения данных контакта: ${error}`);
                const name = phoneFormatted("" + phone);
                getAvatar(idInstance, apiToken, `${phone}@c.us`)
                    .then(avatar => {
                        setUserData({
                            name,
                            avatar,
                        });
                    })
                    .catch(error => {
                        console.log(`Ошибка получения аватара: ${error}`);
                        setUserData({
                            name,
                            avatar: null,
                        });
                    });
            });
    }, [idInstance, apiToken, phone]);

    // Загрузка старых сообщений
    useEffect(() => {
        getChatHistory(idInstance, apiToken, `${phone}@c.us`)
            .then(history => {
                history.reverse();
                for (let i = 0; i < history.length; i++) {
                    if (i === 0) {
                        history[i].withTail = true;
                        continue;
                    }
                    if (history[i].type !== history[i - 1].type) {
                        history[i].withTail = true;
                        continue;
                    }
                    history[i].withTail = false;
                }
                setMessages(
                    history.map(m => ({
                        id: m.idMessage,
                        withTail: m.withTail,
                        text: m.textMessage,
                        isMe: m.type === "outgoing"
                    }))
                );
            })
            .catch(error => {
                console.log(`Ошибка получения истории сообщений: ${error}`);
            });
    }, [idInstance, apiToken, phone]);

    // Получение новых сообщений
    useEffect(() => {
        let isMounted = true;
        let timeout;
        receiveMessage();
        function receiveMessage() {
            const notificationPromise = receiveNotification(idInstance, apiToken);
            notificationPromise
                .then(not => {
                    if (!isMounted) return;
                    try {
                        const id = not.body.idMessage;
                        const text = not.body.messageData.textMessageData.textMessage;
                        const isMe = not.body.senderId === `${authData.phone}@c.us`;
                        setMessages(prev => [
                            ...prev,
                            { id, withTail: prev.slice(-1)[0].isMe !== isMe, text, isMe }
                        ]);
                    } catch (error) {
                        console.log(`Ошибка получения сообщения: ${error}`);
                    }
                    deleteNotification(idInstance, apiToken, not.receiptId)
                        .then(response => {
                            if (response.result) {
                                clearTimeout(timeout);
                                receiveMessage();
                            }
                        })
                        .catch(error => {
                            console.log(`Ошибка удаления уведомления: ${error}`);
                        });
                })
                .catch(error => {
                    console.log(`Ошибка получения уведомления: ${error}`);
                })
                .finally(() => {
                    timeout = setTimeout(receiveMessage, 5000);
                });
        }

        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [idInstance, apiToken]);

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
                setMessages(prev => [
                    ...prev,
                    { id: response.idMessage, withTail: true, text: message, isMe: true }
                ]);
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
                        <MessageList messages={messages} />
                    </div>

                    <Editor className={styles.chatEditor} onSendMessage={handleSendMessage} />
                </>
            )}
        </div>
    );
};

export default Chat;
