import React, { memo, useCallback } from 'react';
import styled, { css } from 'styled-components';

import media from 'styles/media';

const ItemContainer = styled.article`
    padding-bottom: 15px;
    margin-bottom: 35px;
    border-bottom: solid 1px #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${media.tablet`
        flex-direction: column-reverse;
    `}
`;

const BodyBlock = styled.div`
    align-self: stretch;
    margin-right: 15px;
    flex: 1;

    .title {
        font-size: 24px;
        margin-bottom: 20px;

        &:hover {
            color: #20487b;
        }
    }

    .desc {
        line-height: 1.8;
        display: inline;
    }

    .date {
        display: inline-block;
        color: gray;
        font-size: 14px;
        vertical-align: middle;
    }
`;

const ImageBlock = styled.div``;

const Image = styled.img`
    display: block;
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: 50% 0;
    border-radius: 5px;

    ${media.tablet`
        width: 100%;
        margin: 25px 0;
        ${props =>
            props.firstChild &&
            css`
                margin-top: 0;
            `}
    `}
`;

const NewsItem = memo(({ article, index }) => {
    const { title, description, url, urlToImage, publishedAt } = article;
    const date = new Date(publishedAt);

    const onError = useCallback(e => {
        e.target.src = 'https://via.placeholder.com/200';
    }, []);

    return (
        <ItemContainer>
            <BodyBlock>
                <div className="title">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </div>
                <div className="desc">{description} </div>
                <div className="date">{`${date.getMonth() + 1}/${date.getDate()}`}</div>
            </BodyBlock>
            <ImageBlock>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={urlToImage}
                        alt={title}
                        onError={onError}
                        firstChild={index === 0}
                    />
                </a>
            </ImageBlock>
        </ItemContainer>
    );
});

export default NewsItem;
