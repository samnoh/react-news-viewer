import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import qs from 'qs';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import NavBar from 'components/common/NavBar';
import NewsMenu from 'components/news/NewsMenu';
import NewsList from 'components/news/NewsList';
import Footer from 'components/common/Footer';
import media from 'styles/media';
import { capitalize, countries } from 'lib/helpers';
import { ReactComponent as UpChevron } from 'assets/up-chevron.svg';
import { ReactComponent as DownChevron } from 'assets/down-chevron.svg';

const Main = styled.main`
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 30px;

    ${media.mobile`
        padding: 0 15px;
    `}
`;

const ButtonContainer = styled.div`
    width: 90px;
    height: 35px;
    background-color: #e5e5e5;
    position: fixed;
    bottom: 0;
    right: 0;
    opacity: 0.6;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top-left-radius: 5px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-left: 1px solid rgba(0, 0, 0, 0.3);

    div {
        cursor: pointer;
        height: 100%;
        width: 100%;
        text-align: center;

        @media (hover: hover) {
            &:hover {
                opacity: 0.3;
            }
        }
    }

    .chevron {
        fill: rgba(0, 0, 0, 0.3);
        width: 20px;
        height: 100%;
    }
`;

const NewsPage = ({ match, location }) => {
    const category = match.params.category || 'all';
    const country = match.params.country || 'us';
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const q = query.q;

    const scrollTo = useCallback(toBottom => {
        window.scrollTo({
            top: toBottom === 'bottom' ? document.body.scrollHeight : 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

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
            <ButtonContainer>
                <div onClick={() => scrollTo()}>
                    <UpChevron class="chevron"></UpChevron>
                </div>
                <div onClick={() => scrollTo('bottom')}>
                    <DownChevron class="chevron"></DownChevron>
                </div>
            </ButtonContainer>
            <Footer />
        </>
    );
};

export default NewsPage;
