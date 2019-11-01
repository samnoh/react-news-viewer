import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import media from 'styles/media';

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #fcf9f4;
    height: 100vh;
    text-align: center;

    h1 {
        font-weight: 400;
        font-size: 40px;
        margin-bottom: 30px;

        ${media.tablet`
            font-size: 28px;
        `};
    }

    img {
        width: 500px;
        margin-bottom: 35px;
        filter: blur(15);

        ${media.tablet`
            width: 280px;
        `};
    }
`;

const Redirect = styled(Link)`
    font-weight: 300;
    color: gray;
    border: 1px solid gray;
    padding: 10px 15px;
    border-radius: 5px;
    transition: all 0.3s ease-in;

    @media (hover: hover) {
        &:hover {
            background-color: white;
            border-color: black;
            color: black;
        }
    }
`;

const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <title>404 — Page Not Found</title>
            </Helmet>
            <PageContainer>
                <h1>404 — Page Not Found</h1>
                <img src="/404.png" alt="Page Not Found" />
                <Redirect to="/">Go Back Home</Redirect>
            </PageContainer>
        </>
    );
};

export default NotFoundPage;
