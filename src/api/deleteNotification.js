import axios from 'axios';

export const deleteNotification = async (idInstance, apiToken, receiptId) => {
    try {
        const response = await axios.delete(
            `${process.env.API_URL}/waInstance${idInstance}/deleteNotification/${apiToken}/${receiptId}`
        );
        return response.data;
    } catch (error) {
        throw new Error('Ошибка удаления уведомления');
    }
}