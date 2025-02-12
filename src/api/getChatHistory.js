import axiosInstance from './axiosInstance';
export const getChatHistory = async (idInstance, apiToken, chatId) => {
    try {
        const response = await axiosInstance.post(
            `/waInstance${idInstance}/getChatHistory/${apiToken}`,
            {
                chatId,
                limit: 100
            }
        );

        return response.data;
    } catch (error) {
        throw new Error('Ошибка получения истории чата');
    }
}
