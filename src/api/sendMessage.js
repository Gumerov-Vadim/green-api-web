import axios from 'axios';

export const sendMessage = async (idInstance, apiToken, chatId, message) => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/waInstance${idInstance}/sendMessage/${apiToken}`,
        {
          chatId: `${chatId}@c.us`,
          message
        }
      );

      return response.data;
    } catch (error) {
      throw new Error('Ошибка отправки сообщения');
    }
  };