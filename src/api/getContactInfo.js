import axios from 'axios';

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
        throw new Error('Ошибка получения информации о контакте');
    }
}

