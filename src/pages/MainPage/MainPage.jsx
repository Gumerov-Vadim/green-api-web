import React, { useContext } from 'react';
import ConversationPanel from '../../components/ConversationPanel/ConversationPanel';
import Chat from '../../components/Chat/Chat';
import styles from './MainPage.module.css';
import Button from '../../components/UI/Button/Button';
import AuthContext from '../../context/AuthContext';

const MainPage = () => {
    const { logout } = useContext(AuthContext);
    return (
        <div className={styles.mainPage}>
            <ConversationPanel />
            <Chat />
            {/* <Button onClick={logout}>Выйти</Button> */}
        </div>
    )
}

export default MainPage;
