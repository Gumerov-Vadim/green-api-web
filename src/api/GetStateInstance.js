import axios from 'axios';

const getStateInstance = async (idInstance, apiTokenInstance) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);
    return response.data;
};

export default getStateInstance;
