import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import NewsPage from 'pages/NewsPage';
import NotFoundPage from 'pages/NotFoundPage';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow-y: scroll;
        font-family: 'Roboto', sans-serif;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

const App = () => {
    const [country] = useState(localStorage.getItem('news_country'));

    return (
        <>
            <GlobalStyle />
            <Switch>
                <Route exact path="/">
                    {country ? <Redirect to={`/${country}`} /> : <Redirect to="/us" />}
                </Route>
                <Route exact path="/404" component={NotFoundPage} />
                <Route exact path="/:country/:category?" component={NewsPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    );
};

export default App;
