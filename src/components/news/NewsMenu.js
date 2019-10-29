import React, { useCallback, useContext, memo } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import media from 'styles/media';
import { Context as NewsContext } from 'contexts/newsContext';
import useInput from 'hooks/useInput';

const MenuContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 25px 0 50px;

    .btn {
        margin-right: 20px;
        outline: none;
        font-weight: 300;
        font-size: 16px;
        width: 110px;
        height: 30px;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.5);
    }
`;

const BottonBlock = styled.div`
    display: flex;
`;

const InputBlock = styled.div`
    ${media.tablet`
        flex:1;
        `}

    input {
        font-weight: 300;
        padding: 0 5px;
        outline: none;
        font-size: 16px;
        width: 150px;
        height: 30px;
        border-radius: 5px;
        border: none;
        border: 1px solid rgba(0, 0, 0, 0.2);
        ${media.tablet`
            width: 100%;
        `}

        &::placeholder {
            text-align: center;
            color: lightgray;
        }
    }
`;

const UpdateButton = styled.div`
    button {
        border-radius: 5px;
        transition: all 0.3s ease-out;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
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

const NewsMenu = memo(({ history, location, category, country, query }) => {
    const { getNews } = useContext(NewsContext);
    const [value, , onChange] = useInput();

    const c = category === 'all' ? '' : `/${category}`;

    const onSelectChange = useCallback(
        e => {
            history.push(`/${e.target.value}${c}`);
            history.go();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [category]
    );

    const onClick = useCallback(() => {
        getNews({ category, country, query });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            history.push(location.pathname + `?q=${value}`);
            history.go();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value]
    );

    return (
        <MenuContainer>
            <BottonBlock>
                <SelectContainer>
                    <select className="btn" onChange={onSelectChange} value={country}>
                        <option value="us">US</option>
                        <option value="kr">Korea</option>
                    </select>
                </SelectContainer>
                <UpdateButton>
                    <button className="btn" onClick={onClick}>
                        Update
                    </button>
                </UpdateButton>
            </BottonBlock>
            <InputBlock>
                <form onSubmit={onSubmit}>
                    <input type="text" value={value} onChange={onChange} placeholder="Search" />
                </form>
            </InputBlock>
        </MenuContainer>
    );
});

export default withRouter(NewsMenu);
