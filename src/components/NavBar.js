import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import media from 'styles/media';

const categories = [
    'all',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
];

const NavBarContainer = styled.div`
    border-bottom: solid 1px #e5e5e5;
    height: 80px;

    ${media.tablet`
        height: 280px;
        /* display: none; */
    `};
`;

const CategoryContainer = styled.div`
    display: flex;
    margin: 0 auto;
    align-items: center;
    height: 100%;
    max-width: 770px;

    ${media.tablet`
        flex-direction: column;
    `};
`;

const Category = styled(NavLink)`
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    text-align: center;
    font-weight: 300;
    font-size: 18px;
    transition: color 0.2s ease-in-out;
    width: 110px;
    line-height: 80px;

    ${media.tablet`
        line-height: 40px;
    `};

    &:hover {
        color: rgba(0, 0, 0, 0.5);
    }

    &.active {
        font-weight: 400;
        display: block;

        border-bottom: solid 2px black;

        ${media.tablet`
            border-bottom: none;
        `};
    }
`;

const NavBar = () => {
    return (
        <NavBarContainer>
            <CategoryContainer>
                {categories.map(c => (
                    <Category
                        key={c}
                        activeClassName="active"
                        exact={c === 'all'}
                        to={c === 'all' ? '/' : `/${c}`}
                    >
                        {c.charAt(0).toUpperCase() + c.substring(1)}
                    </Category>
                ))}
            </CategoryContainer>
        </NavBarContainer>
    );
};

export default NavBar;
