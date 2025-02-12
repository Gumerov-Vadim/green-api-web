import axiosInstance from './axiosInstance';

const getStateInstance = async (idInstance, apiTokenInstance) => {
    const response = await axiosInstance.get(`/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);
    return response.data;
};

export default getStateInstance;
