import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context as NewsContext } from 'contexts/newsContext';
import { ReactComponent as GithubLogo } from 'assets/github_logo.svg';

const Container = styled.footer`
    padding: 0 30px;
    height: 80px;
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    font-weight: 300;
    color: gray;

    .left,
    .right {
        cursor: pointer;
        &:hover {
            color: rgba(0, 0, 0, 0.3);
        }

        &:hover .logo {
            opacity: 0.2;
        }
    }

    .logo {
        vertical-align: text-top;
        width: 15px;
        margin-right: 3px;
        opacity: 0.3;
    }
`;

const Footer = () => {
    const { state } = useContext(NewsContext);
    const { loading } = state;

    if (loading) return null;

    return (
        <Container>
            <div className="left">
                <a
                    href="https://github.com/samnoh/react-news-viewer"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GithubLogo className="logo" />
                    GitHub
                </a>
            </div>
            <div className="right">
                <a href="https://newsapi.org">Powered by NewsAPI</a>
            </div>
        </Container>
    );
};

export default Footer;
