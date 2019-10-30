import axios from 'axios';

export const newsApi = axios.create({
    baseURL: `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`
    // baseURL: ''
});
