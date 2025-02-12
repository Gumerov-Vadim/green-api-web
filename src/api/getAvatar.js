import axios from 'axios';
import handleRateLimitError from './handleRateLimitError';
const getAvatar = async (idInstance, apiToken, chatId) => {
    try{      
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/waInstance${idInstance}/getAvatar/${apiToken}`, {
            chatId
        });
        return response.data;
    } catch (error) {
        handleRateLimitError(error);
        throw new Error('Ошибка получения аватара');
    }
}

export default getAvatar;
