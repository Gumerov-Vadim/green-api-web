import axiosInstance from './axiosInstance';

const deleteNotification = async (idInstance, apiToken, receiptId) => {
    try {
        const response = await axiosInstance.delete(

            `/waInstance${idInstance}/deleteNotification/${apiToken}/${receiptId}`
        );
        return response.data;

    } catch (error) {
        throw new Error('Ошибка удаления уведомления');
    }
}

export default deleteNotification;