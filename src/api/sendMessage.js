import axiosInstance from './axiosInstance';

const sendMessage = async (idInstance, apiToken, chatId, message) => {
    try {
      const response = await axiosInstance.post(
        `/waInstance${idInstance}/sendMessage/${apiToken}`,
        {
          chatId,
          message
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Ошибка отправки сообщения');
    }
  };

  export default sendMessage;