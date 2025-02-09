import axios from 'axios';

const receiveNotification = async (idInstance, apiToken) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/waInstance${idInstance}/receiveNotification/${apiToken}`
        );
        return response.data;

    } catch (error) {
        throw new Error('Ошибка получения уведомления');
    }
}

export default receiveNotification;