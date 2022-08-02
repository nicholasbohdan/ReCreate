import { useQuery } from '@apollo/client';
import { css } from '@emotion/css';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GET_ALL_GENRES, GET_ANIME_DATA_LIST } from '../../actions/anime';
import anyaImg from '../../assets/Spy-x-Family-Anya-Forger.png';
import { AnimeListContext } from '../../context/Context';
// Spy-x-Family-Anya-Forger

function AnimeList(){
    const navigate = useNavigate();
    const { dataContext, setDataContext } = useContext(AnimeListContext);
    const { data: genreList, error: GetAktaError, loading: isGenreListLoading } = useQuery(GET_ALL_GENRES);
    const { data: animeLists, error: GetAnimeListError, loading: isAnimeListLoading } = useQuery(GET_ANIME_DATA_LIST, {
        variables: { page: 1 },
    });
    React.useEffect(() => {
        if(!isAnimeListLoading && !isGenreListLoading){
            let temp = genreList.GenreCollection.filter(row=>row !== 'Hentai');
            setDataContext({
                animeList: animeLists.Page.mediaList,
                genreList: temp
            })
        }
        // eslint-disable-next-line
      }, [genreList, animeLists]);
    const handleRedirect = (id) => {
        navigate(`/detail/${id}`)
    }
    const handleFilterbyGenres = (genre) => {
        console.log(genre)
    }
    console.log(animeLists)
    return(
        <div
            className={css`
                width: 100%;
                background-color: #1a1a1a;
            `}
        >
            <div  
                className={css`
                    @media (max-width: 600px) {
                        display: block;
                    };
                    width: 100%;
                    max-width: 90%;
                    margin: 0 auto;
                    display: flex;
                    padding: 14px;
                `}
            >
                <div
                    className={css`
                        @media (max-width: 600px) {
                            width: 100%;
                        };
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
                            @media (max-width: 600px) {             
                                width: 95%;
                                padding: 9px;
                            };
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
                                    @media (max-width: 600px) {             
                                        display: grid;
                                        grid-template-columns: repeat(2, 50%);
                                    };
                                    margin: 0 auto;
                                    list-style-type: none;
                                    width: 100%;
                                    padding: 0px;
                                    display: grid;
                                    grid-template-columns: repeat(4, 25%);
                                `}
                            >
                                {/* <button onClick={()=>handleRedirect()}> aaaaa</button> */}
                                {!dataContext?
                                <div
                                    className={css`  
                                        color:white;
                                        height: 100vh;
                                    `}
                                > Loading... </div>
                                    : dataContext.animeList.map((row, key)=>(
                                    <li
                                        className={css`  
                                            float: left;
                                            margin: 10px;
                                            height: 275px;
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
                                                    top: -35px;
                                                    color: white;
                                                `}
                                            >
                                                <lable
                                                className={css`
                                                    @media (max-width: 600px) {
                                                        top: -55px;
                                                    };
                                                    font-size: 14px;
                                                    line-height: 21px;
                                                    font-weight: 700;
                                                    position: relative;
                                                    top: -40px;
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
                        @media (max-width: 600px) {
                            width: 100%;
                        };
                        width: 30%;
                        background-color: #1a1a1a;
                    `}
                >
                    
                    <div
                        className={css`
                            @media (max-width: 600px) {
                                padding: 0px;
                                padding-top: 14px;
                            };
                            width: 100%;
                            padding: 14px;
                        `}
                    >
                        <div
                            className={css`
                                @media (max-width: 600px) {
                                    width: 95%;
                                    padding: 9px;
                                };
                                width: 100%;
                                padding: 12px;
                                margin-bottom: 4px;
                                height: 100%;
                                color: white;
                                text-align: initial;
                                background-color: #222;
                            `}
                        >
                            <label>Genres</label>
                            {/* genreList.GenreCollection */}
                            
                        </div>
                        <div
                            className={css`
                                @media (max-width: 600px) {
                                    width: 95%;
                                    padding: 9px;
                                };
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
                                {!dataContext?
                                <div
                                    className={css`  
                                        color:white;
                                        height: 100vh;
                                    `}
                                > Loading... </div>
                                    : dataContext.genreList.map((row, key)=>(
                                    <li
                                        className={css`
                                            padding: 8px;
                                        `}
                                        onClick={()=>handleFilterbyGenres(row)}
                                        key={key}
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