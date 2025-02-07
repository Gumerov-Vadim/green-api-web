import axios from 'axios';

export const getContactInfo = async (idInstance, apiToken, chatId) => {
    try {
        const response = await axios.post(
            `${process.env.API_URL}/waInstance${idInstance}/getContactInfo/${apiToken}`,
            {
                chatId: `${chatId}@c.us`,
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Ошибка получения информации о контакте');
    }
}

