import axiosInstance from './axiosInstance';
const getContactInfo = async (idInstance, apiToken, chatId) => {
    try {
        const response = await axiosInstance.post(
            `/waInstance${idInstance}/getContactInfo/${apiToken}`,
            {
                chatId: `${chatId}`,
            }
        );
        return response.data;
    } catch (error) {
        console.log('Ошибка получения информации о контакте');
        throw error;
    }
}

export default getContactInfo;