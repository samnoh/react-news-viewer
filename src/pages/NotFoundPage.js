import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
    padding: 40px;
    text-align: center;
    position: relative;

    h1 {
        font-size: 40px;
    }
`;

const Redirect = styled(Link)`
    text-decoration: underline;
    position: absolute;
    top: 30px;
    left: 30px;

    &:hover {
        color: gray;
    }
`;

const NotFoundPage = () => {
    return (
        <PageContainer>
            <h1>404 Not Found</h1>
            <Redirect to="/">Back Home</Redirect>
        </PageContainer>
    );
};

export default NotFoundPage;
