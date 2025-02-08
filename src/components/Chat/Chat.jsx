import React, { useContext, useEffect, useState } from 'react';
import { getContactInfo } from '../../api/getContactInfo';
import Editor from '../UI/Editor/Editor';
import useAuth from '../../hooks/useAuth';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './Chat.module.css';

const Chat = () => {
    const {authData} = useAuth();
    const {idInstance, apiToken, phone} = authData;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const data = getContactInfo(idInstance, apiToken, `${phone}@c.us`);
        data.then(data => setUserData(data));
    }, [idInstance, apiToken, phone]);


    const handleSendMessage = (message) => {
        console.log(message);
    }

    return (
        <div className={styles.chat}>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatHeaderLeft}>
                            <div className={styles.chatHeaderLeftUser}>

                                
                            <div className={styles.chatHeaderLeftUserAvatar}>
                                <UserAvatar avatar={userData?.avatar} />
                            </div>


                            <div className={styles.chatHeaderLeftUserName}>
                                <h3>{userData?.name||phone}</h3>
                            </div>

                            </div>
                            </div>
                        </div>

                        <div className={styles.chatBody}>
                        </div>

                        <Editor onSendMessage={handleSendMessage} />
        </div>
    )
}

export default Chat;
