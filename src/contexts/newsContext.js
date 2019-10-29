import createDataContext from './createDataContext';
import newsReducer, { getNews } from 'reducers/newsReducer';

const initialState = {
    news: [],
    loading: false,
    error: false
};

export const { Provider, Context } = createDataContext(newsReducer, { getNews }, initialState);
