import React from 'react';
import AddChat from '../SVG/AddChat';
import Button from '../UI/Button/Button';
import ProfileSVG from '../SVG/ProfileSVG';

const ConversationPanel = () => {
    return (
        <div className="conversation-panel">
            <div className="conversation-panel-header">
                <div className="conversation-panel-header-left">
                    <div className="conversation-panel-header-left-title">
                        <h1>Chat</h1>
                    </div>
                </div>
                <div className="conversation-panel-header-right">
                    <div className="conversation-panel-header-right-button">
                        <AddChat />
                    </div>
                </div>
            </div>
            <div className="conversation-panel-body">
                <div className="conversation-panel-body-message">
                    <div className="conversation-panel-body-message-text">
                        <p>Hello</p>
                    </div>
                </div>
            </div>
            <div className="conversation-panel-footer">
                <Button>
                    <ProfileSVG />
                </Button>
            </div>
        </div>
    )
}

export default ConversationPanel;
