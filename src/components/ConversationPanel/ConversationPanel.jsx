import React, { useState, useEffect, useContext } from 'react';
import AddChat from '../SVG/AddChat';
import Button from '../UI/Button/Button';
import styles from './ConversationPanel.module.css';
import PhoneNumberInput from '../UI/PhoneNumberInput/PhoneNumberInput';
import ArrowLeft from '../SVG/ArrowLeft';
import Plus from '../SVG/Plus';
import getAvatar from '../../api/getAvatar';
import useAuth from '../../hooks/useAuth';
import DialogsList from '../DialogsList/DialogsList';
import Logout from '../SVG/Logout';
import UserAvatar from '../UserAvatar/UserAvatar';
import AuthContext from '../../context/AuthContext';
import phoneFormatted from '../../util/phoneFormatted';

const ConversationPanel = () => {
    const initDialogs = JSON.parse(localStorage.getItem('savedDialogs'))||[];
    const {authData} = useAuth();
    const {idInstance, apiToken, phone:userPhone} = authData;

    const [dialogs, setDialogs] = useState(initDialogs);
    const [isPhoneNumberInputOpen, setIsPhoneNumberInputOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isWrongPhoneNumber, setIsWrongPhoneNumber] = useState(false);
    const [isCorrectPhoneNumber, setIsCorrectPhoneNumber] = useState(false);

    const [avatarCache, setAvatarCache] = useState({});
    const [userAvatar, setUserAvatar] = useState(null);

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const avatar = getAvatar(idInstance, apiToken, `${userPhone}@c.us`);
        avatar.then(avatar => {
            setUserAvatar(avatar.urlAvatar);
        }).catch(error => {
            setUserAvatar(null);
        });

    },[]);

    const getAvatarWithCache = async (phone) => {
        if(avatarCache[phone]) {
            return avatarCache[phone];
        }

        const avatar = await getAvatar(idInstance, apiToken, `${phone}@c.us`);

        avatar.then(avatar => {
            setAvatarCache(prev => ({...prev, [phone]: avatar.urlAvatar}));
        }).catch(error => {
            setAvatarCache(prev => ({...prev, [phone]: null}));
        });

        return avatarCache[phone];
    }

    const togglePhoneNumberInput = () => {
        setIsPhoneNumberInputOpen(!isPhoneNumberInputOpen);
    }

    const addDialog = () => {
        if(!isCorrectPhoneNumber) {
            setIsWrongPhoneNumber(true);
            return;
        };
        const phone = phoneNumber.slice(1);

        if(dialogs.includes(phone)) {
            return;
        };

        setDialogs([...dialogs, phone]);


        setIsWrongPhoneNumber(false);
        setIsCorrectPhoneNumber(false);
        setPhoneNumber('');       
    }

    const removeDialog = (phoneNumber) => {
        setDialogs(dialogs.filter(dialog => dialog.phone !== phoneNumber));
    }

    useEffect(() => {
        localStorage.setItem('savedDialogs', JSON.stringify(dialogs));
    }, [dialogs]);

    return (
        <div className={styles.conversationPanel}>
            <div className={styles.conversationPanelHeader}>
                    <h1 className={styles.conversationPanelHeaderLeftTitle}>
                        Чаты
                    </h1>
                    <Button className={styles.AddChat} onClick={togglePhoneNumberInput}>
                        <AddChat/>
                    </Button>
                    {isPhoneNumberInputOpen && (<div className={styles.phoneNumberInputContainer}>
                        <Button className={styles.phoneNumberInputArrowLeft} onClick={togglePhoneNumberInput}>
                            <ArrowLeft className={styles.phoneNumberInputIcons}/>
                        </Button>

                        <PhoneNumberInput
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                        isCorrectPhoneNumber={isCorrectPhoneNumber}
                        setIsCorrectPhoneNumber={setIsCorrectPhoneNumber}
                        isWrongPhoneNumber={isWrongPhoneNumber} />

                        <Button className={styles.phoneNumberInputPlus} onClick={addDialog}>
                            <Plus className={styles.phoneNumberInputIcons}/>
                        </Button>
                    </div>
                    )}
            </div>

            <div className={styles.conversationPanelBody}>
               <DialogsList
               dialogslist={dialogs}
               getAvatarWithCache ={getAvatarWithCache}
               />
            </div>

            <div className={styles.conversationPanelFooter}>
                <div className={styles.conversationPanelFooterLeft}>
                    <Button>
                        <UserAvatar avatar={userAvatar}/>
                    </Button>
                    <h1 className={styles.conversationPanelFooterLeftTitle}>{phoneFormatted(userPhone)}</h1>
                </div>
                <div className={styles.conversationPanelFooterRight}>

                    <Button className={styles.logoutButton} onClick={logout}>
                        <Logout />
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default ConversationPanel;
