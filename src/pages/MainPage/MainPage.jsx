import React from 'react';
import ConversationPanel from '../../components/ConversationPanel/ConversationPanel';
import Chat from '../../components/Chat/Chat';
const MainPage = () => {
    return (
        <div className="main-page">
            <ConversationPanel />

            <Chat/>
        </div>
    )
}


export default MainPage;
