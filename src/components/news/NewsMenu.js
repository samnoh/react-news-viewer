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

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
            border: 1px solid gray;
        }
    }
`;

const InputBlock = styled.div`
    ${media.tablet`
        flex:1;
    `}

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
    }

    button.btn {
        float: right;
        cursor: pointer;
        width: 20px;
        margin: 0;
        border: none;
        opacity: 0.2;
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
                        maxlength="255"
                        autoComplete="off"
                    />
                    <button type="submit" className="btn">
                        <svg
                            focusable="false"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -2 24 24"
                        >
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </button>
                </form>
            </InputBlock>
        </MenuContainer>
    );
});

export default withRouter(NewsMenu);
