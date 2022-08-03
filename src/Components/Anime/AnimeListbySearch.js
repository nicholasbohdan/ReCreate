import { useLazyQuery, useQuery } from '@apollo/client';
import { css } from '@emotion/css';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GET_ANIME_SEARCH_LIST } from '../../actions/anime';
import anyaImg from '../../assets/Spy-x-Family-Anya-Forger.png';
import { AnimeListContext } from '../../context/Context';
// Spy-x-Family-Anya-Forger

function AnimeListbySearch(){
    const navigate = useNavigate();
    const params = useLocation();
    const [numberPage, setNumberPage] = useState([]);
    const [page, setPage] = useState(1);
    const { dataContext, setDataContext } = useContext(AnimeListContext);
    const [getListAnimeSearch, { data: animeListbySearch, error, loading }] = useLazyQuery(GET_ANIME_SEARCH_LIST);
    React.useEffect(() => {
        console.log(dataContext)
        if(dataContext && typeof dataContext.filter !== 'undefined'){
            getListAnimeSearch({
                variables:{
                    page: page,
                    search: dataContext.filter.search
                }
            });
        }
        
        let temp = [];
        for(var i = parseInt(page); i < parseInt(page)+3; i++) {
            temp = [
                ...temp, i,
            ]
        }
        setNumberPage(temp)
        // eslint-disable-next-line
      }, []);
    const handleRedirect = (id) => {
        navigate(`/detail/${id}`)
    }
    
    const handleChangePage = (page, condition) => {
        getListAnimeSearch({
            variables: {
                page: page,
                search: dataContext.filter.search
            }
        });
        let temp = [];
        for(var i = parseInt(page); i < parseInt(page)+3; i++) {
            temp = [
                ...temp, i,
            ]
        }
        setNumberPage(temp)
        console.log(page, condition)
    }

    const handleFilterbyGenres = (genre) => {
        console.log(genre)
    }
    const handleAddCollection = (data) => {
        let temp = data
        console.log(typeof dataContext.collectionList === 'undefined')
        if(typeof dataContext.collectionList === 'undefined'){
            setDataContext({
                ...dataContext,
                collectionList: [
                    temp,
                ]
            })
        } else {
            setDataContext({
                ...dataContext,
                collectionList: [
                    ...dataContext.collectionList,
                    temp,
                ]
            })
        }
    }
    console.log(animeListbySearch)
    console.log(page)
    return(
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
                { !animeListbySearch ?
                    <div
                        className={css`  
                            color:white;
                            height: 100vh;
                        `}
                    > Loading... </div>
                        : animeListbySearch.Page.media.map((row, key)=>(
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
                                src={row.coverImage.extraLarge} />
                                <div
                                    className={css`
                                        background: linear-gradient(to top,rgba(0, 0, 0, 0.83) 0,rgba(0,0,0,.05) 50%,rgba(0,0,0,.05) 50%,rgba(0, 0, 0, 0) 100%);
                                        z-index: 2;
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
                                        {row.title.userPreferred}
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
                                        onClick={()=>handleRedirect(row.id)}
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
                                        onClick={()=>handleAddCollection(row)}
                                    >
                                        Add to Collection
                                    </button>
                                </div>
                            {/* </div> */}
                        </li>
                    ))
            }
            </ul>
            
            <div>
                <div
                    className={css`
                        display: flex;
                        margin: 0 auto;
                        width: 100%;
                        max-width: 60%;
                        padding-bottom: 12px;
                        justify-content: space-evenly;
                    `}
                >
                    {/* {console.log(animeLists?.Page.pageInfo)} */}
                    <button
                        className={css`
                            color: white;
                            border-radius: 12px;
                            border: 2px solid #DA1212;
                            background: #222;
                            padding: 8px 10px;
                            margin: 2px;
                            text-decoration: none;
                            cursor: ${parseInt(page) === 1 ? 'default' : 'pointer'};
                            pointer-events: ${parseInt(page) === 1 ? 'none' : 'default'};
                            &:hover{
                                color: white;
                                background: #DA1212;
                            }
                        `}
                        onClick={()=>handleChangePage(1, 'first')}
                    >◀◀</button>
                    <button
                        className={css`
                            color: white;
                            border-radius: 12px;
                            border: 2px solid #DA1212;
                            background: #222;
                            padding: 8px 10px;
                            margin: 2px;
                            text-decoration: none;
                            cursor: ${parseInt(page) === 1 ? 'default' : 'pointer'};
                            pointer-events: ${parseInt(page) === 1 ? 'none' : 'default'};
                            &:hover{
                                color: white;
                                background: #DA1212;
                            }
                        `}
                        disable={parseInt(page) === 1 ? true : false}
                        onClick={()=>handleChangePage(parseInt(page)-1, 'back')}
                        // href={`/#/anime-list/?page=${parseInt(page)-1}`}
                    >◀</button>
                    {
                        numberPage.map((row, key)=>(
                        <button
                            className={css`
                                color: white;
                                border-radius: 12px;
                                border: 2px solid #DA1212;
                                background: #222;
                                padding: 8px 10px;
                                margin: 2px;
                                text-decoration: none;
                                cursor: pointer;
                                &:hover{
                                    color: white;
                                    background: #DA1212;
                                }
                            `}
                            key={key}
                            // class="last"
                            onClick={()=>handleChangePage(row, 'number')}
                            // href={`/#/anime-list/?page=${row}`}
                        >{row}</button>
                        )) 
                    }
                    <button
                        className={css`
                            color: white;
                            border-radius: 12px;
                            border: 2px solid #DA1212;
                            background: #222;
                            padding: 8px 10px;
                            margin: 2px;
                            text-decoration: none;
                            cursor: pointer;
                            &:hover{
                                color: white;
                                background: #DA1212;
                            }
                        `}
                        // class="last"
                        onClick={()=>handleChangePage(parseInt(page)+1, 'next')}
                        // href={`/?page=${parseInt(page)+1}`}
                    >▶</button>
                    <button
                        className={css`
                            color: white;
                            border-radius: 12px;
                            border: 2px solid #DA1212;
                            background: #222;
                            padding: 8px 10px;
                            margin: 2px;
                            text-decoration: none;
                            cursor: pointer;
                            &:hover{
                                color: white;
                                background: #DA1212;
                            }
                        `}
                        // class="last"
                        onClick={()=>handleChangePage(animeListbySearch?.Page.pageInfo.lastPage, 'last')}
                        // href={`/?page=${animeLists?.Page.pageInfo.lastPage}`}
                    >▶▶</button>
                </div>
            </div>
        </div>
    )
}
export default AnimeListbySearch;