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
        margin-top: 20px;
        margin-bottom: 20px;
    `}

    .btn {
        margin-right: 20px;
        outline: none;
        font-weight: 300;
        font-size: 16px;
        width: 90px;
        height: 30px;
        background-color: white;
        color: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 0, 0, 0.2);

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
    border-radius: 5px;

    select {
        cursor: pointer;
        outline: none;
        padding: 0 34px;
        background: white;
        font-weight: inherit;
        font-size: inherit;
        color: inherit;
        height: 100%;
        border: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        &::-ms-expand {
            display: none;
        }

        ${media.tablet`
            padding: 0 25.5px;
        `}
    }

    @media (hover: hover) {
        &:hover {
            border: 1px solid gray;
        }
    }
`;

const RefreshContainer = styled.div`
    button {
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease-out;

        @media (hover: hover) {
            &:hover {
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
            color: rgba(0, 0, 0, 0.3);
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
                <SelectContainer className="btn">
                    <select name="country" onChange={onSelectChange} value={country}>
                        <option value="us">US</option>
                        <option value="nz">NZ</option>
                        <option value="kr">KR</option>
                    </select>
                </SelectContainer>
                <RefreshContainer>
                    <button className="btn" onClick={onClick}>
                        Refresh
                    </button>
                </RefreshContainer>
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
