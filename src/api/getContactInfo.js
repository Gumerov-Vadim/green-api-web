import axios from 'axios';
import handleRateLimitError from './handleRateLimitError';
export const getContactInfo = async (idInstance, apiToken, chatId) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/waInstance${idInstance}/getContactInfo/${apiToken}`,
            {
                chatId: `${chatId}`,
            }
        );
        return response.data;
    } catch (error) {
        handleRateLimitError(error);
        throw new Error('Ошибка получения информации о контакте');
    }
}