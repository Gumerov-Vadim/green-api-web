import React, { useEffect, useState } from 'react';
import styles from './Dialog.module.css';
import UserAvatar from '../UserAvatar/UserAvatar';
import phoneFormatted from '../../util/phoneFormatted';
import Button from '../UI/Button/Button';
import Close from '../SVG/Close';

const Dialog = ({phone, name, getAvatar, getUserData, ...props}) => {
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        getAvatar(phone).then(avatar => {
            setAvatar(avatar.urlAvatar);
        }).catch(error => {
            console.log(`Ошибка получения аватара ${phone}: ${error}`);
            setAvatar(null);
        });
    }, [phone]);
    useEffect(() => {
        getUserData(phone).then(userData => {
            setUserData(userData);
        }).catch(error => {
            console.log(`Ошибка получения данных пользователя ${phone}: ${error}`);
        });
    }, [phone]);

    return <li
        className={styles.dialog}
        {...props}
        >
        <div className={styles.dialogAvatar}>
            <UserAvatar avatar={avatar}/>
        </div>
        <div className={styles.dialogName}>{userData?.name||phoneFormatted(phone)}</div>
        <Button data-close className={styles.dialogClose}>
            <Close className={styles.dialogCloseIcon}/>
        </Button>
    </li>;

};

export default Dialog;