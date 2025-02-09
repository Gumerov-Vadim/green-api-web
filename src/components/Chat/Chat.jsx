import React, { useContext, useEffect, useState } from 'react';
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


const Chat = ({phone}) => {
    const {authData} = useAuth();
    const {idInstance, apiToken} = authData;

    const [userData, setUserData] = useState(null);

    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        const data = getContactInfo(idInstance, apiToken, `${phone}@c.us`);
        data.then(data => setUserData(data)).catch(error =>{
            console.log(`Ошибка получения данных контакта: ${error}`);
            const name = phoneFormatted(""+phone);
            getAvatar(idInstance, apiToken, `${phone}@c.us`).then(avatar => {
                setUserData({
                    name,
                    avatar,
                })
            }).catch(error =>{
                console.log(`Ошибка получения аватара: ${error}`);
                setUserData({
                    name,
                    avatar: null,
                });
            });
        });
    }, [idInstance, apiToken, phone]);

    //Загрзка старых сообщений
    useEffect(() => {
        getChatHistory(idInstance, apiToken, `${phone}@c.us`).then(messages => {
            for(let i = 0; i < messages.length; i++){
                if(i===0){
                    messages[i].withTail = true;
                    continue;
                }
                if(messages[i].type=== messages[i-1].type){
                    messages[i].withTail = true;
                    continue;
                }
                messages[i].withTail = false;
            }
            setMessages(messages.map(m=>({id:m.idMessage,withTail:m.withTail,text:m.textMessage,isMe:m.type === "outgoing"})).reverse());
        }).catch(error => {
            console.log(`Ошибка получения истории сообщений: ${error}`);
        });

    },[idInstance, apiToken, phone]);

    //Получение новых сообщений

    useEffect(() => {

        function receiveMessage(){
            const notificaation = receiveNotification(idInstance, apiToken);
            
            notificaation.then(not => {
                console.log(not);
                const text = not.body.messageData.textMessageData.textMessage;
                const isMe = not.body.senderId === `${authData.phone}@c.us`;
                const withTail = true; // поменять
                const id = not.body.idMessage;
                console.log({id, withTail, text, isMe});
                setMessages(prev => [...prev, {id, withTail, text, isMe}]);

                deleteNotification(idInstance, apiToken, not.receiptId).then(response => {

                }).catch(error => {
                    console.log(`Ошибка удаления уведомления: ${error}`);
                });

            }).catch(error => {
                console.log(`Ошибка получения уведомления: ${error}`);
            });
        }

        const interval = setInterval(() => {
            receiveMessage();
        }, 5000);
        return () => clearInterval(interval);

    },[idInstance, apiToken]);


    const handleSendMessage = (message) => {
        console.log(message);
    } 

    return (
        <div className={styles.chat}>
            {phone&&(
                <>
                <div className={styles.chatHeader}>
                <div className={styles.chatHeaderLeft}>
                    <div className={styles.chatHeaderLeftUser}>                                            

                        <UserAvatar className={styles.chatHeaderLeftUserAvatar} avatar={userData?.avatar?.urlAvatar} />
                        <div className={styles.chatHeaderLeftUserName}>
                            <p>{userData?.name||phoneFormatted(phone)}</p>
                        </div>
                    </div>
                </div>
                </div>
    
                <div className={styles.chatBody}>
                    <MessageList messages={messages}/>
                </div>
    
                <Editor className={styles.chatEditor} onSendMessage={handleSendMessage} />
                </>
            )}
        </div>
    )
}

export default Chat;
