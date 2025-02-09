import axios from 'axios';

const deleteNotification = async (idInstance, apiToken, receiptId) => {
    try {
        const response = await axios.delete(

            `${import.meta.env.VITE_API_URL}/waInstance${idInstance}/deleteNotification/${apiToken}/${receiptId}`
        );
        return response.data;

    } catch (error) {
        throw new Error('Ошибка удаления уведомления');
    }
}

export default deleteNotification;