import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router-dom';

import NewsPage from 'pages/NewsPage';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }
`;

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Route path="/:category?" component={NewsPage} />
        </>
    );
};

export default App;
