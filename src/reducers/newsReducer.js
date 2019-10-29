import { newsApi } from 'lib/api';

const GET_NEWS = 'GET_NEWS';
const GET_NEWS_LOADING = 'GET_NEWS_LOADING';
const GET_NEWS_DONE = 'GET_NEWS_DONE';
const GET_NEWS_ERROR = 'GET_NEWS_ERROR';

const getNewsAction = news => ({
    type: GET_NEWS,
    payload: news
});

export const getNews = dispatch => async (category, country) => {
    const params = { country, category };
    if (category === 'all') delete params.category;

    dispatch({ type: GET_NEWS_LOADING });
    try {
        const news = await newsApi.get('', { params });
        dispatch(getNewsAction(news.data));
        dispatch({ type: GET_NEWS_DONE });
    } catch (e) {
        dispatch({ type: GET_NEWS_ERROR });
    }
};

const newsReducer = (state, action) => {
    switch (action.type) {
        case GET_NEWS:
            return { ...state, news: action.payload };
        case GET_NEWS_LOADING:
            return { ...state, loading: true, error: false };
        case GET_NEWS_DONE:
            return { ...state, loading: false, error: false };
        case GET_NEWS_ERROR:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export default newsReducer;