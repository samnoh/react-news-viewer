import React, { useState, useCallback, useMemo, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import media from 'styles/media';
import useWindowSzie from 'hooks/useWindowSize';
import { Context as NewsContext } from 'contexts/newsContext';
import { capitalize, categories } from 'lib/helpers';
import { ReactComponent as MenuBar } from 'assets/menu.svg';
import { ReactComponent as CrossOut } from 'assets/cross-out.svg';

const MenuBarContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 30px 0;

    ${props => props.isVisible && `display: none`}

    ${media.mobile`
        padding: 15px 20px 0;
    `}

    .icon {
        width: 30px;
        cursor: pointer;
    }

    .title {
        font-weight: 300;
        color: #4a5568;
        user-select: none;
        font-size: 22px;
        flex: 1;
        text-align: center;
        text-indent: -30px;
    }
`;

const NavBarContainer = styled.nav`
    border-bottom: solid 1px #e5e5e5;
    height: 80px;

    ${media.tablet`
        height: 100%;
        padding: 10px 0;
    `};

    .icon {
        cursor: pointer;
        position: absolute;
        width: 22px;
        top: 25px;
        left: 35px;

        ${media.mobile`
            top: 20px;
            left: 24px;
        `};
    }
`;

const CategoryContainer = styled.div`
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 770px;

    ${media.tablet`
        flex-direction: column;
    `};
`;

const Category = styled(NavLink)`
    color: #4a5568;
    cursor: pointer;
    user-select: none;
    text-align: center;
    font-weight: 300;
    font-size: 18px;
    transition: color 0.2s ease-in-out;
    line-height: 80px;
    padding: 0 5px;

    ${media.tablet`
        line-height: 40px;
    `};

    @media (hover: hover) {
        &:hover {
            color: #a0aec0;
        }
    }

    &.active {
        font-weight: 400;
        display: block;

        border-bottom: solid 2px #4a5568;

        ${media.tablet`
            border-bottom: none;
        `};
    }
`;

const NavBar = ({ category, country }) => {
    const { state } = useContext(NewsContext);
    const [isVisible, setVisible] = useState(false);
    const [width] = useWindowSzie();
    const isTablet = width < 768;

    useEffect(() => {
        setVisible(false);
    }, [state.loading]);

    const navToggle = useCallback(() => {
        setVisible(!isVisible);
    }, [isVisible]);

    const categoryMenu = useMemo(
        () => {
            return categories.map(c => (
                <Category
                    onClick={navToggle}
                    key={c}
                    activeClassName="active"
                    exact
                    to={c === 'all' ? `/${country}` : `/${country}/${c}`}
                >
                    {capitalize(c)}
                </Category>
            ));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isVisible, country]
    );

    const nav = useMemo(
        () => {
            if (width <= 768 && !isVisible) {
                return (
                    <MenuBarContainer isVisible={isVisible}>
                        <MenuBar className="icon" onClick={navToggle} />
                        <div className="title">
                            {category === 'all' ? 'Headlines' : capitalize(category)}
                        </div>
                    </MenuBarContainer>
                );
            }

            if (width > 768) setVisible(false);

            return (
                <NavBarContainer>
                    {isTablet && <CrossOut className="icon" onClick={navToggle} />}
                    <CategoryContainer>{categoryMenu}</CategoryContainer>
                </NavBarContainer>
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isTablet, isVisible, country]
    );

    return <>{nav}</>;
};

NavBar.propTypes = {
    category: PropTypes.string,
    country: PropTypes.string
};

export default NavBar;
