import React from 'react';
import styles from './DialogsList.module.css';
import Dialog from '../Dialog/Dialog';

const DialogsList = ({dialogslist, getAvatarWithCache, onContactClick}) => {
    
    return <ul className={styles.dialogsList}>

        {dialogslist.map(dialog => (
            <Dialog
            key={dialog}
            phone={dialog}
            name={dialog}
            getAvatarWithCache={getAvatarWithCache}
            onClick={onContactClick}
            data-phone={dialog}
            />
        ))}
    </ul>;
};

export default DialogsList;
