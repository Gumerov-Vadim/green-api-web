import React, { useState, useEffect } from 'react';
import AddChat from '../SVG/AddChat';
import Button from '../UI/Button/Button';
import ProfileSVG from '../SVG/ProfileSVG';
import styles from './ConversationPanel.module.css';
import PhoneNumberInput from '../UI/PhoneNumberInput/PhoneNumberInput';
import ArrowLeft from '../SVG/ArrowLeft';
import Plus from '../SVG/Plus';

const ConversationPanel = () => {
    const initDialogs = JSON.parse(localStorage.getItem('savedDialogs'))||[];

    const [dialogs, setDialogs] = useState(initDialogs);
    const [isPhoneNumberInputOpen, setIsPhoneNumberInputOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isWrongPhoneNumber, setIsWrongPhoneNumber] = useState(false);
    const [isCorrectPhoneNumber, setIsCorrectPhoneNumber] = useState(false);

    const togglePhoneNumberInput = () => {
        setIsPhoneNumberInputOpen(!isPhoneNumberInputOpen);
    }
    const addDialog = () => {
        if(!isCorrectPhoneNumber) {
            setIsWrongPhoneNumber(true);
            return;
        };
        if(dialogs.includes(phoneNumber)) return;
        setDialogs([...dialogs, phoneNumber.slice(1)]);
        setIsWrongPhoneNumber(false);
        setIsCorrectPhoneNumber(false);
        setPhoneNumber('');
    }
    const removeDialog = (phoneNumber) => {
        setDialogs(dialogs.filter(dialog => dialog !== phoneNumber));
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
                <div className={styles.conversationPanelBodyMessage}>
                    <div className={styles.conversationPanelBodyMessageText}>
                        <p>Hello</p>
                    </div>
                </div>
            </div>
            <div className={styles.conversationPanelFooter}>
                <Button>
                    <ProfileSVG />
                </Button>
            </div>
        </div>
    )
}

export default ConversationPanel;
