import axios from 'axios';

const getWaSettings = async (idInstance, apiToken) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/waInstance${idInstance}/getWaSettings/${apiToken}`);
    return response.data;
};

export default getWaSettings;
