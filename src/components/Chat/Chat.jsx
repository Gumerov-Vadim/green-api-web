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

    const phoneFormatted = (phone) =>{
        let phoneCopy = phone.split('').reverse().join('');
        phoneCopy = phoneCopy.slice(0,2) + 
                    '-' + 
                    phoneCopy.slice(2,4) +
                    '-' +
                    phoneCopy.slice(4,7) +
                    ' ' +
                    phoneCopy.slice(7,10) +
                    ' ' +
                    phoneCopy.slice(10) +
                    "+";
        return phoneCopy.split('').reverse().join('')
    }
    

    return (
        <div className={styles.chat}>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatHeaderLeft}>
                            <div className={styles.chatHeaderLeftUser}> 
                                                               
                                <UserAvatar className={styles.chatHeaderLeftUserAvatar} avatar={userData?.avatar} />
                            
                            <div className={styles.chatHeaderLeftUserName}>
                                <p>{userData?.name||phoneFormatted(phone)}</p>
                            </div>


                            </div>
                            </div>
                        </div>

                        <div className={styles.chatBody}>
                        </div>

                        <Editor className={styles.chatEditor} onSendMessage={handleSendMessage} />
        </div>

    )
}

export default Chat;
