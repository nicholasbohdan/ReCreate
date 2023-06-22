import { useLazyQuery, useQuery } from '@apollo/client';
import { css } from '@emotion/css';
import React, { useContext, useState } from 'react';
import { GET_ALL_TREND_ANIME, GET_ANIME_DATA_LIST } from '../../actions/anime';
import { AnimeListContext } from '../../context/Context';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Spy-x-Family-Anya-Forger

function AnimeList(props){
    const navigate = useNavigate();
    const [numberPage, setNumberPage] = useState([]);
    const [page, setPage] = useState(1);
    const { dataContext, setDataContext } = useContext(AnimeListContext);
    const [getListAnimebyPage, { data: animeList }] = useLazyQuery(GET_ANIME_DATA_LIST);
    React.useEffect(() => {
        getListAnimebyPage();
        if(animeList){
            setDataContext({
                ...dataContext,
                animeList: animeList.Page.mediaList,
            })
        }
        if(dataContext?.filter !== {}){
            getListAnimebyPage();
        }
        let temp = [];
        for(var i = parseInt(page); i < parseInt(page)+3; i++) {
            temp = [
                ...temp, i,
            ]
        }
        setNumberPage(temp)
        // eslint-disable-next-line
      }, [dataContext?.filter]);
    return(
        <div>
            <Grid container spacing={2}>
                {!animeList ? <div>Loading</div> : 
                animeList.Page.mediaList.map((row, key)=>(
                    <Grid item xs={3}
                        style={{ textAlign: 'center' }}
                    >
                        <img 
                            className={css`  
                                float: left;
                                width: 100%;
                                height: 240px;
                            `}
                        alt=''
                        src={row.media.coverImage.extraLarge} />
                        {row.media.title.userPreferred}
                    </Grid>
                ))}
            </Grid>
            {/* <div
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
                    <label>Populer Anime</label>
                    
                </div>
                <div
                    className={css`
                        @media (max-width: 600px) {
                            width: 95%;
                            padding: 9px;
                        };
                        width: 100%;
                        padding: 12px;
                        padding-top: 24px;
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
                                text-align: center;
                                display: grid;
                                grid-template-columns: repeat(2, 50%);
                            `}
                        >   
                            {isAnimeListTrendsLoading?
                            <div
                                className={css`  
                                    color:white;
                                    height: 100vh;
                                `}
                            > Loading... </div>
                                : animeListTrends.Page.mediaTrends.map((row, key)=>(
                                <li
                                    className={css`  
                                        float: left;
                                        margin: 10px;
                                        height: 275px;
                                    `}
                                key={key}
                                >
                                        <img 
                                            className={css`  
                                                float: left;
                                                width: 100%;
                                                height: 240px;
                                            `}
                                        alt=''
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
                                                font-size: 18px;
                                                line-height: 21px;
                                                font-weight: 700;
                                                position: relative;
                                                top: -40px;
                                            `}
                                            >
                                                {row.media.title.userPreferred}
                                            </lable>
                                        </div>
                                    <div
                                        className={css`
                                            @media (max-width: 600px) {
                                                @media (hover : hover) {
                                                    -webkit-transition: all 1s;
                                                    transition: all 1s;
                                                    height: 88%;
                                                    opacity: 1;
                                                    color: #222;
                                                    background: #DA1212;
                                                };
                                            };
                                            display: none;
                                            position: relative;
                                            top: -277px;
                                            display: grid;
                                            z-index: 5;
                                            opacity: 0;
                                            align-content: space-around;
                                            justify-content: center;
                                            align-items: center;
                                            justify-items: center;
                                            height: 87%;
                                            &:hover{
                                                -webkit-transition: all 1s;
                                                transition: all 1s;
                                                height: 88%;
                                                opacity: 1;
                                                color: #222;
                                                background: #DA1212;
                                            }
                                        `}
                                    >
                                        <button
                                            className={css`
                                                border: 2px solid #DA1212;
                                                border-radius: 12px;
                                                width: 100%;
                                                padding: 5px;
                                                margin: 5px;
                                                text-align: center;
                                                cursor: pointer;
                                                color: white;
                                                background-color: #222;
                                                &:hover {
                                                    color: #222;
                                                    background-color: white;
                                                }
                                            `}
                                            onClick={()=>props.handleRedirect(row.media.id)}
                                        >
                                            Visit
                                        </button>
                                        <button
                                            className={css`
                                                border: 2px solid #DA1212;
                                                border-radius: 12px;
                                                width: 100%;
                                                padding: 5px;
                                                margin: 5px;
                                                text-align: center;
                                                cursor: pointer;
                                                color: white;
                                                background-color: #222;
                                                &:hover {
                                                    color: #222;
                                                    background-color: white;
                                                }
                                            `}
                                            onClick={()=>props.handleAddCollection(row.media)}
                                        >
                                            Add to Collection
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ul>
                </div>
            </div> */}
        </div>
    )
}
export default AnimeList;