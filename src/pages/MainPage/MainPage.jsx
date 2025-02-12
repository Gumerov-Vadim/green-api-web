import React, { useContext, useEffect, useState } from 'react';
import ConversationPanel from '../../components/ConversationPanel/ConversationPanel';
import Chat from '../../components/Chat/Chat';
import styles from './MainPage.module.css';
import useAuth from '../../hooks/useAuth';
import getContactInfo from '../../api/getContactInfo';
import getAvatar from '../../api/getAvatar';
import receiveNotification from '../../api/receiveNotification';
import deleteNotification from '../../api/deleteNotification';
import { getChatHistory } from '../../api/getChatHistory';

const MainPage = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messages, setMessages] = useState({});
    const [usersData, setUsersData] = useState({});
    const [savedUsers, setSavedUsers] = useState(JSON.parse(localStorage.getItem('savedUsers'))||[]);
    const {authData} = useAuth();
    const {idInstance, apiToken} = authData;
    const addMessage = (message) => {
        setMessages((prevMessages) => ({
            ...prevMessages,
            [selectedUserId]: [...(prevMessages[selectedUserId] || []), message]
        }));
    };
    const updateMessages = (messages) => {
        setMessages((prevMessages) => ({
            ...prevMessages,
            [selectedUserId]: messages
        }));
    };
    
    const getUserData = async (phone) => {
        if(usersData[phone]){
            return usersData[phone];
        }
        const userData = await getContactInfo(idInstance, apiToken, `${phone}@c.us`);
        userData.then(userData => {
            setUsersData((prevUsersData) => ({
                ...prevUsersData,
                [phone]: {
                    ...userData
                }
            }));
            return userData;
        }).catch(error => {
            console.log(`Ошибка получения данных пользователя ${phone}: ${error}`);
            const avatar = getUserAvatar(idInstance, apiToken, `${phone}@c.us`);
            avatar.then(avatar => {
                setUsersData((prevUsersData) => ({
                    ...prevUsersData,
                    [phone]: {
                    name: phone,
                        avatar: avatar.urlAvatar
                    }
                }));
                return {
                    name: phone,
                    avatar: avatar.urlAvatar
                };
            }).catch(error => {
                console.log(`Ошибка получения аватара пользователя ${phone}: ${error}`);
                return {
                    name: phone,
                    avatar: null
                };
            });
        });
    };
    const getUserAvatar = async (phone) => {
        if(usersData[phone]?.avatar){
            return usersData[phone].avatar;
        }
        const avatar = await getAvatar(idInstance, apiToken, `${phone}@c.us`);
        return avatar.urlAvatar||null;
    };    

    const saveUser = (phone) => {
        setSavedUsers((prevSavedUsers) => [...prevSavedUsers, phone]);
    };
    const removeUser = (phone) => {
        setSavedUsers((prevSavedUsers) => prevSavedUsers.filter(user => user !== phone));
    };

    useEffect(() => {
        localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    }, [savedUsers]);

     // Загрузка старых сообщений
     useEffect(() => {
        if(selectedUserId){
            if(messages[selectedUserId]){
                return;
            }
            getChatHistory(idInstance, apiToken, `${selectedUserId}@c.us`)
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
                updateMessages(
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
        }
    }, [idInstance, apiToken, selectedUserId]);

     // Получение новых сообщений
     useEffect(() => {
        let isMounted = true;
        let timeout;

        async function receiveMessage() {
            try {
                const notification = await receiveNotification(idInstance, apiToken);
                if (!isMounted) return;
                if (notification) {
                    try {
                        const id = notification.body.idMessage;
                        const text = notification.body.messageData.textMessageData.textMessage;
                        const isMe = notification.body.senderId === `${authData.phone}@c.us`;
                        const userId = notification.body.senderData.chatId.split('@')[0];
                        setMessages((prevMessages) => ({
                            ...prevMessages,
                            [userId]: [...(prevMessages[userId] || []), {
                                id,
                                withTail: prevMessages[userId] == null || prevMessages[userId].length === 0 || prevMessages[userId].at(-1).isMe !== isMe,
                                text,
                                isMe,
                            } ]
                        }));
                        if(!savedUsers.includes(userId)){
                            setSavedUsers((prevSavedUsers) => [...prevSavedUsers, userId]);
                        }
                    } catch (error) {
                        console.log(`Ошибка получения сообщения: ${error}`);
                    }
                    let deletionSucceeded = false;
                    try {
                        const response = await deleteNotification(idInstance, apiToken, notification.receiptId);
                        if (response.result) {
                            deletionSucceeded = true;
                        }
                    } catch (error) {
                        console.log(`Ошибка удаления уведомления: ${error}`);
                    }
                    // Если уведомление успешно обработано и удалено, сразу вызываем receiveMessage повторно
                    if (deletionSucceeded) {
                        if (isMounted) {
                            receiveMessage();
                            return; // Завершаем выполнение, чтобы не планировать вызов через setTimeout
                        }
                    }
                }
            } catch (error) {
                console.log(`Ошибка получения уведомления: ${error}`);
            }
            timeout = setTimeout(() => receiveMessage(), 5000);
        }

        receiveMessage();

        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [idInstance, apiToken, savedUsers]);

    return (
        <div className={styles.mainPage}>
            <ConversationPanel
            pickConversation={setSelectedUserId}
            saveUser={saveUser}
            removeUser={removeUser}
            savedUsers={savedUsers}
            getUserData={getUserData}
            getAvatar={getUserAvatar}
            />
            <Chat
            phone={selectedUserId}
            messages={messages[selectedUserId]||[]}
            addMessage={addMessage}
            getUserData={getUserData}
            />
        </div>
    )
}

export default MainPage;
