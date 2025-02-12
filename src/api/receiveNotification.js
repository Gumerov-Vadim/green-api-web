import axiosInstance from './axiosInstance';

const receiveNotification = async (idInstance, apiToken) => {
    try {
        const response = await axiosInstance.get(
            `/waInstance${idInstance}/receiveNotification/${apiToken}`
        );
        return response.data;

    } catch (error) {
        throw new Error('Ошибка получения уведомления');
    }
}

export default receiveNotification;