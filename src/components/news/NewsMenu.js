import React, { useCallback, useContext, memo } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import media from 'styles/media';
import { Context as NewsContext } from 'contexts/newsContext';
import useInput from 'hooks/useInput';
import { ReactComponent as Search } from 'assets/search.svg';

const MenuContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 25px 0 50px;

    ${media.tablet`
        margin-bottom: 25px;
    `}

    .btn {
        margin-right: 20px;
        outline: none;
        font-weight: 300;
        font-size: 16px;
        width: 110px;
        height: 30px;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.5);

        ${media.mobile`
            font-size: 14px;
            width: 70px;
        `}
    }
`;

const BottonBlock = styled.div`
    display: flex;
`;

const SelectContainer = styled.div`
    select {
        -moz-appearance: none;
        -webkit-appearance: none;
        text-align-last: center;
        text-align: center;

        &::-ms-expand {
            display: none;
        }
    }
`;

const UpdateButton = styled.div`
    button {
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease-out;

        @media (hover: hover) {
            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
                border: 1px solid gray;
            }
        }
    }
`;

const InputBlock = styled.div`
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 30px;
    width: 170px;
    padding: 0 5px;

    ${media.tablet`
        width: 100%;
    `}

    input {
        float: left;
        font-weight: 300;
        height: 30px;
        width: calc(100% - 25px);
        outline: none;
        font-size: 16px;
        border: none;

        &::placeholder {
            text-align: center;
            color: lightgray;
        }

        ${media.mobile`
            font-size: 15px;
        `}
    }

    button.btn {
        float: right;
        cursor: pointer;
        width: 20px;
        margin: 0;
        border: none;
        opacity: 0.2;
    }

    @media (hover: hover) {
        .search_btn:hover {
            opacity: 1;
            fill: #357ac6;
        }
    }
`;

const NewsMenu = memo(({ history, location, category, country, query }) => {
    const { getNews } = useContext(NewsContext);
    const [value, setValue, onChange] = useInput();

    const onSelectChange = useCallback(
        e => {
            const c = category === 'all' ? '' : `/${category}`;
            history.push(`/${e.target.value}${c}`);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [category]
    );

    const onClick = useCallback(
        () => {
            getNews({ category, country, query });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [category, country, query]
    );

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            setValue('');
            value.length
                ? history.push(location.pathname + `?q=${value}`)
                : history.push(location.pathname);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [category, value]
    );

    return (
        <MenuContainer>
            <BottonBlock>
                <SelectContainer>
                    <select className="btn" onChange={onSelectChange} value={country}>
                        <option value="us">US</option>
                        <option value="nz">New Zealand</option>
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
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="Search"
                        maxLength="255"
                        autoComplete="off"
                    />
                    <button type="submit" className="btn">
                        <Search className="search_btn" />
                    </button>
                </form>
            </InputBlock>
        </MenuContainer>
    );
});

export default withRouter(NewsMenu);
