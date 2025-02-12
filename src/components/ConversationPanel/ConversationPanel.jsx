import React, { useState, useEffect, useContext } from 'react';
import AddChat from '../SVG/AddChat';
import Button from '../UI/Button/Button';
import styles from './ConversationPanel.module.css';
import PhoneNumberInput from '../UI/PhoneNumberInput/PhoneNumberInput';
import ArrowLeft from '../SVG/ArrowLeft';
import Plus from '../SVG/Plus';
import useAuth from '../../hooks/useAuth';
import DialogsList from '../DialogsList/DialogsList';
import Logout from '../SVG/Logout';
import UserAvatar from '../UserAvatar/UserAvatar';
import AuthContext from '../../context/AuthContext';
import phoneFormatted from '../../util/phoneFormatted';

const ConversationPanel = ({pickConversation, saveUser, removeUser, savedUsers, getUserData, getAvatar}) => {
    const {authData} = useAuth();
    const {phone:userPhone} = authData;

    const [isPhoneNumberInputOpen, setIsPhoneNumberInputOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isWrongPhoneNumber, setIsWrongPhoneNumber] = useState(false);
    const [isCorrectPhoneNumber, setIsCorrectPhoneNumber] = useState(false);

    const { logout } = useContext(AuthContext);

    const [userAvatar, setUserAvatar] = useState(null);

    useEffect(() => {
        getAvatar(userPhone).then(avatar => {
            setUserAvatar(avatar);
        }).catch(error => {
            console.log(`Ошибка получения аватара пользователя ${userPhone}: ${error}`);
        });
    }, [userPhone]);

    const onContactClick = (e) =>{
        const li = e.target.closest('li[data-phone]');
        if (!li) return;
        const conversation = li.dataset.phone;
        if(e.target.closest('button[data-close]')){
            removeUser(conversation);
            return;
        }

        pickConversation(conversation);
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

        if(savedUsers.includes(phone)) {
            return;
        };

        saveUser(phone);

        setIsWrongPhoneNumber(false);
        setIsCorrectPhoneNumber(false);
        setPhoneNumber('');       
    }

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
               dialogslist={savedUsers}
               onContactClick={onContactClick}
               getUserData={getUserData}
               getAvatar={getAvatar}
               />
            </div>

            <div className={styles.conversationPanelFooter}>
                <div className={styles.conversationPanelFooterLeft}>
                    <Button>
                        <UserAvatar avatar={userAvatar||null}/>
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
