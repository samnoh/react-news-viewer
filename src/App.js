import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Provider as NewsProvider } from 'contexts/newsContext';
import NewsPage from 'pages/NewsPage';
import NotFoundPage from 'pages/NotFoundPage';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    body {
        overflow-y: scroll;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

const App = () => {
    return (
        <NewsProvider>
            <GlobalStyle />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/us" />
                </Route>
                <Route exact path="/:country/:category?" component={NewsPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </NewsProvider>
    );
};

export default App;
