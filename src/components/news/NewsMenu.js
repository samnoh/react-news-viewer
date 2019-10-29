import React, { useCallback, useContext, memo } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import media from 'styles/media';
import { Context as NewsContext } from 'contexts/newsContext';

const MenuContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 25px 0 50px;
    ${media.tablet`justify-content: space-between;`}

    .btn {
        outline: none;
        font-weight: 300;
        font-size: 16px;
        width: 110px;
        height: 30px;
        background-color: white;
        border: 1px solid black;
    }
`;

const UpdateButton = styled.div`
    margin-right: 20px;

    button {
        border-radius: 5px;
        transition: all 0.3s ease-out;

        &:hover {
            background-color: lightgray;
            border: 1px solid gray;
        }
    }
`;

const SelectContainer = styled.div`
    select {
        text-align-last: center;
        text-align: center;
    }
`;

const NewsMenu = memo(({ category, country, history }) => {
    const { getNews } = useContext(NewsContext);
    const c = category === 'all' ? '' : `/${category}`;

    const onChange = useCallback(
        e => {
            history.push(`/${e.target.value}${c}`);
            history.go();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [category]
    );

    const onClick = useCallback(() => {
        getNews(category, country);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <MenuContainer>
            <UpdateButton>
                <button className="btn" onClick={onClick}>
                    Update
                </button>
            </UpdateButton>
            <SelectContainer>
                <select className="btn" onChange={onChange} value={country}>
                    <option value="us">US</option>
                    <option value="kr">Korea</option>
                </select>
            </SelectContainer>
        </MenuContainer>
    );
});

export default withRouter(NewsMenu);
