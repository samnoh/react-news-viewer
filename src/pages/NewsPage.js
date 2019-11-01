import React, { useMemo } from 'react';
import styled from 'styled-components';
import qs from 'qs';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import NavBar from 'components/common/NavBar';
import ScrollButton from 'components/common/ScrollButton';
import NewsMenu from 'components/news/NewsMenu';
import NewsList from 'components/news/NewsList';
import Footer from 'components/common/Footer';
import media from 'styles/media';
import { capitalize, countries } from 'lib/helpers';

const Main = styled.main`
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 30px;

    ${media.mobile`
        padding: 0 15px;
    `}
`;

const NewsPage = ({ match, location }) => {
    const category = match.params.category || 'all';
    const country = match.params.country || 'us';
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const q = query.q;

    const htmlTitle = useMemo(() => {
        return (
            <Helmet>
                <title>
                    {category === 'all' ? 'General' : capitalize(category)} |{' '}
                    {country.toUpperCase()}
                </title>
            </Helmet>
        );
    }, [category, country]);

    if (country.length !== 2 || !countries.includes(country)) {
        return <Redirect to="404" />;
    }

    return (
        <>
            {htmlTitle}
            <NavBar category={category} country={country} />
            <Main>
                <NewsMenu category={category} country={country} query={q} />
                <NewsList category={category} country={country} query={q} />
            </Main>
            <ScrollButton />
            <Footer />
        </>
    );
};

export default NewsPage;
