import axios from 'axios';

const sendMessage = async (idInstance, apiToken, chatId, message) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/waInstance${idInstance}/sendMessage/${apiToken}`,
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