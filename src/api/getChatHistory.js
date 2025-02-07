import axios from 'axios';

export const getChatHistory = async (idInstance, apiToken, chatId) => {
    try {
        const response = await axios.post(
            `${process.env.API_URL}/waInstance${idInstance}/getChatHistory/${apiToken}`,
            {
                chatId: `${chatId}@c.us`,
                limit: 100
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Ошибка получения истории чата');
    }
}
