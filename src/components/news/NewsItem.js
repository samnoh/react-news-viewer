import React, { memo, useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import media from 'styles/media';

const ItemContainer = styled.article`
    display: flex;
    height: 140px;
    margin-bottom: 20px;
    border-bottom: solid 1px #e5e5e5;

    &:last-child {
        margin-bottom: 0;
    }

    ${media.mobile`
        height: 88px;
        margin-bottom: 16px;
    `}
`;

const BodyBlock = styled.div`
    width: 100%;
    overflow-wrap: break-word;

    .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: rgba(0, 0, 0, 0.75);
        font-size: 24px;
        margin-bottom: 8px;
        font-weight: 400;
        overflow: hidden;
        line-height: 1.4;

        ${media.mobile`
            margin-top: 2px;
            font-size: 16px;
            margin-bottom: 0;
            -webkit-line-clamp: 3;
        `}

        a {
            @media (hover: hover) {
                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }

    .desc {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: gray;
        font-weight: 300;
        overflow: hidden;
        line-height: 1.5;

        ${media.mobile`
            display: none;
        `}
    }
`;

const ImageBlock = styled.div`
    margin-left: 18px;

    ${media.mobile`
        margin-left: 10px;
    `};
`;

const Image = styled.img`
    border: solid 1px #e5e5e5;
    width: 120px;
    height: 120px;
    object-fit: cover;
    object-position: 50% 0;
    border-radius: 5px;
    transition: filter 0.3s ease-in-out;

    ${props => props.isYoutubeUrl && `object-position: 50% 50%;`}

    ${media.mobile`
        width: 75px;
        height: 75px;
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
        source: { name }
    } = article;
    const [imgError, setImgError] = useState(false);

    const onError = useCallback(e => {
        setImgError(true);
    }, []);

    const checkImageSrc = useMemo(
        () => {
            const ImageTag = (src, isYoutubeUrl) => (
                <Image
                    loading="lazy"
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

                <div className="desc">{description}</div>
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
