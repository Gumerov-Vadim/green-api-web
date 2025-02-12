import axiosInstance from './axiosInstance';
const getWaSettings = async (idInstance, apiToken) => {
    try{
        const response = await axiosInstance.get(`/waInstance${idInstance}/getWaSettings/${apiToken}`);
        return response.data;
    } catch (error) {
        throw new Error('Ошибка получения настроек');
    }
};

export default getWaSettings;
