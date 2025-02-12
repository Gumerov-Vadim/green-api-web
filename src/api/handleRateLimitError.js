const handleRateLimitError = (error) => {
    if(error.response.status === 466){
        throw new Error('Число запросов в месяц превышено');
    }
}

export default handleRateLimitError;