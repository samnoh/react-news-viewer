import React, { memo, useMemo, useCallback } from 'react';
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
        padding-bottom: 5px;
        margin-bottom: 20px;
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
        font-weight: 400;

        ${media.mobile`
            font-size: 20px;
            margin-bottom: 10px;
        `}

        a {
            @media (hover: hover) {
                &:hover {
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }

    .desc {
        line-height: 1.8;
        display: inline-block;
        font-weight: 300;
        overflow-wrap: break-word;
        width: 100%;

        ${media.mobile`
            font-size: 15px;
        `}
    }

    .date {
        display: inline-block;
        color: rgba(0, 0, 0, 0.3);
        font-size: 14px;
        vertical-align: 1px;

        ${media.mobile`
            font-size: 13px;
        `}
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

    ${media.mobile`
        height: 175px;
        margin-bottom: 10px;
    `}

    @media (hover: hover) {
        &:hover {
            filter: brightness(0.8);
        }
    }
`;

const NewsItem = memo(({ article }) => {
    const {
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        source: { name }
    } = article;
    const date = new Date(publishedAt);

    const onError = useCallback(e => {
        e.target.src = 'https://via.placeholder.com/200';
    }, []);

    const checkImageSrc = useMemo(
        () => {
            if (urlToImage && (urlToImage.includes('jpg') || urlToImage.includes('png'))) {
                return urlToImage;
            }
            return 'https://via.placeholder.com/200';
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    if (name === 'Chosun.com') return null;

    return (
        <ItemContainer>
            <BodyBlock>
                <div className="title">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </div>
                <div className="desc">
                    {description}{' '}
                    <div className="date">{`${date.getMonth() + 1}/${date.getDate()}`}</div>
                </div>
            </BodyBlock>
            <ImageBlock>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <Image src={checkImageSrc} alt={`${name} thumnail`} onError={onError} />
                </a>
            </ImageBlock>
        </ItemContainer>
    );
});

export default NewsItem;
