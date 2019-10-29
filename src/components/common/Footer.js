import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
    height: 50px;
    max-width: 1080px;
    margin: 0 auto;

    .text {
        text-align: right;
        cursor: pointer;

        &:hover {
            color: gray;
        }
    }
`;

const Footer = () => {
    return (
        <Container>
            <div className="text">
                Powered by <a href="https://newsapi.org">News API</a>
            </div>
        </Container>
    );
};

export default Footer;
