import React from 'react';
import NavBar from 'components/NavBar';
import NewsList from 'components/NewsList';

const NewsPage = ({ match }) => {
    const category = match.params.category || 'all';

    return (
        <>
            <NavBar />
            <NewsList category={category} />
        </>
    );
};

export default NewsPage;
