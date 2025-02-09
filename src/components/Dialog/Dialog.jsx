import React, { useEffect, useState } from 'react';
import styles from './Dialog.module.css';
import UserAvatar from '../UserAvatar/UserAvatar';
import phoneFormatted from '../../util/phoneFormatted';

const Dialog = ({phone, name, getAvatarWithCache,...props}) => {
    const [avatar, setAvatar] = useState(null);
    
    useEffect(() => {
        try {
            getAvatarWithCache(phone).then(avatar => {
                setAvatar(avatar.urlAvatar);
            }).catch(error => {
                setAvatar(null);
            });
        } catch (error) {
            setAvatar(null);
        }

    }, [phone]);
    
    return <li
        className={styles.dialog}
        {...props}
        >
        <div className={styles.dialogAvatar}>

            <UserAvatar avatar={avatar}/>
        </div>
        <div className={styles.dialogName}>{phoneFormatted(name)}</div>
    </li>;
};

export default Dialog;