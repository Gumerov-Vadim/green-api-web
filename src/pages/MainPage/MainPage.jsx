import React, { useContext, useState } from 'react';
import ConversationPanel from '../../components/ConversationPanel/ConversationPanel';
import Chat from '../../components/Chat/Chat';
import styles from './MainPage.module.css';

const MainPage = () => {
    const [userId, setUserId] = useState(null);
    
    return (
        <div className={styles.mainPage}>
            <ConversationPanel pickConversation={setUserId} />
            <Chat phone={userId} />
        </div>
    )
}

export default MainPage;
