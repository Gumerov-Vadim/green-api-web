import { useState, useEffect } from "react";
import getWaSettings from "../api/getWaSettings";
const useAuth = () => {
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('wa_auth')) || { idInstance: '', apiToken: '', isLoggedIn: false });

    const saveAuthData = (data) => {
        setAuthData(data);
        localStorage.setItem('wa_auth', JSON.stringify(data));
    };

    const login = (newIdInstance, newApiToken) => {
        try {
            const waSettings = getWaSettings(newIdInstance, newApiToken);

            waSettings.then(settings => {
                switch (settings.stateInstance) {
                    case 'authorized':
                    saveAuthData({

                        ...settings,
                        idInstance: newIdInstance,
                        apiToken: newApiToken,
                        isLoggedIn: true
                    });
                break;  
                case 'notAuthorized':
                    throw new Error('Необходимо повторно связать аккаунт с инстансом');
                    break;
                case 'blocked':
                    throw new Error('Аккаунт заблокирован.Необходимо прекратить запросы методов отправки к АПИ и сделать запрос на разблокировку аккаунта.');
                    break;
                case 'starting':
                    throw new Error('Аккаунт загружается.Попробуйте авторизоваться позже.');
                    break;
                case 'yellowCard':
                    throw new Error('Аккаунт получил предупреждение! Ознакомьтесь с инструкцией yellowCard.');
                    break;
                default:
                    throw new Error('Упс... Произошла неизвестная ошибка при авторизации');
                }
            });
        } catch (error) {
            throw new Error('Неверный Instance ID или API Token');
        }
    };

    const logout = () => {
        saveAuthData({
            idInstance: '',
            apiToken: '',
            isLoggedIn: false
        });
    };

    return { authData, login, logout };
};

export default useAuth;