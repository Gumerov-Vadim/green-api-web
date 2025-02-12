import axios from 'axios';
import handleRateLimitError from './handleRateLimitError';
export const getChatHistory = async (idInstance, apiToken, chatId) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/waInstance${idInstance}/getChatHistory/${apiToken}`,
            {
                chatId,
                limit: 100
            }
        );

        return response.data;
    } catch (error) {
        handleRateLimitError(error);
        throw new Error('Ошибка получения истории чата');
    }
}
