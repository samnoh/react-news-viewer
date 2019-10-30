import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context as NewsContext } from 'contexts/newsContext';

const Container = styled.footer`
    padding: 0 30px;
    height: 50px;
    max-width: 1080px;
    margin: 0 auto;

    .text {
        font-weight: 300;
        color: gray;
        text-align: right;
        cursor: pointer;

        &:hover {
            color: rgba(0, 0, 0, 0.3);
        }
    }
`;

const Footer = () => {
    const { state } = useContext(NewsContext);
    const { loading } = state;

    if (loading) return null;

    return (
        <Container>
            <div className="text">
                Powered by <a href="https://newsapi.org">News API</a>
            </div>
        </Container>
    );
};

export default Footer;
