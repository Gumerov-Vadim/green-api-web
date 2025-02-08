import { useState, useEffect } from "react";
import getWaSettings from "../api/getWaSettings";
const useAuth = () => {
    const [authData, setAuthData] = useState(() => {
        const storedData = localStorage.getItem('wa_auth');

        return storedData 
          ? JSON.parse(storedData)
          : { idInstance: '', apiToken: '', isLoggedIn: false };
      });

    useEffect(() => {
        localStorage.setItem('wa_auth', JSON.stringify(authData));
    }, [authData]);

    const login = async (newIdInstance, newApiToken) => {
        try {
            const waSettings = await getWaSettings(newIdInstance, newApiToken);
                switch (waSettings.stateInstance) {
                    case 'authorized':
                    setAuthData({
                        idInstance: newIdInstance,
                        apiToken: newApiToken,
                        ...waSettings,
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
            } catch (error) {
                throw new Error('Неверный Instance ID или API Token');
            }
    };



    const logout = () => {
        setAuthData({
            idInstance: '',
            apiToken: '',
            isLoggedIn: false
        });
    };

    return { authData, login, logout };
};

export default useAuth;


