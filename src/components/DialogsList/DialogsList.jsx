import React from 'react';
import styles from './DialogsList.module.css';
import Dialog from '../Dialog/Dialog';

const DialogsList = ({dialogslist, getAvatarWithCache}) => {
    
    return <ul className={styles.dialogsList}>

        {dialogslist.map(dialog => (
            <Dialog key={dialog} phone={dialog} name={dialog} getAvatarWithCache={getAvatarWithCache}/>
        ))}

    </ul>;
};

export default DialogsList;
