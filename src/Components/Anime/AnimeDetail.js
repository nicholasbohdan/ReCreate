import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { css } from '@emotion/css';
import { useParams } from "react-router-dom";
import { GET_ANIME_DATA_DETAIL } from '../../actions/anime';

function AnimeDetail(){
    const [ showPage, setShowPage ] = useState('Sinopsis')
    const params = useParams();
    const [getDetailAnime, { data, loading: detailIsLoading }] = useLazyQuery(GET_ANIME_DATA_DETAIL);
    React.useEffect(() => {
        getDetailAnime({
            variables: {
                id: params.animeId,
            },
        });
        // eslint-disable-next-line
      }, [getDetailAnime]);
    const changeShowPage = (page) =>{
        setShowPage(page)
    }
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
                    max-width: 90vw;
                    margin: 0 auto;
                    text-align: center;
                `}
            >
                {detailIsLoading ? <div>Loading...</div> : 
                <>
                <img
                    className={css`
                        @media (max-width: 600px) {
                            width: 100%;
                        };
                        width: 70%;
                        height: 100%;
                    `}
                    src={data?.Media.bannerImage}
                />
                <div
                    className={css`
                        @media (max-width: 600px) {
                            width: 100%;
                        };
                        width: 70%;
                        padding-top: 14px;
                        height: 100%;
                        margin: 0 auto;
                        background-color: #222;
                    `}
                >
                    <div
                        className={css`
                            @media (max-width: 600px) {
                                display: block;
                                left: 0px;
                            };
                            position: relative;
                            z-Index: 1;
                            left: 45px;
                            top: -30px;
                            display: flex;
                        `}
                    >
                        <div
                            className={css`
                                @media (max-width: 600px) {
                                    display: inline-block;
                                };
                            `}
                        >
                            <img
                                className={css`
                                    position: relative;
                                    float: left;
                                    width: 143px;
                                    height: 200px;
                                `}
                                src={data?.Media.coverImage.extraLarge}
                            />
                        </div>
                        <div>
                            <div
                                className={css`
                                    @media (max-width: 600px) {
                                        text-align: center;
                                        margin: 0 auto;
                                    };
                                    width: 90%;
                                    position: relative;
                                    text-align: left;
                                    top: 30px;
                                `}
                            >   
                                <lable
                                    className={css`
                                        padding-left: 12px;
                                        font-size: 24px;
                                        font-weight: 700;
                                    `}
                                >{data?.Media.title.userPreferred} ( {data?.Media.title.native} )</lable>
                            </div>
                            <div
                                className={css`
                                    @media (max-width: 600px) {
                                        display: flex;
                                        grid-template-columns: none;
                                        justify-content: none;
                                        flex-direction: column;
                                    };
                                    width: 100%;
                                    position: relative;
                                    text-align: left;
                                    top: 30px;
                                    display: grid;
                                    grid-template-columns: repeat(2, 260px);
                                    justify-content: space-between;
                                }
                                `}
                            >   
                                <lable
                                    className={css`
                                        padding-left: 12px;
                                        font-size: 16px;
                                        font-weight: 700;
                                    `}
                                >Status : 
                                    <lable
                                        className={css`
                                            padding-left: 12px;
                                            font-size: 16px;
                                            font-weight: 500;
                                        `}
                                    >
                                        {data?.Media.status}
                                    </lable>
                                </lable>
                                <lable
                                    className={css`
                                        padding-left: 12px;
                                        font-size: 16px;
                                        font-weight: 700;
                                    `}
                                >Type : 
                                    <lable
                                        className={css`
                                            padding-left: 12px;
                                            font-size: 16px;
                                            font-weight: 500;
                                        `}
                                    >
                                        {data?.Media.type}
                                    </lable>
                                </lable>
                                <lable
                                    className={css`
                                        padding-left: 12px;
                                        font-size: 16px;
                                        font-weight: 700;
                                    `}
                                >Studio : 
                                    <lable
                                        className={css`
                                            padding-left: 12px;
                                            font-size: 16px;
                                            font-weight: 500;
                                        `}
                                    >
                                        {data?.Media.studios.edges.map((row ,key) =>(
                                            data.Media.studios.edges.length - 1 === key ? (
                                                <span>{row.node.name}</span>
                                            ) : ( <span>{row.node.name}, </span> )
                                        ))}
                                    </lable>
                                </lable>
                                <lable
                                    className={css`
                                        padding-left: 12px;
                                        font-size: 16px;
                                        font-weight: 700;
                                    `}
                                >Episodes : 
                                    <lable
                                        className={css`
                                            padding-left: 12px;
                                            font-size: 16px;
                                            font-weight: 500;
                                        `}
                                    >
                                        {data?.Media.episodes}
                                    </lable>
                                </lable>
                                <lable
                                    className={css`
                                        padding-left: 12px;
                                        font-size: 16px;
                                        font-weight: 700;
                                    `}
                                >Duration : 
                                    <lable
                                        className={css`
                                            padding-left: 12px;
                                            font-size: 16px;
                                            font-weight: 500;
                                        `}
                                    >
                                        {data?.Media.duration} Minute
                                    </lable>
                                </lable>
                                <lable
                                    className={css`
                                        padding-left: 12px;
                                        font-size: 16px;
                                        font-weight: 700;
                                    `}
                                >Season : 
                                    <lable
                                        className={css`
                                            padding-left: 12px;
                                            font-size: 16px;
                                            font-weight: 500;
                                        `}
                                    >
                                        {data?.Media.season} {data?.Media.seasonYear}
                                    </lable>
                                </lable>
                            </div>
                            <div
                                className={css`
                                    @media (max-width: 600px) {
                                        display: inline-flex;
                                        justify-content: none;
                                        padding-left: 0px;
                                        flex-wrap: wrap;
                                    };
                                    width: 100%;
                                    position: relative;
                                    text-align: left;
                                    top: 30px;
                                    padding-left: 12px;
                                    padding-top: 12px;
                                    display: grid;
                                    grid-template-columns: repeat(auto-fill, 138px);
                                    justify-content: space-between;
                                `}
                            > 
                            {data?.Media.genres.map((row,key)=>(
                                <div
                                    className={css`
                                        border: 2px solid #DA1212;
                                        border-radius: 12px;
                                        padding: 5px;
                                        margin: 5px;
                                        text-align: center;
                                    `}>
                                    {row}
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={css`
                        @media (max-width: 600px) {
                            width: 100%;
                        };
                        width: 70%;
                        padding-top: 14px;
                        height: 100%;
                        margin: 0 auto;
                        background-color: #222;
                        display: grid;
                        grid-template-columns: repeat(3, auto);
                    `}
                >
                    <button
                        className={css`
                            width: 100%;
                            margin: 0 auto;
                            color: white;
                            background-color: #1a1a1a;
                            display: block; 
                            padding: 14px 16px;
                        `}
                    onClick={()=>changeShowPage('Sinopsis')}>Sinopsis</button>
                    <button
                        className={css`
                            width: 100%;
                            margin: 0 auto;
                            color: white;
                            background-color: #1a1a1a;
                            display: block; 
                            padding: 14px 16px;
                        `}
                    onClick={()=>changeShowPage('Trailer')}>Trailer</button>
                    <button
                        className={css`
                            width: 100%;
                            margin: 0 auto;
                            color: white;
                            background-color: #1a1a1a;
                            display: block; 
                            padding: 14px 16px;
                        `}
                    onClick={()=>changeShowPage('Karakter')}>Karakter</button>
                </div>
                {showPage === 'Sinopsis' ? (
                    <div
                        className={css`
                            @media (max-width: 600px) {
                                width: 100%;
                            };
                            width: 70%;
                            padding-top: 14px;
                            height: 100%;
                            margin: 0 auto;
                            background-color: #222;
                        `}
                    >
                        Sinopsis {data?.Media.title.english}
                        <div
                            className={css`
                                @media (max-width: 600px) {
                                    width: 100%;
                                };
                                width: 90%;
                                padding-top: 14px;
                                height: 100%;
                                margin: 0 auto;
                                background-color: #222;
                            `}
                        >   
                        {/* {console.log(data?.Media.description.replace(/<br\s*[\/]?>/gi, '\n'))} */}
                            <span>{data?.Media.description.replace(/<br\s*[\/]?>/gi, '\n')}</span>
                        </div>
                    </div>
                ) : (
                    showPage === 'Trailer' ? (
                        <div
                            className={css`
                                @media (max-width: 600px) {
                                    width: 100%;
                                };
                                width: 70%;
                                padding-top: 14px;
                                height: 100%;
                                margin: 0 auto;
                                background-color: #222;
                            `}
                        >
                            Trailer {data?.Media.title.english}
                            {data.Media.trailer ? (
                                <div>
                                    <img src={data?.Media.trailer.thumbnail}/>
                                </div>
                            ) : (
                                <div>
                                    No Trailer
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            className={css`
                                @media (max-width: 600px) {
                                    width: 100%;
                                };
                                width: 70%;
                                padding-top: 14px;
                                height: 100%;
                                margin: 0 auto;
                                background-color: #222;
                            `}
                        >
                            Karakter {data?.Media.title.english}
                            <div>
                                <ul
                                    className={css`
                                        @media (max-width: 600px) {
                                            width: 100%;
                                            padding: 0px;
                                            padding-top: 14px;
                                            max-width: 90%;
                                            display: grid;
                                            grid-template-columns: repeat(2, 50%);
                                        };
                                        width: 70%;
                                        padding-top: 14px;
                                        height: 100%;
                                        margin: 0 auto;
                                        background-color: #222;
                                        list-style-type: none;
                                        display: grid;
                                        grid-template-columns: repeat(5, 20%);
                                    `}
                                >
                                    {data?.Media.characters.edges.map((row, key)=>(
                                        <li>
                                            <img src={row.node.image.medium}/>
                                            <div>
                                                {row.node.name.userPreferred}
                                            </div>
                                        </li>
                                    // console.log(row.node)
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                )}
                </>}
            </div>
        </div>
    )
}
export default AnimeDetail;