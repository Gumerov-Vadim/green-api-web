import axiosInstance from './axiosInstance';
const getAvatar = async (idInstance, apiToken, chatId) => {
    try{      
        const response = await axiosInstance.post(`/waInstance${idInstance}/getAvatar/${apiToken}`, {
            chatId
        });
        return response.data;
    } catch (error) {
        throw new Error('Ошибка получения аватара');
    }
}

export default getAvatar;
