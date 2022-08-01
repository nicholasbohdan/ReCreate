import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { css } from '@emotion/css';
import { useParams } from "react-router-dom";
import { GET_ANIME_DATA_DETAIL } from '../../actions/anime';

function AnimeDetail(){
    const params = useParams();
    const [getDetailAnime, { data }] = useLazyQuery(GET_ANIME_DATA_DETAIL);
    React.useEffect(() => {
        getDetailAnime({
            variables: {
                id: params.animeId,
            },
        });
        // eslint-disable-next-line
      }, [getDetailAnime]);
    console.log(data?.Media)
    return(
        <div
            className={css`
                width: 100%;
                max-width: 100vw;
                background-color: #1a1a1a;
                padding-top: 14px;
                color: white;
            `}
        >
            <div
                className={css`
                    width: 100%;
                    max-width: 80vw;
                    margin: 0 auto;
                    text-align: center;
                `}
            >
                <div
                    className={css`
                        width: 100%;
                        padding-top: 14px;
                        height: 100%;
                        background-color: #222;
                    `}
                >
                    Anime Detail
                </div>
            </div>
        </div>
    )
}
export default AnimeDetail;