import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import NewsItem from 'components/news/NewsItem';
import { Context as NewsContext } from 'contexts/newsContext';

const ArticleContainer = styled.div`
    max-width: 1080px;
    margin: 0 auto;

    h2 {
        margin-bottom: 30px;
    }

    .errorMessage {
        font-size: 18px;
        margin-bottom: 30px;
    }
`;

const NewsList = ({ country, category, query }) => {
    const { state, getNews } = useContext(NewsContext);
    const { news, loading, error } = state;
    const { articles } = news;

    useEffect(
        () => {
            getNews({ country, category, query });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [country, category, query]
    );

    if (loading) {
        return (
            <ArticleContainer>
                <div className="errorMessage">Loading...</div>
            </ArticleContainer>
        );
    }

    if (!articles) {
        return (
            <ArticleContainer>
                <div className="errorMessage">API request was not successful...</div>
            </ArticleContainer>
        );
    }

    if (error) {
        return <ArticleContainer>Error</ArticleContainer>;
    }

    if (!articles.length) {
        return (
            <ArticleContainer>
                {query && <h2>Results for "{query}"</h2>}
                <div className="errorMessage">No Result</div>
            </ArticleContainer>
        );
    }

    return (
        <ArticleContainer>
            {query && <h2>Results for "{query}"</h2>}
            {articles.map(a => (
                <NewsItem key={a.url} article={a} />
            ))}
        </ArticleContainer>
    );
};

export default NewsList;
