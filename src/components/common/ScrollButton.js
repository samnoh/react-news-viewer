import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as UpChevron } from 'assets/up-chevron.svg';
import { ReactComponent as DownChevron } from 'assets/down-chevron.svg';

const ButtonContainer = styled.div`
    width: 90px;
    height: 35px;
    background-color: #e5e5e5;
    position: fixed;
    bottom: 0;
    right: 0;
    opacity: 0.6;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top-left-radius: 5px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-left: 1px solid rgba(0, 0, 0, 0.3);

    div {
        cursor: pointer;
        height: 100%;
        width: 100%;
        text-align: center;

        @media (hover: hover) {
            &:hover {
                opacity: 0.3;
            }
        }
    }

    .chevron {
        fill: rgba(0, 0, 0, 0.3);
        width: 20px;
        height: 100%;
    }
`;

const ScrollButton = ({ up, down, isSmooth }) => {
    const scrollTo = useCallback(
        toBottom => {
            window.scrollTo({
                top: toBottom === 'bottom' ? document.body.scrollHeight : 0,
                left: 0,
                behavior: isSmooth ? 'smooth' : 'auto'
            });
        },
        [isSmooth]
    );

    if (!up && !down) return null;

    return (
        <ButtonContainer>
            {up && (
                <div onClick={() => scrollTo()}>
                    <UpChevron className="chevron"></UpChevron>
                </div>
            )}
            {down && (
                <div onClick={() => scrollTo('bottom')}>
                    <DownChevron className="chevron"></DownChevron>
                </div>
            )}
        </ButtonContainer>
    );
};

ScrollButton.defaultProps = {
    up: true,
    down: true,
    isSmooth: false
};

ScrollButton.propTypes = {
    up: PropTypes.bool,
    down: PropTypes.bool,
    isSmooth: PropTypes.bool
};

export default ScrollButton;
