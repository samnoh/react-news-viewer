import axios from 'axios';

const COUNTRY = 'kr';

export const newsApi = axios.create({
    baseURL: `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`
});
