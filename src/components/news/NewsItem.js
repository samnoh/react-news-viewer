import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

import media from 'styles/media';

const ItemContainer = styled.article`
    padding-bottom: 15px;
    margin-bottom: 35px;
    border-bottom: solid 1px #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
        margin-bottom: 0px;
    }

    ${media.tablet`
        margin-bottom: 15px;
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

        a {
            &:hover {
                color: rgba(0, 0, 0, 0.6);
            }
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

const ImageBlock = styled.div`
    ${media.tablet`
        width: 100%;
    `}
`;

const Image = styled.img`
    display: block;
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: 50% 0;
    border-radius: 5px;
    transition: filter 0.3s ease-in-out;

    ${media.tablet`
        width: 100%;
        margin-bottom: 15px;
    `}

    &:hover {
        filter: brightness(0.8);
    }
`;

const NewsItem = memo(({ article }) => {
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
                    <Image src={urlToImage} alt={title} onError={onError} />
                </a>
            </ImageBlock>
        </ItemContainer>
    );
});

export default NewsItem;
