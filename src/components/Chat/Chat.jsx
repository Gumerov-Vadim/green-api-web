import React, { useContext } from 'react';
import { getContactInfo } from '../../api/getContactInfo';
import Editor from '../UI/Editor/Editor';
import useAuth from '../../hooks/useAuth';
import UserAvatar from '../UserAvatar/UserAvatar';
const Chat = () => {
    const {authData} = useAuth();
    const {idInstance, apiToken, phone} = authData;
    const data = (async ()=>await getContactInfo(idInstance, apiToken, `${phone}@c.us`))();

    const handleSendMessage = (message) => {
        console.log(message);
    }


    return (
        <div className="chat">
            {data && (<>
                        <div className="chat-header">
                            <div className="chat-header-left">
                                <div className="chat-header-left-user">

                                    <div className="chat-header-left-user-avatar">
                                        <UserAvatar avatar={data.avatar} />
                                    </div>
                                    <div className="chat-header-left-user-name">
                                        <h3>{data.name||phone}</h3>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="chat-body">
                    </div>
                    <Editor onSendMessage={handleSendMessage} />
                </>
            )}
        </div>
    )
}

export default Chat;
