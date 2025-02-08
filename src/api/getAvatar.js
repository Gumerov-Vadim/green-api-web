import axios from 'axios';

const getAvatar = async (idInstance, apiToken, chatId) => {
    try{        
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/waInstance${idInstance}/getAvatar/${apiToken}`, {
            chatId
        });
        return response.data;
    } catch (error) {
        throw new Error('Ошибка получения аватара');
    }
}

export default getAvatar;
