import axios from 'axios';
import handleRateLimitError from './handleRateLimitError';
const getWaSettings = async (idInstance, apiToken) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/waInstance${idInstance}/getWaSettings/${apiToken}`);
        return response.data;
    } catch (error) {
        handleRateLimitError(error);
        throw new Error('Ошибка получения настроек');
    }
};

export default getWaSettings;
