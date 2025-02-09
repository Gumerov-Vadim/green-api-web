import React, { useContext, useEffect, useState } from 'react';
import { getContactInfo } from '../../api/getContactInfo';
import Editor from '../UI/Editor/Editor';
import useAuth from '../../hooks/useAuth';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './Chat.module.css';
import getAvatar from '../../api/getAvatar';
import phoneFormatted from '../../util/phoneFormatted';

const Chat = ({phone}) => {
    const {authData} = useAuth();
    const {idInstance, apiToken} = authData;

    const [userData, setUserData] = useState(null);


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

                        <UserAvatar className={styles.chatHeaderLeftUserAvatar} avatar={userData?.avatar.urlAvatar} />
                        <div className={styles.chatHeaderLeftUserName}>
                            <p>{userData?.name||phoneFormatted(phone)}</p>
                        </div>
                    </div>
                </div>
                </div>
    
                <div className={styles.chatBody}>
                </div>
    
                <Editor className={styles.chatEditor} onSendMessage={handleSendMessage} />
                </>
            )}
        </div>


    )
}

export default Chat;
