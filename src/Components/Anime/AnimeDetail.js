import React, { useContext, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { css } from '@emotion/css';
import { useNavigate, useParams } from "react-router-dom";
import { GET_ANIME_DATA_DETAIL, GET_ANIME_LIST_GENRE } from '../../actions/anime';
import { AnimeListContext } from '../../context/Context';

function AnimeDetail(){
    const { dataContext, setDataContext } = useContext(AnimeListContext);
    const navigate = useNavigate();
    const [ showPage, setShowPage ] = useState('Sinopsis')
    const [ showCollection, setShowCollection ] = useState(false)
    const params = useParams();
    const [getDetailAnime, { data, loading: detailIsLoading }] = useLazyQuery(GET_ANIME_DATA_DETAIL);
    const [getListAnimebyGenre, { data: animeListbyGenre }] = useLazyQuery(GET_ANIME_LIST_GENRE);
    React.useEffect(() => {
        getDetailAnime({
            variables: {
                id: params.animeId,
            },
        });
        // console.log(dataContext.collectionList)
        if(dataContext){
            if(typeof dataContext.collectionList !== 'undefined'){
                setShowCollection(dataContext.collectionList?.filter(row=>row.id === parseInt(params.animeId)).length !== 0)
            }
        }
        // eslint-disable-next-line
      }, [getDetailAnime, dataContext?.collectionList]);
    const changeShowPage = (page) =>{
        setShowPage(page)
    }
    
    const handleRedirectListAnime = (genre) => {
        setDataContext({
            ...dataContext,
            filter:{
                genre: genre
            }
        })
        navigate('/anime-list')
    }
    const handleAddCollection = (data) => {
        let temp = data.Media
        if(typeof dataContext.collectionList === 'undefined'){
            setDataContext({
                ...dataContext,
                collectionList: [
                    temp,
                ]
            })
        } else if (dataContext.collectionList.filter(row=>row.id === parseInt(params.animeId)).length === 0){
            setDataContext({
                ...dataContext,
                collectionList: [
                    ...dataContext.collectionList,
                    temp,
                ]
            })
        }
    }
    const handleRemoveCollection = (data) => {
        let temp = dataContext.collectionList.filter(row=>row.id !== parseInt(data.Media.id));
        if(temp.length === 0){
            setDataContext({
                ...dataContext,
                collectionList: []
            })
        } else {
            setDataContext({
                ...dataContext,
                collectionList: [
                    ...temp,
                ]
            })
        }
    }
    console.log(dataContext)
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
                        object-fit: cover;
                        width: 70%;
                        height: 100%;
                        max-height: 240px
                    `}
                    alt=''
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
                                alt=''
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
                                    text-align: center;
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
                                    max-width: 85%;
                                    position: relative;
                                    text-align: left;
                                    top: 30px;
                                    display: grid;
                                    grid-template-columns: repeat(2, 315px);
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
                                >Status<span className={css`@media (max-width: 600px) { margin-left: 8.5%; }; margin-left: 15%;`}></span>: 
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
                                >Type<span className={css`@media (max-width: 600px) { margin-left: 12.5%; }; margin-left: 13%;`}></span>: 
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
                                >Studio<span className={css`@media (max-width: 600px) { margin-left: 8%; }; margin-left: 14%;`}></span>: 
                                    <div
                                        className={css`
                                            @media (max-width: 600px) {
                                                position: relative;
                                                width: 80%;
                                                left: 75px;
                                                top: -20px;
                                            };
                                            padding-left: 12px;
                                            font-size: 16px;
                                            font-weight: 500;
                                            width: 80%;
                                            position: relative;
                                            left: 95px;
                                            top: -20px;
                                        `}
                                    >
                                        {data?.Media.studios.edges.map((row ,key) =>(
                                            data.Media.studios.edges.length - 1 === key ? (
                                                <span>{row.node.name}</span>
                                            ) : ( <span>{row.node.name}, </span> )
                                        ))}
                                    </div>
                                </lable>
                                <lable
                                    className={css`
                                        padding-left: 12px;
                                        font-size: 16px;
                                        font-weight: 700;
                                    `}
                                >Episodes<span className={css`@media (max-width: 600px) { margin-left: 2%; }; margin-left: 1%;`}></span>: 
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
                                >Duration<span className={css`@media (max-width: 600px) { margin-left: 1.5%; }; margin-left: 7%;`}></span>: 
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
                                >Season<span className={css`@media (max-width: 600px) { margin-left: 6.5%; }; margin-left: 7%;`}></span>: 
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
                            {
                                showCollection ? 
                                (
                                    <div
                                        className={css` 
                                            @media (max-width: 600px) {
                                                top: 20px;
                                                left: 82vw;
                                            };
                                            position: absolute;
                                            float: right;
                                            top: 20px;
                                            left: 58vw;
                                        `}
                                    >
                                        <i  
                                            style={{
                                                'font-size': "24px",
                                                'cursor': "pointer"
                                            }}
                                            class='fa'
                                            onClick={()=>handleRemoveCollection(data)}
                                        >
                                                &#xf005;
                                        </i>
                                    </div>
                                ) : (
                                    <div
                                        className={css` 
                                            @media (max-width: 600px) {
                                                top: 20px;
                                                left: 82vw;
                                            };
                                            position: absolute;
                                            float: right;
                                            top: 20px;
                                            left: 58vw;
                                        `}
                                    >
                                        <i  
                                            style={{
                                                'font-size': "24px",
                                                'cursor': "pointer"
                                            }}
                                            class='fa'
                                            onClick={()=>handleAddCollection(data)}
                                        >
                                                &#xf006;
                                        </i>
                                    </div>
                                )
                            }
                            <div
                                className={css`
                                    @media (max-width: 600px) {
                                        display: inline-flex;
                                        justify-content: none;
                                        padding-left: 0px;
                                        flex-wrap: wrap;
                                    };
                                    width: 85%;
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
                                        cursor: pointer;
                                        &:hover {
                                           background-color: #DA1212;
                                        }
                                    `}
                                    onClick={()=>handleRedirectListAnime(row)}
                                >
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
                    <div
                        className={css`
                            width: -webkit-fill-available;
                            margin: 0 auto;
                            color: white;
                            background-color: #222;
                            display: block; 
                            padding: 14px 16px;
                            cursor: pointer;
                            background-color: ${showPage === 'Sinopsis' ? '#DA1212' : '#222'};
                        `}
                    onClick={()=>changeShowPage('Sinopsis')}>Sinopsis</div>
                    <div
                        className={css`
                            width: -webkit-fill-available;
                            margin: 0 auto;
                            color: white;
                            background-color: #222;
                            display: block; 
                            padding: 14px 16px;
                            cursor: pointer;
                            background-color: ${showPage === 'Trailer' ? '#DA1212' : '#222'};
                        `}
                    onClick={()=>changeShowPage('Trailer')}>Trailer</div>
                    <div
                        className={css`
                            width: -webkit-fill-available;
                            margin: 0 auto;
                            color: white;
                            background-color: #222;
                            display: block; 
                            padding: 14px 16px;
                            cursor: pointer;
                            background-color: ${showPage === 'Karakter' ? '#DA1212' : '#222'};
                        `}
                    onClick={()=>changeShowPage('Karakter')}>Karakter</div>
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
                                    <img alt='' src={data?.Media.trailer.thumbnail}/>
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
                                            <img alt='' src={row.node.image.medium}/>
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