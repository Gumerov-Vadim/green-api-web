import axios from 'axios';
import handleRateLimitError from './handleRateLimitError';

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
      // Обработка ошибки превышения лимита запросов
      handleRateLimitError(error);
      console.log("Ошибка отправки сообщения:", error);
      throw error;
    }
  };

  export default sendMessage;