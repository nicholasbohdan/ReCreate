import { useLazyQuery } from '@apollo/client';
import { css } from '@emotion/css';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { GET_ALL_GENRES, GET_ANIME_DATA_LIST } from '../../actions/anime';
import anyaImg from '../../assets/Spy-x-Family-Anya-Forger.png';
// Spy-x-Family-Anya-Forger

function AnimeList(){
    const navigate = useNavigate();
    const [getListGenre, { data: genreList }] = useLazyQuery(GET_ALL_GENRES);
    
    const [getListAnime, { data }] = useLazyQuery(GET_ANIME_DATA_LIST);
    React.useEffect(() => {
        getListAnime({
            variables: {
                page: 1,
            },
        });
        getListGenre()
        // eslint-disable-next-line
      }, [getListAnime, getListGenre]);
    const handleRedirect = (id) => {
        navigate(`/detail/${id}`)
    }
    const handleFilterbyGenres = (genre) => {
        console.log(genre)
    }
    return(
        <div
            className={css`
                width: 100%;
                background-color: #1a1a1a;
            `}
        >
            <div  
                className={css`
                    width: 100%;
                    max-width: 90%;
                    margin: 0 auto;
                    display: flex;
                    padding: 14px;
                `}
            >
                <div
                    className={css`
                        width: 70%;
                        background-color: #1a1a1a;
                        padding-top: 14px;
                    `}
                >
                    <div
                        className={css`
                            width: 100%;
                            margin: 0 auto;
                            text-align: center;
                        `}
                    >
                    <div
                        className={css`
                            width: 100%;
                            padding: 12px;
                            margin-bottom: 4px;
                            height: 100%;
                            color: white;
                            text-align: initial;
                            background-color: #222;
                        `}
                    >
                        <label>Anime List</label>
                    </div>
                        <div
                            className={css`
                                width: 100%;
                                padding-top: 24px;
                                height: 100%;
                                background-color: #222;
                            `}
                        >
                            <ul 
                                className={css`
                                    display: table;
                                    margin: 0 auto;
                                    list-style-type: none;
                                    width: 100%;
                                    padding: 0px;
                                `}
                            >
                                {/* <button onClick={()=>handleRedirect()}> aaaaa</button> */}
                                {!data?
                                <div
                                    className={css`  
                                        color:white;
                                        height: 100vh;
                                    `}
                                > Loading... </div>
                                    : data.Page.mediaList.map((row, key)=>(
                                    <li
                                        className={css`  
                                            float: left;
                                            width: 17.9%;
                                            margin: 10px;
                                            height: 300px
                                        `}
                                    key={key}
                                    onClick={()=>handleRedirect(row.media.id)}
                                    >
                                        {/* <div> */}
                                            <img 
                                                className={css`  
                                                    float: left;
                                                    width: 100%;
                                                    height: 240px;
                                                `}
                                            src={row.media.coverImage.extraLarge} />
                                            <div
                                                className={css`
                                                    background: linear-gradient(to top,rgba(0, 0, 0, 0.83) 0,rgba(0,0,0,.05) 50%,rgba(0,0,0,.05) 50%,rgba(0, 0, 0, 0) 100%);
                                                    z-index: 1;
                                                    width: 100%;
                                                    height: 100%;
                                                    position: relative;
                                                    top: -60px;
                                                    color: white;
                                                `}
                                            >
                                                <lable
                                                className={css`
                                                    font-size: 16px;
                                                    line-height: 21px;
                                                `}
                                                >
                                                    {row.media.title.userPreferred}
                                                </lable>
                                            </div>
                                        {/* </div> */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    className={css`
                        width: 30%;
                        background-color: #1a1a1a;
                    `}
                >
                    {/* <div
                        className={css`
                            width: 100%;
                            padding: 14px;
                        `}
                    >
                        <div
                            className={css`
                                width: 100%;
                                padding: 12px;
                                margin-bottom: 4px;
                                height: 100%;
                                color: white;
                                text-align: initial;
                                background-color: #222;
                            `}
                        >
                            <label>Season Choose</label>
                        </div>
                    </div> */}
                    
                    <div
                        className={css`
                            width: 100%;
                            padding: 14px;
                        `}
                    >
                        <div
                            className={css`
                                width: 100%;
                                padding: 12px;
                                margin-bottom: 4px;
                                height: 100%;
                                color: white;
                                text-align: initial;
                                background-color: #222;
                            `}
                        >
                            <label>Genre Choose</label>
                            {/* genreList.GenreCollection */}
                            
                        </div>
                        <div
                            className={css`
                                width: 100%;
                                padding: 12px;
                                margin-bottom: 4px;
                                height: 100%;
                                color: white;
                                text-align: initial;
                                background-color: #222;
                            `}
                        >
                        <ul 
                                className={css`
                                    display: table;
                                    margin: 0 auto;
                                    list-style-type: none;
                                    width: 100%;
                                    padding: 0px;
                                `}
                            >
                                {!genreList?
                                <div
                                    className={css`  
                                        color:white;
                                        height: 100vh;
                                    `}
                                > Loading... </div>
                                    : genreList.GenreCollection.map((row, key)=>(
                                    <li
                                        className={css`
                                            padding: 8px;
                                        `}
                                        onClick={()=>handleFilterbyGenres(row)}
                                    >
                                        {row}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AnimeList;