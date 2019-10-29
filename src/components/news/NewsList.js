import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import NewsItem from 'components/news/NewsItem';
import { Context as NewsContext } from 'contexts/newsContext';

const ArticleContainer = styled.div`
    max-width: 1080px;
    margin: 0 auto;
`;

const NewsList = ({ category, country }) => {
    const { state, getNews } = useContext(NewsContext);
    const { news, loading, error } = state;
    const { articles } = news;

    useEffect(() => {
        getNews(category, country);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    if (loading) {
        return <>Loading...</>;
    }

    if (!articles) {
        return null;
    }

    if (error || !articles.length) {
        return <>Error</>;
    }
    return (
        <ArticleContainer>
            {articles.map((a, i) => (
                <NewsItem key={a.url} article={a} index={i} />
            ))}
        </ArticleContainer>
    );
};

export default NewsList;
