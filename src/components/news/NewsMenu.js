import React, { useCallback, useContext, useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import media from 'styles/media';
import { rotate360deg } from 'styles/animation';
import { Context as NewsContext } from 'contexts/newsContext';
import useInput from 'hooks/useInput';
import { ReactComponent as Search } from 'assets/search.svg';
import { ReactComponent as Refresh } from 'assets/reload.svg';
import { countries } from 'lib/helpers';

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
        color: rgba(0, 0, 0, 0.5);
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

        ${media.mobile`
            padding: 0 25.5px;
        `}
    }
`;

const RefreshContainer = styled.div`
    button.btn {
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease-out;
        width: 34px;
        height: 27px;
        padding-top: 3px;

        .refresh {
            width: 16px;
            fill: rgba(0, 0, 0, 0.6);
        }

        .rotate {
            animation: ${rotate360deg} 1s linear infinite;
        }
    }
`;

const InputBlock = styled.div`
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    height: 30px;
    width: 112px;
    padding: 0 5px;

    ${media.tablet`
        width: 100%;
    `}

    input {
        float: left;
        font-weight: 300;
        height: 30px;
        width: calc(100% - 35px);
        outline: none;
        font-size: 16px;
        border: none;

        &::placeholder {
            text-indent: 20px;
            text-align: center;
            color: rgba(0, 0, 0, 0.5);
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
        opacity: 0.4;
    }
`;

const NewsMenu = memo(({ history, location, category, country, query }) => {
    const {
        state: { loading },
        getNews
    } = useContext(NewsContext);
    const [value, setValue, onChange] = useInput();
    const [onRefresh, setOnRefrsh] = useState(false);

    useEffect(() => {
        if (!loading) setOnRefrsh(false);
    }, [loading]);

    const onSelectChange = useCallback(
        e => {
            const selectedCountry = e.target.value;
            const c = category === 'all' ? '' : `/${category}`;
            history.push(`/${selectedCountry}${c}`);
            localStorage.setItem('news_country', selectedCountry);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [category]
    );

    const onClick = useCallback(
        () => {
            setOnRefrsh(true);
            getNews({ category, country, query });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [category, country, query]
    );

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            e.target.search.blur();
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
                        {countries.map(c => (
                            <option key={c} value={c}>
                                {c.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </SelectContainer>
                <RefreshContainer>
                    <button className="btn" onClick={onClick}>
                        <Refresh className={`refresh ${onRefresh ? 'rotate' : ''}`} />
                    </button>
                </RefreshContainer>
            </BottonBlock>
            <InputBlock>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="search"
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

NewsMenu.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    country: PropTypes.string,
    category: PropTypes.string,
    query: PropTypes.string
};

export default withRouter(NewsMenu);
