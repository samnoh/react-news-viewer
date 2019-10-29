import React from 'react';
import styled from 'styled-components';

import NavBar from 'components/common/NavBar';
import NewsMenu from 'components/news/NewsMenu';
import NewsList from 'components/news/NewsList';
import Footer from 'components/common/Footer';

const Main = styled.main`
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 30px;
`;

const NewsPage = ({ match }) => {
    const category = match.params.category || 'all';
    const country = match.params.country;

    return (
        <>
            <NavBar country={country} />
            <Main>
                <NewsMenu category={category} country={country} />
                <NewsList category={category} country={country} />
            </Main>
            <Footer />
        </>
    );
};

export default NewsPage;
