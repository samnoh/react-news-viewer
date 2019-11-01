import React, { memo, useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    min-height: 200px;
    margin-left: 15px;

    ${media.tablet`
        width: 100%;
        min-height: 0;
        margin-left: 0;
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

    ${props => props.isYoutubeUrl && `object-position: 50% 50%;`}

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
    const [imgError, setImgError] = useState(false);
    const date = new Date(publishedAt);

    const onError = useCallback(e => {
        setImgError(true);
    }, []);

    const checkImageSrc = useMemo(
        () => {
            const ImageTag = (src, isYoutubeUrl) => (
                <Image
                    src={src}
                    alt={`${name} thumnail`}
                    onError={onError}
                    isYoutubeUrl={isYoutubeUrl}
                />
            );

            if (imgError) {
                return null;
            }

            if (url && url.includes('youtube')) {
                const [, youtubeId] = url.split('=');
                return ImageTag(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`, true);
            }

            if (urlToImage && (urlToImage.includes('jpg') || urlToImage.includes('png')))
                return ImageTag(urlToImage);

            return null;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [imgError]
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
            {checkImageSrc && (
                <ImageBlock>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {checkImageSrc}
                    </a>
                </ImageBlock>
            )}
        </ItemContainer>
    );
});

NewsItem.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        urlToImage: PropTypes.string,
        publishedAt: PropTypes.string,
        source: PropTypes.shape({
            name: PropTypes.string
        })
    })
};

export default NewsItem;
